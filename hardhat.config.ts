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
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.SEPOLIA_PRIVATE_KEY ? [process.env.SEPOLIA_PRIVATE_KEY] : [],
    },
  },

  // O plugin moderno espera o objeto nomeado como "sourcify" ou "etherscan" dentro de uma chave de configuração estendida.
  // Para evitar problemas com o 'as any', mantemos a estrutura padrão que o plugin consome:
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
  // Dica extra: Se quiser habilitar o Sourcify (que o Etherscan também usa para checar código aberto)
  sourcify: {
    enabled: true
  }
} as any);