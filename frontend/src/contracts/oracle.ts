import {
  BrowserProvider,
  Contract,
  JsonRpcSigner,
} from "ethers";

import oracleArtifact from "./abis/PriceOracleConsumer.json";

type ContractRunner =
  | BrowserProvider
  | JsonRpcSigner;

export function getOracleContract(
  address: string,
  runner: ContractRunner
) {
  return new Contract(
    address,
    oracleArtifact.abi,
    runner
  );
}