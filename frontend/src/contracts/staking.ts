import {
  Contract,
  formatUnits,
  parseUnits,
} from "ethers";

import stakingAbi from "./abis/StakeVerseStaking.json";

import { CONTRACTS } from "./index";

import { getSigner } from "../services/web3";

export async function getStakingContract() {
  const signer = await getSigner();

  return new Contract(
    CONTRACTS.staking,
    stakingAbi.abi,
    signer
  );
}

export async function stakeTokens(
  amount: string
) {
  const contract = await getStakingContract();

  const tx = await contract.stake(
    parseUnits(amount, 18)
  );

  return await tx.wait();
}

export async function unstakeTokens(
  amount: string
) {
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

export async function getPendingRewards(
  address: string
) {
  const contract = await getStakingContract();

  const rewards =
    await contract.getPendingRewards(address);

  return formatUnits(rewards, 18);
}

export async function getStakedBalance(
  address: string
) {
  const contract = await getStakingContract();

  const balance =
    await contract.stakes(address);

  return formatUnits(balance, 18);
}