type Props = {
  title: string;
  status: string;
  votesFor: string;
  votesAgainst: string;
};

export default function ProposalCard({
  title,
  status,
  votesFor,
  votesAgainst,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-base">
          {title}
        </h3>

        <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs text-indigo-300">
          {status}
        </span>
      </div>

      <div className="space-y-2 mb-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-400">
            For
          </span>

          <span>{votesFor}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-400">
            Against
          </span>

          <span>{votesAgainst}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-medium hover:bg-emerald-500 transition-all">
          Vote Yes
        </button>

        <button className="flex-1 rounded-xl bg-rose-600 py-2.5 text-sm font-medium hover:bg-rose-500 transition-all">
          Vote No
        </button>
      </div>
    </div>
  );
}