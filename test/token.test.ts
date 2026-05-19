import { expect } from "chai";
import hre from "hardhat";

describe("StakeVerseToken", function () {
  let token: any;
  let owner: any;
  let user: any;
  let ethers: any;

  beforeEach(async function () {
    const connection = await hre.network.create();

    ethers = connection.ethers;

    [owner, user] =
      await ethers.getSigners();

    const Token =
      await ethers.getContractFactory(
        "StakeVerseToken"
      );

    token = await Token.deploy(
      owner.address
    );

    await token.waitForDeployment();
  });

  it("should deploy correctly", async function () {
    expect(
      await token.getAddress()
    ).to.not.equal(
      ethers.ZeroAddress
    );
  });

  it("should mint initial supply to owner", async function () {
    const balance =
      await token.balanceOf(
        owner.address
      );

    expect(balance).to.be.gt(0);
  });

  it("should transfer tokens", async function () {
    await token.transfer(
      user.address,
      ethers.parseEther("100")
    );

    const balance =
      await token.balanceOf(
        user.address
      );

    expect(balance).to.equal(
      ethers.parseEther("100")
    );
  });

  it("should approve allowance", async function () {
    await token.approve(
      user.address,
      ethers.parseEther("50")
    );

    const allowance =
      await token.allowance(
        owner.address,
        user.address
      );

    expect(allowance).to.equal(
      ethers.parseEther("50")
    );
  });
});