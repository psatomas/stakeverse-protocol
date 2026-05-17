import { Contract } from "ethers";

import DAO_ARTIFACT from "./abis/StakeVerseDAO.json";

import { getSigner } from "../services/web3";

const DAO_ADDRESS = import.meta.env.VITE_DAO_ADDRESS;

export interface Proposal {
  id: number;
  description: string;
  yesVotes: number;
  noVotes: number;
  deadline: number;
  executed: boolean;
}

export async function getDAOContract() {
  return new Contract(
    DAO_ADDRESS,
    DAO_ARTIFACT.abi,
    await getSigner()
  );
}

export async function getProposal(
  proposalId: number
): Promise<Proposal> {
  const contract = await getDAOContract();

  const proposal = await contract.proposals(proposalId);

  return {
    id: Number(proposal.id),
    description: proposal.description,
    yesVotes: Number(proposal.yesVotes),
    noVotes: Number(proposal.noVotes),
    deadline: Number(proposal.deadline),
    executed: proposal.executed,
  };
}

export async function getAllProposals(): Promise<Proposal[]> {
  const contract = await getDAOContract();

  const proposalCount = Number(
    await contract.proposalCount()
  );

  const proposals: Proposal[] = [];

  for (let i = 1; i <= proposalCount; i++) {
    const proposal = await getProposal(i);

    proposals.push(proposal);
  }

  return proposals.reverse();
}

export async function voteProposal(
  proposalId: number,
  support: boolean
) {
  const contract = await getDAOContract();

  const tx = await contract.vote(
    proposalId,
    support
  );

  await tx.wait();
}

export async function createProposal(
  description: string,
  durationInSeconds: number
) {
  const contract = await getDAOContract();

  const tx = await contract.createProposal(
    description,
    durationInSeconds
  );

  await tx.wait();
}