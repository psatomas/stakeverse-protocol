import { expect } from "chai";
import hre from "hardhat";

describe("StakeVerseDAO", function () {
  let token: any;
  let dao: any;
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

    const DAO =
      await ethers.getContractFactory(
        "StakeVerseDAO"
      );

    dao = await DAO.deploy(
      await token.getAddress(),
      owner.address
    );

    await dao.waitForDeployment();

    await token.transfer(
      user.address,
      ethers.parseEther("100")
    );
  });

  it("should create proposal", async function () {
    await dao.createProposal(
      "Increase reward rate",
      3600
    );

    const proposal =
      await dao.getProposal(1);

    expect(
      proposal.description
    ).to.equal(
      "Increase reward rate"
    );
  });

  it("should allow voting", async function () {
    await dao.createProposal(
      "Test proposal",
      3600
    );

    await token
      .connect(user)
      .approve(
        await dao.getAddress(),
        ethers.parseEther("100")
      );

    await dao
      .connect(user)
      .vote(1, true);

    const proposal =
      await dao.getProposal(1);

    expect(
      proposal.yesVotes
    ).to.be.gt(0);
  });

  it("should prevent double voting", async function () {
    await dao.createProposal(
      "Test proposal",
      3600
    );

    await token
      .connect(user)
      .approve(
        await dao.getAddress(),
        ethers.parseEther("100")
      );

    await dao
      .connect(user)
      .vote(1, true);

    await expect(
      dao
        .connect(user)
        .vote(1, true)
    ).to.be.rejectedWith(
      "Already voted"
    );
  });

  it("should execute proposal after deadline", async function () {
    await dao.createProposal(
      "Test proposal",
      1
    );

    await ethers.provider.send(
      "evm_increaseTime",
      [2]
    );

    await ethers.provider.send(
      "evm_mine",
      []
    );

    await dao.executeProposal(1);

    const proposal =
      await dao.getProposal(1);

    expect(
      proposal.executed
    ).to.equal(true);
  });
});