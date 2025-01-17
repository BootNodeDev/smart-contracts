const { web3 } = require('hardhat');
const { ether } = require('@openzeppelin/test-helpers');
const { MAX_UINT256 } = require('@openzeppelin/test-helpers').constants;
const { toBN } = web3.utils;

async function enrollMember ({ mr, tk, tc }, members, options = {}) {
  const { initialTokens = ether('2500') } = options;

  for (const member of members) {
    await mr.payJoiningFee(member, { from: member, value: ether('0.002') });
    await mr.kycVerdict(member, true);
    await tk.approve(tc.address, MAX_UINT256, { from: member });
    await tk.transfer(member, toBN(initialTokens));
  }
}

async function enrollClaimAssessor ({ tc }, assessors, options = {}) {
  const { lockTokens = ether('2000'), validity = 180 * 24 * 60 * 60 } = options;

  for (const member of assessors) {
    // [todo] All assessors will be unlocked
    // await tc.lockClaimAssessmentTokens(toBN(lockTokens), toBN(validity), { from: member });
  }
}

module.exports = {
  enrollMember,
  enrollClaimAssessor,
};
