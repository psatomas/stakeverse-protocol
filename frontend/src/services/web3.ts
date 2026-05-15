import { ethers } from "ethers";

export async function getProvider() {
  if (!window.ethereum) throw new Error("No wallet found");

  await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner(
  provider: ethers.BrowserProvider
) {
  return await provider.getSigner();
}