import { useState } from "react";

import Navbar from "../components/layout/Navbar";

import StatsGrid from "../components/dashboard/StatsGrid";

import StakingPanel from "../components/staking/StakingPanel";

import ProposalCard from "../components/governance/ProposalCard";

import { useWallet } from "../hooks/useWallet";

import { useDashboard } from "../hooks/useDashboard";

import { approveTokens } from "../contracts/token";

import {
  stakeTokens,
  claimRewards,
} from "../contracts/staking";

export default function Dashboard() {
  const { address, connect } =
    useWallet();

  const {
    balance,
    staked,
    rewards,
    reload,
  } = useDashboard();

  const [amount, setAmount] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleApprove() {
    try {
      setLoading(true);

      await approveTokens(amount);

      await reload();

      alert("Tokens approved");
    } catch (error) {
      console.error(error);

      alert("Approval failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleStake() {
    try {
      setLoading(true);

      await stakeTokens(amount);

      await reload();

      alert("Stake failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleClaim() {
    try {
      setLoading(true);

      await claimRewards();

      await reload();

      alert("Rewards claimed");
    } catch (error) {
      console.error(error);

      alert("Claim failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar
        address={address}
        connect={connect}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <StatsGrid
          balance={balance}
          staked={staked}
          rewards={rewards}
        />

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <StakingPanel
              amount={amount}
              setAmount={setAmount}
              loading={loading}
              onApprove={handleApprove}
              onStake={handleStake}
              onClaim={handleClaim}
            />
          </div>

          <div className="space-y-5">
            <ProposalCard
              title="Increase staking rewards"
              status="Active"
              votesFor="67%"
              votesAgainst="33%"
            />

            <ProposalCard
              title="Treasury diversification"
              status="Pending"
              votesFor="52%"
              votesAgainst="48%"
            />
          </div>
        </section>
      </main>
    </div>
  );
}