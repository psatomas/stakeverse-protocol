import { Contract } from "ethers";

import DAO_ARTIFACT from "./abis/StakeVerseDAO.json";

import { getSigner } from "../services/web3";

const DAO_ADDRESS = import.meta.env.VITE_DAO_ADDRESS;

export async function getDAOContract() {
  const signer = await getSigner();

  return new Contract(
    DAO_ADDRESS,
    DAO_ARTIFACT.abi,
    signer
  );
}