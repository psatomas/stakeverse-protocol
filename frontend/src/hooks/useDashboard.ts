import { useEffect, useState } from "react";

import {
  getTokenBalance,
} from "../contracts/token";

import {
  getPendingRewards,
  getStakedBalance,
} from "../contracts/staking";

import { getCurrentAddress } from "../services/web3";

export function useDashboard() {
  const [balance, setBalance] =
    useState("0");

  const [staked, setStaked] =
    useState("0");

  const [rewards, setRewards] =
    useState("0");

  async function load() {
    try {
      const address =
        await getCurrentAddress();

      const tokenBalance =
        await getTokenBalance(address);

      const stakedBalance =
        await getStakedBalance(address);

      const pendingRewards =
        await getPendingRewards(address);

      setBalance(tokenBalance);

      setStaked(stakedBalance);

      setRewards(pendingRewards);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return {
    balance,
    staked,
    rewards,
    reload: load,
  };
}