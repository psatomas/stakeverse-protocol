import { expect } from "chai";
import hre from "hardhat";

describe("StakeVerseStaking", function () {
  let token: any;
  let staking: any;
  let owner: any;
  let user: any;
  let ethers: any; // We store the contextual ethers instance here

  beforeEach(async function () {
    // 1. Initialize the Hardhat v3 network connection context explicitly
    const connection = await hre.network.create();
    ethers = connection.ethers;

    [owner, user] = await ethers.getSigners();

    // 2. Deploy contracts using modern Hardhat v3 methods
    const Token = await ethers.getContractFactory("StakeVerseToken");
    token = await Token.deploy(owner.address);

    const Staking = await ethers.getContractFactory("StakeVerseStaking");
    staking = await Staking.deploy(await token.getAddress(), owner.address);

    // Send tokens to user
    await token.transfer(user.address, ethers.parseEther("1000"));
  });

  it("should allow staking", async function () {
    await token.connect(user).approve(await staking.getAddress(), ethers.parseEther("100"));
    await staking.connect(user).stake(ethers.parseEther("100"));

    const balance = await staking.stakedBalance(user.address);
    expect(balance).to.equal(ethers.parseEther("100"));
  });

  it("should allow unstaking", async function () {
    await token.connect(user).approve(await staking.getAddress(), ethers.parseEther("100"));
    await staking.connect(user).stake(ethers.parseEther("100"));
    await staking.connect(user).unstake(ethers.parseEther("40"));

    const balance = await staking.stakedBalance(user.address);
    expect(balance).to.equal(ethers.parseEther("60"));
  });

  it("should prevent unstaking more than staked", async function () {
    await token.connect(user).approve(await staking.getAddress(), ethers.parseEther("50"));
    await staking.connect(user).stake(ethers.parseEther("50"));

    // 3. CRITICAL: Pass 'ethers' inside the revertedWith check for Hardhat v3
    await expect(
      staking.connect(user).unstake(ethers.parseEther("100"))
    ).to.be.revertedWith("Insufficient balance");
  });

  it("should allow reward claiming", async function () {
    await token.connect(user).approve(await staking.getAddress(), ethers.parseEther("100"));
    await staking.connect(user).stake(ethers.parseEther("100"));

    // 4. Use the context-aware provider to simulate time passing
    await ethers.provider.send("evm_increaseTime", [3600 * 24 * 10]);
    await ethers.provider.send("evm_mine", []);

    const before = await token.balanceOf(user.address);
    await staking.connect(user).claimRewards();
    const after = await token.balanceOf(user.address);

    expect(after).to.be.gt(before);
  });
});