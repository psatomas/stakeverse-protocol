import StatCard from "./StatCard";

type Props = {
  balance: string;
  staked: string;
  rewards: string;
};

export default function StatsGrid({
  balance,
  staked,
  rewards,
}: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      <StatCard
        title="Wallet Balance"
        value={`${balance} SVT`}
        subtitle="StakeVerse Token"
      />

      <StatCard
        title="Staked Amount"
        value={`${staked} SVT`}
        subtitle="Currently locked"
      />

      <StatCard
        title="Pending Rewards"
        value={`${rewards} SVT`}
        subtitle="Available to claim"
      />

      <StatCard
        title="ETH/USD Oracle"
        value="$3,412"
        subtitle="Chainlink Price Feed"
      />
    </section>
  );
}


