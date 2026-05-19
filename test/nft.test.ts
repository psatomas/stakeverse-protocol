import { expect } from "chai";
import hre from "hardhat";

describe("StakeVerseNFT", function () {
  let nft: any;
  let owner: any;
  let user: any;
  let ethers: any;

  beforeEach(async function () {
    const connection = await hre.network.create();

    ethers = connection.ethers;

    [owner, user] =
      await ethers.getSigners();

    const NFT =
      await ethers.getContractFactory(
        "StakeVerseNFT"
      );

    nft = await NFT.deploy(
      owner.address
    );

    await nft.waitForDeployment();
  });

  it("should deploy correctly", async function () {
    expect(
      await nft.getAddress()
    ).to.not.equal(
      ethers.ZeroAddress
    );
  });

  it("should mint NFT", async function () {
    await nft.mint(user.address);

    const balance =
      await nft.balanceOf(
        user.address
      );

    expect(balance).to.equal(1);
  });

  it("should assign ownership correctly", async function () {
    await nft.mint(user.address);

    const ownerOf =
      await nft.ownerOf(0);

    expect(ownerOf).to.equal(
      user.address
    );
  });

  it("should increment token IDs", async function () {
    await nft.mint(user.address);

    await nft.mint(user.address);

    const owner1 =
      await nft.ownerOf(0);

    const owner2 =
      await nft.ownerOf(1);

    expect(owner1).to.equal(
      user.address
    );

    expect(owner2).to.equal(
      user.address
    );
  });
});