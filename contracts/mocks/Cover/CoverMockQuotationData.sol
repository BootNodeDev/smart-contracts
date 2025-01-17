// SPDX-License-Identifier: GPL-3.0-only

pragma solidity ^0.5.17;

import "../../modules/oracles/PriceFeedOracle.sol";

contract CoverMockQuotationData {
  using SafeMath for uint;

  mapping(bytes4 => uint) public sumAssuredByCurrency;

  enum HCIDStatus {NA, kycPending, kycPass, kycFailedOrRefunded, kycPassNoCover}

  enum CoverStatus {Active, ClaimAccepted, ClaimDenied, CoverExpired, ClaimSubmitted, Requested}

  struct Cover {
    address payable memberAddress;
    bytes4 currencyCode;
    uint sumAssured;
    uint16 coverPeriod;
    uint validUntil;
    address scAddress;
    uint premiumNXM;
  }

  address public authQuoteEngine;

  mapping(bytes4 => uint) internal currencyCSA;
  mapping(address => uint[]) internal userCover;


  Cover[] internal allCovers;

  function addCover(
    uint16 _coverPeriod,
    uint _sumAssured,
    address payable _userAddress,
    bytes4 _currencyCode,
    address _scAddress,
    uint /*premium*/,
    uint premiumNXM
  ) external {
    uint expiryDate = now.add(uint(_coverPeriod).mul(1 days));
    allCovers.push(Cover(_userAddress, _currencyCode,
      _sumAssured, _coverPeriod, expiryDate, _scAddress, premiumNXM));
    uint cid = allCovers.length.sub(1);
    userCover[_userAddress].push(cid);
  }

  /// @dev Gets the Total Sum Assured amount of a given currency.

  function setTotalSumAssured(bytes4 currency, uint amount) public {
      sumAssuredByCurrency[currency] = amount;
  }
}
