import { useEffect, useState } from "react";
import type { Proposal } from "../contracts/dao";

import {
    getAllProposals,
    voteProposal,
    createProposal,
} from "../contracts/dao";

export function useGovernance() {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(false);
    const [txLoading, setTxLoading] = useState(false);
    const [error, setError] = useState("");

    async function loadProposals() {
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
    }

    async function voteYes(id: number) {
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

    async function submitProposal(
        description: string
    ) {
        try {
            setTxLoading(true);
            setError("");

            await createProposal(
                description,
                86400
            );

            await loadProposals();
        } catch (err) {
            console.error(err);

            setError("Proposal creation failed");
        } finally {
            setTxLoading(false);
        }
    }

    useEffect(() => {
        loadProposals();
    }, []);

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