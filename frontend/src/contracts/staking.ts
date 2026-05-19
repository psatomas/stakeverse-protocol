// frontend/src/contracts/staking.ts
import {
  Contract,
  formatUnits,
  parseUnits,
} from "ethers";

import { CONTRACTS } from "./index";
import { getSigner } from "../services/web3";

// EXACT MATCH FOR YOUR SOLIDITY SMART CONTRACT:
// We explicitly define the correct method names ('stakedBalance' and 'calculateRewards')
const STAKING_HUMAN_ABI = [
  "function stake(uint256 amount) external",
  "function unstake(uint256 amount) external",
  "function claimRewards() external",
  "function calculateRewards(address user) external view returns (uint256)",
  "function stakedBalance(address user) external view returns (uint256)",
  "function stakingTimestamp(address user) external view returns (uint256)",
  "function rewardRate() external view returns (uint256)"
];

export async function getStakingContract() {
  const signer = await getSigner();

  return new Contract(
    CONTRACTS.staking,
    STAKING_HUMAN_ABI,
    signer
  );
}

export async function stakeTokens(amount: string) {
  const contract = await getStakingContract();

  const tx = await contract.stake(
    parseUnits(amount, 18)
  );

  return await tx.wait();
}

export async function unstakeTokens(amount: string) {
  const contract = await getStakingContract();

  const tx = await contract.unstake(
    parseUnits(amount, 18)
  );

  return await tx.wait();
}

export async function claimRewards() {
  const contract = await getStakingContract();

  const tx = await contract.claimRewards();

  return await tx.wait();
}

export async function getPendingRewards(address: string) {
  try {
    const contract = await getStakingContract();

    // FIXED: Changed from getPendingRewards to match your Solidity function: calculateRewards(address)
    const rewards = await contract.calculateRewards(address);

    return formatUnits(rewards, 18);
  } catch (error) {
    console.error("Error inside getPendingRewards service block:", error);
    return "0.0";
  }
}

export async function getStakedBalance(address: string) {
  try {
    const contract = await getStakingContract();

    // FIXED: Changed from stakes to match your Solidity mapping getter: stakedBalance(address)
    const balance = await contract.stakedBalance(address);

    return formatUnits(balance, 18);
  } catch (error) {
    console.error("Error inside getStakedBalance service block:", error);
    return "0.0";
  }
}