type Props = {
  amount: string;

  setAmount: (
    value: string
  ) => void;

  loading: boolean;

  onApprove: () => void;

  onStake: () => void;

  onClaim: () => void;
};

export default function StakingPanel({
  amount,
  setAmount,
  loading,
  onApprove,
  onStake,
  onClaim,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-8 shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold">
            Staking Dashboard
          </h2>

          <p className="text-zinc-400 mt-1">
            Stake SVT and earn
            protocol rewards.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
          APY 12.4%
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Stake Amount
          </label>

          <input
            type="text"
            placeholder="0.0"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950/80 px-5 py-4 text-lg outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={onApprove}
            disabled={loading}
            className="rounded-2xl bg-zinc-800 py-4 font-medium hover:bg-zinc-700 transition-all duration-200 disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : "Approve"}
          </button>

          <button
            onClick={onStake}
            disabled={loading}
            className="rounded-2xl bg-indigo-600 py-4 font-medium hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-500/20 disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : "Stake Tokens"}
          </button>

          <button
            onClick={onClaim}
            disabled={loading}
            className="rounded-2xl bg-emerald-600 py-4 font-medium hover:bg-emerald-500 transition-all duration-200 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : "Claim Rewards"}
          </button>
        </div>
      </div>
    </div>
  );
}