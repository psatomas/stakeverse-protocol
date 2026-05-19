import { expect } from "chai";
import hre from "hardhat";

describe("StakeVerseStaking", function () {
  let token: any;
  let staking: any;
  let owner: any;
  let user: any;
  let ethers: any;

  beforeEach(async function () {
    const connection = await hre.network.create();

    ethers = connection.ethers;

    [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory(
      "StakeVerseToken"
    );

    token = await Token.deploy(owner.address);

    await token.waitForDeployment();

    const Staking = await ethers.getContractFactory(
      "StakeVerseStaking"
    );

    staking = await Staking.deploy(
      await token.getAddress(),
      owner.address
    );

    await staking.waitForDeployment();

    await token.transfer(
      user.address,
      ethers.parseEther("1000")
    );
  });

  it("should allow staking", async function () {
    await token
      .connect(user)
      .approve(
        await staking.getAddress(),
        ethers.parseEther("100")
      );

    await staking
      .connect(user)
      .stake(ethers.parseEther("100"));

    const balance =
      await staking.stakedBalance(user.address);

    expect(balance).to.equal(
      ethers.parseEther("100")
    );
  });

  it("should allow unstaking", async function () {
    await token
      .connect(user)
      .approve(
        await staking.getAddress(),
        ethers.parseEther("100")
      );

    await staking
      .connect(user)
      .stake(ethers.parseEther("100"));

    await staking
      .connect(user)
      .unstake(ethers.parseEther("40"));

    const balance =
      await staking.stakedBalance(user.address);

    expect(balance).to.equal(
      ethers.parseEther("60")
    );
  });

  it("should prevent unstaking more than staked", async function () {
    await token
      .connect(user)
      .approve(
        await staking.getAddress(),
        ethers.parseEther("50")
      );

    await staking
      .connect(user)
      .stake(ethers.parseEther("50"));

    await expect(
      staking
        .connect(user)
        .unstake(ethers.parseEther("100"))
    ).to.be.rejectedWith(
      "Insufficient balance"
    );
  });

  it("should allow reward claiming", async function () {
    await token
      .connect(user)
      .approve(
        await staking.getAddress(),
        ethers.parseEther("100")
      );

    await staking
      .connect(user)
      .stake(ethers.parseEther("100"));

    await ethers.provider.send(
      "evm_increaseTime",
      [3600 * 24 * 10]
    );

    await ethers.provider.send(
      "evm_mine",
      []
    );

    const before =
      await token.balanceOf(user.address);

    await staking
      .connect(user)
      .claimRewards();

    const after =
      await token.balanceOf(user.address);

    expect(after).to.be.gt(before);
  });
});