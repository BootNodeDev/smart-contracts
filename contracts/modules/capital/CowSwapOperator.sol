// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.0;

import '../../external/cow/GPv2Order.sol';
import '@openzeppelin/contracts-v4/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts-v4/utils/math/Math.sol';
import '../../interfaces/INXMMaster.sol';
import '../../interfaces/IPool.sol';
import './Pool.sol';
import '../../interfaces/ITwapOracle.sol';

interface ICowSettlement {
  function setPreSignature(bytes calldata orderUid, bool signed) external;
}

interface IWETH is IERC20 {
  function deposit() external payable;

  function withdraw(uint256 wad) external;
}

contract CowSwapOperator {
  // Storage
  ICowSettlement public immutable cowSettlement;
  address public immutable cowVaultRelayer;
  INXMMaster public master;
  address public immutable swapController;
  IWETH public immutable weth;
  ITwapOracle public immutable twapOracle;
  bytes currentOrderUID;

  // Constants
  address public constant ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
  uint16 constant MAX_SLIPPAGE_DENOMINATOR = 10000;

  modifier onlyController() {
    require(msg.sender == swapController, 'Only controller');
    _;
  }

  constructor(
    address _cowSettlement,
    address _cowVaultRelayer,
    address _swapController,
    address _master,
    address _weth,
    address _twapOracle
  ) {
    cowSettlement = ICowSettlement(_cowSettlement);
    cowVaultRelayer = _cowVaultRelayer;
    master = INXMMaster(_master);
    swapController = _swapController;
    weth = IWETH(_weth);
    twapOracle = ITwapOracle(_twapOracle);
  }

  receive() external payable {}

  function getDigest(GPv2Order.Data calldata order, bytes32 domainSeparator) public pure returns (bytes32) {
    bytes32 hash = GPv2Order.hash(order, domainSeparator);
    return hash;
  }

  function getUID(GPv2Order.Data calldata order, bytes32 domainSeparator) public pure returns (bytes memory) {
    bytes memory uid = new bytes(56);
    bytes32 digest = getDigest(order, domainSeparator);
    GPv2Order.packOrderUidParams(uid, digest, order.receiver, order.validTo);
    return uid;
  }

  function placeOrder(
    GPv2Order.Data calldata order,
    bytes32 domainSeparator,
    bytes calldata orderUID
  ) public onlyController {
    // Helper local variables
    Pool pool = _pool();
    uint256 totalOutAmount = order.sellAmount + order.feeAmount;

    // Order UID verification
    validateUID(order, domainSeparator, orderUID);

    // Validate pool has enough funds for the trade
    validatePoolBalance(order, pool);

    // Validate basic CoW params
    validateBasicCowParams(order);

    // Validate that swaps for sellToken are enabled
    // (
    //   uint104 sellTokenMin,
    //   uint104 sellTokenMax,
    //   uint32 sellTokenLastAssetSwapTime,
    //   uint16 sellTokenMaxSlippageRatio
    // ) = pool.getAssetSwapDetails(address(order.sellToken));
    // if (!isSellingEth) {
    //   // Eth is always enabled
    //   require(sellTokenMin != 0 || sellTokenMax != 0, 'CowSwapOperator: sellToken is not enabled');
    // }
    IPool.SwapDetails memory sellTokenSwapDetails = pool.getAssetSwapDetailsStruct(address(order.sellToken));
    if (!isSellingEth(order)) {
      // Eth is always enabled
      require(
        sellTokenSwapDetails.minAmount != 0 || sellTokenSwapDetails.maxAmount != 0,
        'CowSwapOperator: sellToken is not enabled'
      );
    }

    // Validate that swaps for buyToken are enabled
    // (uint104 buyTokenMin, uint104 buyTokenMax, uint32 buyTokenLastAssetSwapTime, uint16 buyTokenMaxSlippageRatio) = pool
    //   .getAssetSwapDetails(address(order.buyToken));
    // if (!isBuyingEth) {
    //   // Eth is always enabled
    //   require(buyTokenMin != 0 || buyTokenMax != 0, 'CowSwapOperator: buyToken is not enabled');
    // }

    IPool.SwapDetails memory buyTokenSwapDetails = pool.getAssetSwapDetailsStruct(address(order.buyToken));
    if (!isBuyingEth(order)) {
      // Eth is always enabled
      require(
        buyTokenSwapDetails.minAmount != 0 || buyTokenSwapDetails.maxAmount != 0,
        'CowSwapOperator: buyToken is not enabled'
      );
    }

    // Validate oracle price
    // uint256 finalSlippage = Math.max(buyTokenSwapDetails.maxSlippageRatio, sellTokenSwapDetails.maxSlippageRatio);
    uint256 finalSlippage = MAX_SLIPPAGE_DENOMINATOR; // Slippage TBD. 100% for now
    uint256 oracleBuyAmount = twapOracle.consult(address(order.sellToken), totalOutAmount, address(order.buyToken));
    uint256 maxSlippageAmount = (oracleBuyAmount * finalSlippage) / MAX_SLIPPAGE_DENOMINATOR;
    uint256 minBuyAmountOnMaxSlippage = oracleBuyAmount - maxSlippageAmount;
    require(order.buyAmount >= minBuyAmountOnMaxSlippage, 'CowSwapOperator: order.buyAmount doesnt match oracle data');

    // Transfer pool's asset to this contract; wrap ether if needed
    if (isSellingEth(order)) {
      pool.transferAssetToSwapOperator(ETH, totalOutAmount);
      weth.deposit{value: totalOutAmount}();
    } else {
      pool.transferAssetToSwapOperator(address(order.sellToken), totalOutAmount);
    }

    // Approve Cow's contract to spend sellToken
    approveVaultRelayer(order.sellToken, totalOutAmount);

    // Register last swap time on swapDetail
    // pool.setSwapDetailsLastSwapTime(nonEthToken, uint32(block.timestamp));

    // Store the order UID
    currentOrderUID = orderUID;

    // Sign the Cow order
    cowSettlement.setPreSignature(orderUID, true);
  }

  function finalizeOrder(GPv2Order.Data calldata order, bytes32 domainSeparator) public onlyController {
    // validate the order was executed
    uint256 buyTokenBalance = order.buyToken.balanceOf(address(this));
    require(buyTokenBalance >= order.buyAmount, 'Order was not executed');

    // validate the order to finalize is the one executed
    validateUID(order, domainSeparator, currentOrderUID);

    // transfer funds to pool
    if (isBuyingEth(order)) {
      weth.withdraw(buyTokenBalance);
      payable(_pool()).transfer(buyTokenBalance);
    } else {
      order.buyToken.transfer(address(_pool()), buyTokenBalance);
    }
  }

  function validatePoolBalance(GPv2Order.Data calldata order, Pool pool) private view {
    if (isSellingEth(order)) {
      require(address(pool).balance >= order.sellAmount, 'Not enough ether to sell');
    } else {
      require(order.sellToken.balanceOf(address(pool)) >= order.sellAmount, 'Not enough token balance to sell');
    }
  }

  function isSellingEth(GPv2Order.Data calldata order) private view returns (bool) {
    return order.sellToken == weth;
  }

  function isBuyingEth(GPv2Order.Data calldata order) private view returns (bool) {
    return order.buyToken == weth;
  }

  function validateBasicCowParams(GPv2Order.Data calldata order) private view {
    require(order.sellTokenBalance == GPv2Order.BALANCE_ERC20, 'Only erc20 supported for sellTokenBalance');
    require(order.buyTokenBalance == GPv2Order.BALANCE_ERC20, 'Only erc20 supported for buyTokenBalance');
    require(order.kind == GPv2Order.KIND_SELL, 'Only sell operations are supported');
    require(order.receiver == address(this), 'Receiver must be this contract');
    require(order.validTo >= block.timestamp + 600, 'validTo must be at least 10 minutes in the future');
    require(order.partiallyFillable == false, 'Partially fillable orders are not supported by CoW yet');
  }

  function approveVaultRelayer(IERC20 token, uint256 amount) private {
    token.approve(cowVaultRelayer, amount); // infinite approval
  }

  function validateUID(
    GPv2Order.Data calldata order,
    bytes32 domainSeparator,
    bytes memory providedOrderUID
  ) private pure {
    bytes memory calculatedUID = getUID(order, domainSeparator);
    require(keccak256(calculatedUID) == keccak256(providedOrderUID), 'Provided UID doesnt match calculated UID');
  }

  function _pool() internal view returns (Pool) {
    return Pool(master.getLatestAddress('P1'));
  }
}