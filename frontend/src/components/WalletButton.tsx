import { useState } from "react";

import {
  connectWallet,
  getCurrentAddress,
  validateNetwork,
} from "../services/web3";

export default function WalletButton() {
  const [address, setAddress] = useState("");

  async function handleConnect() {
    try {
      await connectWallet();

      await validateNetwork();

      const currentAddress =
        await getCurrentAddress();

      setAddress(currentAddress);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to connect wallet"
      );
    }
  }

  return (
    <button onClick={handleConnect}>
      {address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
}