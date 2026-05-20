import * as dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "hardhat/config";
import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import "@nomicfoundation/hardhat-verify"; 

export default defineConfig({
  plugins: [
    hardhatToolboxMochaEthersPlugin,
  ],

  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    hardhat: {
      type: "edr-simulated",
      chainType: "l1",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      // Lendo diretamente as variáveis de ambiente carregadas pelo dotenv
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.SEPOLIA_PRIVATE_KEY ? [process.env.SEPOLIA_PRIVATE_KEY] : [],
    },
  },

  // Configuração para verificação automatizada no Etherscan
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
} as any);