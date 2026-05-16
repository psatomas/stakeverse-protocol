import { BrowserProvider } from "ethers";

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  await window.ethereum.request({
    method: "eth_requestAccounts",
  });
}

export function getProvider() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  return new BrowserProvider(window.ethereum);
}

export async function getSigner() {
  const provider = getProvider();
  return await provider.getSigner();
}

export async function validateNetwork() {
  const provider = getProvider();

  const network = await provider.getNetwork();

  if (network.chainId !== 11155111n) {
    throw new Error("Please connect to Sepolia");
  }
}

export async function getCurrentAddress() {
  const signer = await getSigner();
  return await signer.getAddress();
}