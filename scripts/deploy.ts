import { ethers } from "ethers";
import hre from "hardhat";

async function main() {
  console.log("🚀 Deploying StakeVerse Protocol (clean mode)\n");

  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY!, provider);

  console.log("Deployer:", wallet.address);

  // helper to get ABI + bytecode from Hardhat artifacts
  const loadArtifact = async (name: string) => {
    return await hre.artifacts.readArtifact(name);
  };

  // ---------------- TOKEN ----------------
  const tokenArtifact = await loadArtifact("StakeVerseToken");

  const TokenFactory = new ethers.ContractFactory(
    tokenArtifact.abi,
    tokenArtifact.bytecode,
    wallet
  );

  const Token = await TokenFactory.deploy();
  await Token.waitForDeployment();

  const tokenAddress = await Token.getAddress();
  console.log("Token:", tokenAddress);

  // ---------------- NFT ----------------
  const nftArtifact = await loadArtifact("StakeVerseNFT");

  const NFTFactory = new ethers.ContractFactory(
    nftArtifact.abi,
    nftArtifact.bytecode,
    wallet
  );

  const NFT = await NFTFactory.deploy();
  await NFT.waitForDeployment();

  const nftAddress = await NFT.getAddress();
  console.log("NFT:", nftAddress);

  // ---------------- STAKING ----------------
  const stakingArtifact = await loadArtifact("StakeVerseStaking");

  const StakingFactory = new ethers.ContractFactory(
    stakingArtifact.abi,
    stakingArtifact.bytecode,
    wallet
  );

  const Staking = await StakingFactory.deploy(tokenAddress);
  await Staking.waitForDeployment();

  const stakingAddress = await Staking.getAddress();
  console.log("Staking:", stakingAddress);

  // ---------------- DAO ----------------
  const daoArtifact = await loadArtifact("StakeVerseDAO");

  const DAOFactory = new ethers.ContractFactory(
    daoArtifact.abi,
    daoArtifact.bytecode,
    wallet
  );

  const DAO = await DAOFactory.deploy(tokenAddress);
  await DAO.waitForDeployment();

  const daoAddress = await DAO.getAddress();
  console.log("DAO:", daoAddress);

  // ---------------- ORACLE ----------------
  const oracleArtifact = await loadArtifact("PriceOracleConsumer");

  const OracleFactory = new ethers.ContractFactory(
    oracleArtifact.abi,
    oracleArtifact.bytecode,
    wallet
  );

  const Oracle = await OracleFactory.deploy();
  await Oracle.waitForDeployment();

  const oracleAddress = await Oracle.getAddress();
  console.log("Oracle:", oracleAddress);

  console.log("\n✅ DEPLOYMENT COMPLETE\n");

  console.log({
    tokenAddress,
    nftAddress,
    stakingAddress,
    daoAddress,
    oracleAddress,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});