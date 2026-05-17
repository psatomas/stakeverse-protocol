import { useEffect, useState } from "react";

import {
  approveTokens,
  getTokenBalance,
} from "../contracts/token";

import {
  stakeTokens,
  claimRewards,
  getPendingRewards,
} from "../contracts/staking";

import { getCurrentAddress } from "../services/web3";

export default function Staking() {
  const [amount, setAmount] = useState("");

  const [balance, setBalance] =
    useState("0");

  const [rewards, setRewards] =
    useState("0");

  async function loadData() {
    try {
      const address =
        await getCurrentAddress();

      const tokenBalance =
        await getTokenBalance(address);

      const pendingRewards =
        await getPendingRewards(address);

      setBalance(tokenBalance);

      setRewards(pendingRewards);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleApprove() {
    try {
      await approveTokens(amount);

      alert("Tokens approved");
    } catch (error) {
      console.error(error);

      alert("Approval failed");
    }
  }

  async function handleStake() {
    try {
      await stakeTokens(amount);

      alert("Tokens staked");

      loadData();
    } catch (error) {
      console.error(error);

      alert("Stake failed");
    }
  }

  async function handleClaim() {
    try {
      await claimRewards();

      alert("Rewards claimed");

      loadData();
    } catch (error) {
      console.error(error);

      alert("Claim failed");
    }
  }

  return (
    <div>
      <h2>Staking</h2>

      <p>Balance: {balance}</p>

      <p>Pending Rewards: {rewards}</p>

      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <div>
        <button onClick={handleApprove}>
          Approve
        </button>

        <button onClick={handleStake}>
          Stake
        </button>

        <button onClick={handleClaim}>
          Claim Rewards
        </button>
      </div>
    </div>
  );
}