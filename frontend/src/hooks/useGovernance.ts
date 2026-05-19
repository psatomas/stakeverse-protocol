import { useEffect, useState, useCallback } from "react";
import type { Proposal } from "../contracts/dao";

import {
    getAllProposals,
    voteProposal,
    createProposal,
} from "../contracts/dao";

// Pass the stateful wallet address down to control execution flow
export function useGovernance(address: string) {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(false);
    const [txLoading, setTxLoading] = useState(false);
    const [error, setError] = useState("");

    // Memoize loadProposals so it can safely be monitored as a dependency
    const loadProposals = useCallback(async () => {
        // CIRCUIT BREAKER: Block execution instantly if the wallet isn't authenticated yet
        if (!address) return;

        try {
            setLoading(true);
            setError("");

            const data = await getAllProposals();
            setProposals(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load proposals");
        } finally {
            setLoading(false);
        }
    }, [address]);

    async function voteYes(id: number) {
        if (!address) return;
        try {
            setTxLoading(true);
            setError("");

            await voteProposal(id, true);
            await loadProposals();
        } catch (err) {
            console.error(err);
            setError("Vote transaction failed");
        } finally {
            setTxLoading(false);
        }
    }

    async function voteNo(id: number) {
        if (!address) return;
        try {
            setTxLoading(true);
            setError("");

            await voteProposal(id, false);
            await loadProposals();
        } catch (err) {
            console.error(err);
            setError("Vote transaction failed");
        } finally {
            setTxLoading(false);
        }
    }

    async function submitProposal(description: string) {
        if (!address) return;
        try {
            setTxLoading(true);
            setError("");

            await createProposal(description, 86400);
            await loadProposals();
        } catch (err) {
            console.error(err);
            setError("Proposal creation failed");
        } finally {
            setTxLoading(false);
        }
    }

    // This effect will run automatically when the application mounts AND
    // whenever the wallet successfully finishes connecting/switching networks!
    useEffect(() => {
        loadProposals();
    }, [loadProposals]);

    return {
        proposals,
        loading,
        txLoading,
        error,
        refresh: loadProposals,
        voteYes,
        voteNo,
        submitProposal,
    };
}