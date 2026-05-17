import { useState } from "react";

import {
  connectWallet,
  getCurrentAddress,
  validateNetwork,
} from "../services/web3";

export function useWallet() {
  const [address, setAddress] =
    useState("");

  async function connect() {
    await connectWallet();

    await validateNetwork();

    const currentAddress =
      await getCurrentAddress();

    setAddress(currentAddress);
  }

  return {
    address,
    connect,
  };
}