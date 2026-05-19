import { expect } from "chai";
import hre from "hardhat";

describe("PriceOracleConsumer", function () {
  let oracle: any;
  let mockFeed: any;
  let ethers: any;

  beforeEach(async function () {
    const connection = await hre.network.create();

    ethers = connection.ethers;

    const MockFeed =
      await ethers.getContractFactory(
        "MockV3Aggregator"
      );

    mockFeed =
      await MockFeed.deploy(
        3000n * 10n ** 8n
      );

    await mockFeed.waitForDeployment();

    const Oracle =
      await ethers.getContractFactory(
        "PriceOracleConsumer"
      );

    oracle =
      await Oracle.deploy(
        await mockFeed.getAddress()
      );

    await oracle.waitForDeployment();
  });

  it("should deploy correctly", async function () {
    expect(
      await oracle.getAddress()
    ).to.not.equal(
      ethers.ZeroAddress
    );
  });

  it("should return latest ETH price", async function () {
    const price =
      await oracle.getLatestETHPrice();

    expect(price).to.not.equal(0);
  });

  it("should return positive ETH price value", async function () {
    const price =
      await oracle.getLatestETHPrice();

    expect(price).to.be.gt(0);
  });
});