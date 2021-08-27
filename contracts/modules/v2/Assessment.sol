// SPDX-License-Identifier: GPL-3.0-only

pragma solidity ^0.8.0;

import "../../interfaces/INXMToken.sol";
import "../../interfaces/ITokenController.sol";
import "../../interfaces/IAssessment.sol";
import "../../abstract/MasterAwareV2.sol";
import "../../libraries/Assessment/AssessmentGovernanceActionsLib.sol";

/// Provides a way for cover owners to submit claims and redeem the payouts and facilitates
/// assessment processes where members decide the outcome of the events that lead to potential
/// payouts.
contract Assessment is IAssessment, MasterAwareV2 {

  INXMToken internal immutable nxm;

  /* ========== STATE VARIABLES ========== */

  Configuration public config;

  // Stake states of users. (See Stake struct)
  mapping(address => Stake) public override stakeOf;

  // Votes of users. (See Vote struct)
  mapping(address => Vote[]) public override votesOf;

  // Mapping used to determine if a user has already voted, using a vote hash as a key
  mapping(address => mapping(uint => bool)) public override hasAlreadyVotedOn;

  // An array of merkle tree roots used to indicate fraudulent assessors. Each root represents a
  // fraud attempt by one or multiple addresses. Once the root is submitted by adivsory board
  // members through governance, burnFraud uses this root to burn the fraudulent assessors' stakes
  // and correct the outcome of the poll.
  bytes32[] internal fraudMerkleRoots;

  // [todo] add comments
  mapping(uint => Poll) internal fraudSnapshot;

  Assessment[] public override assessments;

  /* ========== CONSTRUCTOR ========== */

  constructor(address masterAddress) {
    // [todo] Move to intiialize function
    // The minimum cover premium is 2.6%. 20% of the cover premium is: 2.6% * 20% = 0.52%
    config.minVotingPeriodDays = 3; // days
    config.payoutCooldownDays = 1; //days
    master = INXMMaster(masterAddress);
    nxm = INXMToken(master.tokenAddress());
  }

  /* ========== VIEWS ========== */

  function min(uint a, uint b) internal pure returns (uint) {
    return a <= b ? a : b;
  }

  function getVoteCountOfAssessor(address assessor) external override view returns (uint) {
    return votesOf[assessor].length;
  }

  function getAssessmentsCount() external override view returns (uint) {
    return assessments.length;
  }

  function _getPollStatus(Poll memory poll) internal view returns (PollStatus) {
    if (block.timestamp < poll.end) {
      return PollStatus.PENDING;
    }
    if (poll.accepted > poll.denied) {
      // [todo] Could be worth checking if it's in cooldown period and return a new status
      return PollStatus.ACCEPTED;
    }
    return PollStatus.DENIED;
  }

  /* === MUTATIVE FUNCTIONS ==== */

  function depositStake(uint96 amount) external override onlyMember {
    stakeOf[msg.sender].amount += amount;
    ITokenController(getInternalContractAddress(ID.TC))
      .operatorTransfer(msg.sender, address(this), amount);
  }

  // [todo] Expose a view to find out the last index until withdrawals can be made and also
  //  views for total rewards and withdrawable rewards
  function withdrawReward(address user, uint104 untilIndex) external override
  returns (uint withdrawn, uint104 withdrawUntilIndex) {
    Stake memory stake = stakeOf[user];
    {
      uint voteCount = votesOf[user].length;
      withdrawUntilIndex = untilIndex > 0 ? untilIndex : uint104(voteCount);
      require(
        untilIndex <= voteCount,
        "Vote count is smaller that the provided untilIndex"
      );
      require(stake.rewardsWithdrawnUntilIndex < voteCount, "No withdrawable rewards");
    }

    uint totalReward;
    Vote memory vote;
    Poll memory poll;
    for (uint i = stake.rewardsWithdrawnUntilIndex; i < withdrawUntilIndex; i++) {
      vote = votesOf[user][i];
      poll = assessments[vote.pollId];
      if (poll.end + config.payoutCooldownDays * 1 days >= blockTimestamp) {
        // Poll is not final
        break;
      }

      // [todo] Replace with storage read
      totalReward = _getTotalRewardForEvent(
        config,
        EventType(vote.eventType),
        vote.eventId,
        claims,
        incidents
      );

      withdrawn += totalReward * vote.tokenWeight / (poll.accepted + poll.denied);
    }

    // [todo] withdrawUntilIndex should be replaced with the last processed index from the loop above
    stakeOf[user].rewardsWithdrawnUntilIndex = withdrawUntilIndex;
    // [todo] Replace with TC
    nxm.mint(user, withdrawn);
  }

  function withdrawStake(uint96 amount) external override onlyMember {
    Stake storage stake = stakeOf[msg.sender];
    require(stake.amount != 0, "No tokens staked");
    uint voteCount = votesOf[msg.sender].length;
    Vote vote = votesOf[msg.sender][voteCount - 1];
    // [todo] Add stake lockup period from config
    require(
      block.timestamp > vote.timestamp + config.maxVotingPeriodDays + config.payoutCooldownDays,
      "Stake is in lockup period"
     );

    nxm.transferFrom(address(this), msg.sender, amount);
    stake.amount -= amount;
  }

  function startAssessment(uint totalAssessmentReward) external
  override onlyInternal returns (uint) {
    assessments.push(Assessment(
      Poll(
        0, // accepted
        0, // denied
        uint32(block.timestamp), // start
        uint32(block.timestamp + config.minVotingPeriodDays * 1 days) // end
      ),
      AssessmentDetails(
        uint128(totalAssessmentReward)
      )
    ));
    return assessments.length - 1;
  }

  // [todo] Check how many times poll is loaded from storage
  function castVote(uint pollId, bool isAccepted) external override onlyMember {
    {
      require(!hasAlreadyVotedOn[msg.sender][pollId], "Already voted");
      hasAlreadyVotedOn[msg.sender][pollId] = true;
    }

    Stake memory stake = stakeOf[msg.sender];
    require(stake.amount > 0, "A stake is required to cast votes");

    Poll memory poll = assessments[pollId].poll;
    require(block.timestamp < poll.end, "Voting is closed");
    require(
      poll.accepted > 0 || isAccepted,
      "At least one accept vote is required to vote deny"
    );

    if (isAccepted && poll.accepted == 0) {
      // Reset the poll end when the first accepted vote
      poll.end = block.timestamp + config.minVotingPeriodDays * 1 days;
    }

    // Check if poll ends in less than 24 hours
    if (poll.end - block.timestamp < 1 days) {
      // Extend proportionally to the user's stake but up to 1 day maximum
      poll.end += min(1 days, 1 days * stake.amount / (poll.accepted + poll.denied));
    }

    if (isAccepted) {
      poll.accepted += stake.amount;
    } else {
      poll.denied += stake.amount;
    }

    assessments[pollId].poll = poll;

    votesOf[msg.sender].push(Vote(
      pollId,
      isAccepted,
      blockTimestamp,
      stake.amount,
      eventType
    ));
  }

  function submitFraud(bytes32 root) external override onlyGovernance {
    fraudMerkleRoots.push(root);
  }

  function burnFraud(
    uint256 rootIndex,
    bytes32[] calldata proof,
    address fraudulentAssessor,
    uint256 lastFraudulentVoteIndex,
    uint96 burnAmount,
    uint16 fraudCount,
    uint256 voteBatchSize
  ) external override {
    require(
      MerkleProof.verify(
        proof,
        fraudMerkleRoots[rootIndex],
        getFraudulentAssessorLeaf(
          fraudulentAssessor,
          lastFraudulentVoteIndex,
          burnAmount,
          fraudCount
        )
      ),
      "Invalid merkle proof"
    );

    Stake memory stake = stakeOf[fraudulentAssessor];

    // Make sure we don't burn beyong lastFraudulentVoteIndex
    uint processUntil = stake.rewardsWithdrawnUntilIndex + voteBatchSize;
    if ( processUntil >= lastFraudulentVoteIndex){
      processUntil = lastFraudulentVoteIndex + 1;
    }

    for (uint j = stake.rewardsWithdrawnUntilIndex; j < processUntil; j++) {
      IAssessment.Vote memory vote = votesOf[fraudulentAssessor][j];
      IAssessment.Poll memory poll = assessments[vote.assessmentId].poll;

      {
        if (uint32(block.timestamp) >= poll.end + config.payoutCooldownDays * 1 days) {
          // Once the cooldown period ends the poll result is final
          return;
        }
      }

      {
        IAssessment.Poll memory pollFraud = pollFraudOfEvent[vote.eventType][vote.eventId];

        // Check if pollFraud exists. The start date is guaranteed to be > 0 in any poll.
        if (pollFraud.start == 0) {
          // Copy the current poll results before correction starts
          pollFraudOfEvent[vote.eventType][vote.eventId] = poll;
        }
      }

      {
        if (vote.accepted) {
          poll.accepted -= vote.tokenWeight;
        } else {
          poll.denied -= vote.tokenWeight;
        }

        if (poll.end < uint32(block.timestamp) + 1 days) {
          poll.end = uint32(block.timestamp) + 1 days;
        }
      }

      assessments[vote.pollId].poll = poll;
    }

    if (fraudCount == stake.fraudCount) {
      // Burns an assessor only once for each merkle root, no matter how many times this function
      // runs on the same account. When a transaction is too big to fit in one block, it is batched
      // in multiple transactions according to voteBatchSize. After burning the tokens, fraudCount
      // is incremented. If another merkle root is submitted that contains the same addres, the leaf
      // should use the updated fraudCount stored in the Stake struct as input.
      //nxm.burn(uint(stake.amount));
      // [todo] Burn the maximum between burnAmount and stake.amount
      stake.amount -= burnAmount;
      stake.fraudCount++;
    }

    stake.rewardsWithdrawnUntilIndex = uint104(processUntil);
    stakeOf[fraudulentAssessor] = stake;

  }

  function updateUintParameters(UintParams[] calldata paramNames, uint[] calldata values)
  external override onlyGovernance {
    config = AssessmentGovernanceActionsLib.getUpdatedUintParameters(config, paramNames, values);
  }

  // [todo] Since this function is called every time contracts change,
  // all internal contracts could be stored here to avoid calls to master when
  // using onlyInternal or simply making a call to another contract.
  // What I have in mind is that every time this function is called, everything should
  // be wiped out and replaced with what is passed as calldata by master. This function
  // should only be callable by master.
  function changeDependentContractAddress() external override {
    master = INXMMaster(master);
    internalContracts[uint(ID.TC)] = master.getLatestAddress("TC");
  }

}
