import {
  Contract,
  formatUnits,
  parseUnits,
} from "ethers";

import tokenAbi from "./abis/StakeVerseToken.json";

import { CONTRACTS } from "./index";

import { getSigner } from "../services/web3";

export async function getTokenContract() {
  const signer = await getSigner();

  return new Contract(
    CONTRACTS.token,
    tokenAbi.abi,
    signer
  );
}

export async function getTokenBalance(
  address: string
) {
  const contract = await getTokenContract();

  const balance = await contract.balanceOf(address);

  return formatUnits(balance, 18);
}

export async function approveTokens(
  amount: string
) {
  const contract = await getTokenContract();

  const tx = await contract.approve(
    CONTRACTS.staking,
    parseUnits(amount, 18)
  );

  return await tx.wait();
}