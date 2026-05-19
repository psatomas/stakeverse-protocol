import { useState } from "react";
import ProposalCard from "./ProposalCard";
import { useGovernance } from "../../hooks/useGovernance";

// Define the type interface for the component props
interface GovernancePanelProps {
  address: string;
}

export default function GovernancePanel({ address }: GovernancePanelProps) {
  // Pass the stateful wallet address straight into the custom hook
  const {
    proposals,
    loading,
    txLoading,
    error,
    voteYes,
    voteNo,
    submitProposal,
  } = useGovernance(address);

  const [description, setDescription] = useState("");

  async function handleSubmit() {
    if (!description.trim()) {
      return;
    }

    await submitProposal(description);
    setDescription("");
  }

  // GUEST STATE VIEW: If the wallet isn't connected, hide the panel content and prevent errors
  if (!address) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-400">
        <h2 className="mb-2 text-2xl font-bold text-white">Governance</h2>
        <p className="text-zinc-500">
          Please connect your MetaMask wallet to Sepolia to view and participate in protocol proposals.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Governance
        </h2>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Create proposal..."
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-indigo-500 transition"
          />

          <button
            onClick={handleSubmit}
            disabled={txLoading}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
          >
            {txLoading ? "Processing..." : "Create"}
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-zinc-400 animate-pulse">
          Loading proposals from Sepolia...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {!loading && proposals.length === 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
          No proposals found.
        </div>
      )}

      <div className="grid gap-6">
        {proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            onVoteYes={voteYes}
            onVoteNo={voteNo}
            txLoading={txLoading}
          />
        ))}
      </div>
    </div>
  );
}