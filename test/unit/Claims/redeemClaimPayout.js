const { ethers } = require('hardhat');
const { time } = require('@openzeppelin/test-helpers');
const { assert, expect } = require('chai');

const { submitClaim, daysToSeconds, ASSET } = require('./helpers');
const { mineNextBlock, setNextBlockTime } = require('../../utils/evm');

const { parseEther, formatEther } = ethers.utils;

const setTime = async timestamp => {
  await setNextBlockTime(timestamp);
  await mineNextBlock();
};

describe('redeemClaimPayout', function () {
  it('reverts if the claim is not accepted', async function () {
    const { claims, cover, assessment } = this.contracts;
    const [coverOwner] = this.accounts.members;
    const coverPeriod = daysToSeconds(30);
    const coverAmount = parseEther('100');
    await cover.buyCover(
      coverOwner.address,
      0, // productId
      ASSET.ETH,
      coverAmount,
      coverPeriod,
      parseEther('2.6'),
      [],
    );
    const coverId = 0;
    {
      await submitClaim(this)({ coverId, sender: coverOwner });
      const { payoutCooldownDays } = await assessment.config();
      const { poll } = await assessment.assessments(0);
      await setTime(poll.end + daysToSeconds(payoutCooldownDays));
      await expect(claims.redeemClaimPayout(0)).to.be.revertedWith('The claim needs to be accepted');
    }

    {
      await submitClaim(this)({ coverId, sender: coverOwner });
      const { payoutCooldownDays } = await assessment.config();
      const { poll } = await assessment.assessments(1);
      await assessment.castVote(1, true, parseEther('1'));
      await assessment.castVote(1, false, parseEther('2'));
      await setTime(poll.end + daysToSeconds(payoutCooldownDays));
      await expect(claims.redeemClaimPayout(1)).to.be.revertedWith('The claim needs to be accepted');
    }

    {
      await submitClaim(this)({ coverId, sender: coverOwner });
      const { payoutCooldownDays } = await assessment.config();
      const { poll } = await assessment.assessments(2);
      await assessment.castVote(2, true, parseEther('1'));
      await setTime(poll.end + daysToSeconds(payoutCooldownDays));
      await expect(claims.redeemClaimPayout(2)).not.to.be.revertedWith('The claim needs to be accepted');
    }
  });

  it('reverts while the claim is being assessed', async function () {
    const { claims, cover, assessment } = this.contracts;
    const [coverOwner] = this.accounts.members;
    const coverPeriod = daysToSeconds(30);
    const coverAmount = parseEther('100');
    await cover.buyCover(
      coverOwner.address,
      0, // productId
      ASSET.ETH,
      coverAmount,
      coverPeriod,
      parseEther('2.6'),
      [],
    );
    const coverId = 0;
    await submitClaim(this)({ coverId, sender: coverOwner });

    {
      const { poll } = await assessment.assessments(0);
      await setTime(poll.end);
      await expect(claims.redeemClaimPayout(0)).not.to.be.revertedWith('The claim is still being assessed');
    }

    {
      await assessment.castVote(0, true, parseEther('1'));
      const { poll } = await assessment.assessments(0);
      const latestBlock = await ethers.provider.getBlock('latest');
      await setTime(poll.end - (poll.end - latestBlock.timestamp) / 2);
      await expect(claims.redeemClaimPayout(0)).to.be.revertedWith('The claim is still being assessed');
    }

    {
      const { poll } = await assessment.assessments(0);
      const latestBlock = await ethers.provider.getBlock('latest');
      await setTime(poll.end - (poll.end - latestBlock.timestamp) / 3);
      await expect(claims.redeemClaimPayout(0)).to.be.revertedWith('The claim is still being assessed');
    }
  });

  it('reverts while the claim is in cooldown period', async function () {
    const { claims, cover, assessment } = this.contracts;
    const [coverOwner] = this.accounts.members;
    const coverPeriod = daysToSeconds(30);
    const coverAmount = parseEther('100');
    await cover.buyCover(
      coverOwner.address,
      0, // productId
      ASSET.ETH,
      coverAmount,
      coverPeriod,
      parseEther('2.6'),
      [],
    );
    const coverId = 0;
    await submitClaim(this)({ coverId, sender: coverOwner });
    await assessment.castVote(0, true, parseEther('1'));
    const { poll } = await assessment.assessments(0);
    await setTime(poll.end);
    await expect(claims.redeemClaimPayout(0)).to.be.revertedWith('The claim is in cooldown period');

    const { payoutCooldownDays } = await assessment.config();
    await setTime(poll.end + daysToSeconds(payoutCooldownDays));
    await expect(claims.redeemClaimPayout(0)).not.to.be.revertedWith('The claim is in cooldown period');
  });

  it('reverts if the redemption period expired', async function () {
    const { claims, cover, assessment } = this.contracts;
    const [coverOwner] = this.accounts.members;
    const coverPeriod = daysToSeconds(30);
    const coverAmount = parseEther('100');
    await cover.buyCover(
      coverOwner.address,
      0, // productId
      ASSET.ETH,
      coverAmount,
      coverPeriod,
      parseEther('2.6'),
      [],
    );
    const coverId = 0;
    await submitClaim(this)({ coverId, sender: coverOwner });
    await assessment.castVote(0, true, parseEther('1'));
    const { poll } = await assessment.assessments(0);
    const { payoutCooldownDays } = await assessment.config();
    const { payoutRedemptionPeriodDays } = await claims.config();
    await setTime(poll.end + daysToSeconds(payoutCooldownDays));
    await expect(claims.redeemClaimPayout(0)).not.to.be.reverted;
    await setTime(poll.end + daysToSeconds(payoutCooldownDays + payoutRedemptionPeriodDays));
    await expect(claims.redeemClaimPayout(0)).to.be.revertedWith('The redemption period has expired');
  });

  it('reverts if a payout has already been redeemed', async function () {
    const { claims, cover, assessment, pool } = this.contracts;
    const [coverOwner] = this.accounts.members;
    const coverPeriod = daysToSeconds(30);
    const coverAmount = parseEther('100');
    await cover.buyCover(
      coverOwner.address,
      0, // productId
      ASSET.ETH,
      coverAmount,
      coverPeriod,
      parseEther('2.6'),
      [],
    );
    const coverId = 0;
    await submitClaim(this)({ coverId, sender: coverOwner });
    await assessment.castVote(0, true, parseEther('1'));
    const { poll } = await assessment.assessments(0);
    const { payoutCooldownDays } = await assessment.config();
    await setTime(poll.end + daysToSeconds(payoutCooldownDays));
    await expect(claims.redeemClaimPayout(0)).not.to.be.reverted;
    await expect(claims.connect(coverOwner).redeemClaimPayout(0)).to.be.revertedWith(
      'Payout has already been redeemed',
    );
  });

  it("sets the claim's payoutRedeemed property to true", async function () {
    const { claims, cover, assessment, pool } = this.contracts;
    const [coverOwner] = this.accounts.members;
    const coverPeriod = daysToSeconds(30);
    const coverAmount = parseEther('100');
    await cover.buyCover(
      coverOwner.address,
      0, // productId
      ASSET.ETH,
      coverAmount,
      coverPeriod,
      parseEther('2.6'),
      [],
    );
    const coverId = 0;
    await submitClaim(this)({ coverId, sender: coverOwner });
    await assessment.castVote(0, true, parseEther('1'));
    const { poll } = await assessment.assessments(0);
    const { payoutCooldownDays } = await assessment.config();
    await setTime(poll.end + daysToSeconds(payoutCooldownDays));
    await claims.redeemClaimPayout(0);
    const { payoutRedeemed } = await claims.claims(0);
    expect(payoutRedeemed).to.be.equal(true);
  });

  it('sends the payout amount in ETH and the assessment deposit to the cover owner', async function () {
    // also check after NFT transfer
    const { claims, cover, assessment, pool } = this.contracts;
    const [coverOwner, otherMember] = this.accounts.members;
    const coverPeriod = daysToSeconds(30);
    const coverAmount = parseEther('100');

    await cover.buyCover(
      coverOwner.address,
      0, // productId
      ASSET.ETH,
      coverAmount,
      coverPeriod,
      parseEther('2.6'),
      [],
      { gasPrice: 0 },
    );

    const ethBalanceBefore = await ethers.provider.getBalance(coverOwner.address);
    const coverId = 0;
    const [deposit] = await claims.getAssessmentDepositAndReward(coverAmount, coverPeriod, ASSET.ETH);
    await claims.connect(coverOwner)['submitClaim(uint32,uint96,string)'](coverId, coverAmount, '', {
      value: deposit,
      gasPrice: 0,
    });

    await assessment.connect(otherMember).castVote(0, true, parseEther('1'));
    const { poll } = await assessment.assessments(0);
    const { payoutCooldownDays } = await assessment.config();
    await setTime(poll.end + daysToSeconds(payoutCooldownDays));

    await claims.connect(coverOwner).redeemClaimPayout(0, { gasPrice: 0 });
    const ethBalanceAfter = await ethers.provider.getBalance(coverOwner.address);

    expect(ethBalanceAfter).to.be.equal(ethBalanceBefore.add(coverAmount));
  });

  it('sends the payout amount in DAI and the assessment deposit to the cover owner', async function () {
    // also check after NFT transfer
    const { claims, cover, assessment, dai } = this.contracts;
    const [coverOwner, otherMember] = this.accounts.members;
    const coverPeriod = daysToSeconds(30);
    const coverAmount = parseEther('100');

    await cover.buyCover(
      coverOwner.address,
      0, // productId
      ASSET.DAI,
      coverAmount,
      coverPeriod,
      parseEther('2.6'),
      [],
      { gasPrice: 0 },
    );

    const ethBalanceBefore = await ethers.provider.getBalance(coverOwner.address);
    const daiBalanceBefore = await dai.balanceOf(coverOwner.address);
    const coverId = 0;
    const [deposit] = await claims.getAssessmentDepositAndReward(coverAmount, coverPeriod, ASSET.ETH);
    await claims.connect(coverOwner)['submitClaim(uint32,uint96,string)'](coverId, coverAmount, '', {
      value: deposit,
      gasPrice: 0,
    });

    await assessment.connect(otherMember).castVote(0, true, parseEther('1'));
    const { poll } = await assessment.assessments(0);
    const { payoutCooldownDays } = await assessment.config();
    await setTime(poll.end + daysToSeconds(payoutCooldownDays));

    await claims.connect(coverOwner).redeemClaimPayout(0, { gasPrice: 0 });
    const ethBalanceAfter = await ethers.provider.getBalance(coverOwner.address);
    const daiBalanceAfter = await dai.balanceOf(coverOwner.address);

    expect(ethBalanceAfter).to.be.equal(ethBalanceBefore);
    expect(daiBalanceAfter).to.be.equal(daiBalanceBefore.add(coverAmount));
  });

  it('calls performPayoutBurn from Cover.sol with the correct cover ID and amount to be burned', async function () {
    assert(false, '[todo]');
  });
});
