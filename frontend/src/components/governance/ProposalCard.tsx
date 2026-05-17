import type { Proposal } from "../../contracts/dao";

interface ProposalCardProps {
  proposal: Proposal;
  onVoteYes: (id: number) => void;
  onVoteNo: (id: number) => void;
  txLoading: boolean;
}

export default function ProposalCard({
  proposal,
  onVoteYes,
  onVoteNo,
  txLoading,
}: ProposalCardProps) {
  const isExpired =
    Date.now() > proposal.deadline * 1000;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Proposal #{proposal.id}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            proposal.executed
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {proposal.executed
            ? "Executed"
            : "Active"}
        </span>
      </div>

      <p className="mb-6 text-zinc-300">
        {proposal.description}
      </p>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-zinc-400">
            Yes Votes
          </p>

          <p className="text-2xl font-bold text-green-400">
            {proposal.yesVotes}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-sm text-zinc-400">
            No Votes
          </p>

          <p className="text-2xl font-bold text-red-400">
            {proposal.noVotes}
          </p>
        </div>
      </div>

      <div className="mb-4 text-sm text-zinc-500">
        Deadline:{" "}
        {new Date(
          proposal.deadline * 1000
        ).toLocaleString()}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onVoteYes(proposal.id)}
          disabled={
            txLoading ||
            proposal.executed ||
            isExpired
          }
          className="flex-1 rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Vote Yes
        </button>

        <button
          onClick={() => onVoteNo(proposal.id)}
          disabled={
            txLoading ||
            proposal.executed ||
            isExpired
          }
          className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Vote No
        </button>
      </div>
    </div>
  );
}