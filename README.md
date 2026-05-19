# StakeVerse Protocol — MVP

🌐 **Select Language / Selecione o Idioma:**
*   [English Version (# English)](#-english)
*   [Versão em Português (# Português)](#-português)

---

# 🇺🇸 English

## 📌 About the Project
The **StakeVerse Protocol** is a decentralized, modular Web3 ecosystem developed as an MVP for the Complete Web3 Protocol Development with Testnet Deployment course (Advanced Phase — Unit 1 | Chapter 5).

The protocol addresses fragmentation and low participation in DAOs by mitigating opportunity costs through a circular and modular incentive ecosystem:
*   **Integrated Tokenomics:** Users utilize the native utility token to lock in staking contracts and generate cyclical yields.
*   **Exclusive Access (NFT Pass):** Staking and participation in governance layers require holding an exclusive NFT, which mitigates Sybil (impersonation) attacks and introduces programmed scarcity.
*   **Active Governance:** Voting power is directly proportional to the staked token balance, completing the platform's utility cycle.

The protocol's security was validated using static analysis tools (*Slither* and *Mythril*), and deployment was successfully executed on the **Ethereum Sepolia** test network.

---

## 🏗️ System Architecture

```
                       [ User / React Frontend ]
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│ StakeVerseToken  │       │  StakeVerseNFT   │       │ PriceOracleCons. │
│     (ERC-20)     │       │    (ERC-721)     │       │ (Chainlink Feed) │
└────────┬─────────┘       └────────┬─────────┘       └────────┬─────────┘
         │                          │                          │
         ▼                          ▼                          │
┌──────────────────┐       ┌──────────────────┐                │
│StakeVerseStaking │◄──────┤  StakeVerseDAO   │◄───────────────┘
│ (Fixed Rate/Time)│       │ (Voting/Actions) │ (Future Economic Extension)
└──────────────────┘       └──────────────────┘
```

### Smart Contracts (Solidity ^0.8.x)
*   **`StakeVerseToken.sol` (ERC-20):** Utility and governance token built on OpenZeppelin libraries to ensure universal compatibility with decentralized exchanges (DEXs) and wallets.
*   **`StakeVerseNFT.sol` (ERC-721):** Non-fungible token used for the membership mechanism, functioning as the ecosystem's "access badge."
*   **`StakeVerseStaking.sol`:** Custody contract that manages ERC-20 token deposits with a reward calculation rule indexed to elapsed time and a fixed yield rate. Features core functions: `stake()`, `withdraw()`, and `claimRewards()`.
*   **`StakeVerseDAO.sol`:** Simplified governance mechanism containing full logic for proposal creation, vote tallying (for/against) based on token balances, and automated on-chain execution.
*   **`PriceOracleConsumer.sol`:** Integration with **Chainlink's** decentralized data feed (ETH/USD pair) using the `latestRoundData()` method to prevent price manipulation from purely on-chain data.

---

## 📂 Repository Structure

```
.
├── audit/                  # Automated audit reports (Slither/Mythril)
├── contracts/              # Smart Contract source code (Solidity)
├── deployment/             # Testnet deployment artifacts and addresses
│   └── sepolia.json
├── docs/                   # Architecture documentation and diagrams
├── frontend/               # Web Application (React + TypeScript + Vite + Tailwind)
│   ├── src/
│   │   ├── components/     # UI Components (Cards, Modals, Wrappers)
│   │   ├── hooks/          # Custom hooks (useWallet, useDashboard)
│   │   ├── services/       # Web3 integration via Ethers.js v6
│   │   └── types/          # TypeScript typings for smart contracts
├── scripts/                # Compilation and deployment scripts (Hardhat v3)
└── test/                   # Local unit tests (Mocha/Chai)
```

---

## 🧪 Testing Suite & Code Coverage

The core modules of the protocol are covered by a comprehensive suite of unit tests built using **Hardhat v3**, **Mocha**, and **Chai**. The protocol has achieved a **100% Code Coverage** metric across all implementation criteria.

```
----------------------------|----------|----------|----------|----------|
File                        | % Stmts  | % Branch | % Funcs  | % Lines  |
----------------------------|----------|----------|----------|----------|
 contracts/                 |      100 |      100 |      100 |      100 |
  PriceOracleConsumer.sol   |      100 |      100 |      100 |      100 |
  StakeVerseDAO.sol         |      100 |      100 |      100 |      100 |
  StakeVerseNFT.sol         |      100 |      100 |      100 |      100 |
  StakeVerseStaking.sol     |      100 |      100 |      100 |      100 |
  StakeVerseToken.sol       |      100 |      100 |      100 |      100 |
----------------------------|----------|----------|----------|----------|
All files                   |      100 |      100 |      100 |      100 |
----------------------------|----------|----------|----------|----------|
```

### Hardhat v3 Adaptation & Local Oracles
*   **Environment Configuration:** The test suite was adapted for Hardhat v3 compatibility, implementing the new network context (`hre.network.create()`), updated Ethers provider initialization, and optimal Mocha runner configurations in `hardhat.config.ts`.
*   **Chainlink Local Forking/Mocking:** Since `PriceOracleConsumer` relies on an on-chain Chainlink `AggregatorV3`, a `MockV3Aggregator.sol` contract was developed for local testing. This mocks real price feed responses, validating oracle functionality in a sandbox environment without relying on the Sepolia network.

---

## 🔒 Security and Smart Contract Auditing

The protocol was secured following smart contract development best practices, OWASP Web3 guidelines, and checked using formal symbolic execution and static analysis.

### 🛡️ Mythril Security Report (Symbolic Execution)
Deep Scan Symbolic Execution (Max Depth: 22) completed successfully with clean results:
*   **Integer Underflow/Overflow:** PASS (Protected natively by Solidity 0.8.x checked arithmetic).
*   **Reentrancy/State Changes:** PASS (Protected by `nonReentrant` modifiers and strict adherence to the *Checks-Effects-Interactions* pattern).
*   **Environmental Dependence:** PASS (No risky or predictable environment variable dependencies detected).

### 🔍 Slither Analysis (Static Analysis)
*   **Critical Issues:** 0 Found
*   **High Issues:** 0 Found
*   **Medium Issues:** 1 Found (Centralization Risk / `pwnable-ownership`)
    *   *Details:* Contracts inherit OpenZeppelin's `Ownable`, granting administrative privileges over state variables.
    *   *Mitigation (Design Choice):* This architecture is intentional for the MVP stage on Sepolia. Upon full production deployment, contract ownership will be transferred completely to the `StakeVerseDAO` contract address, fully decentralizing system access control.

---

## 🛠️ Tech Stack

*   **Smart Contracts:** Solidity ^0.8.x, Hardhat v3, OpenZeppelin, Chainlink Oracles.
*   **Frontend:** React, TypeScript, Vite, Tailwind CSS, Ethers.js (v6).
*   **Testing & Auditing:** Mocha, Chai, Slither, Mythril.

---

## 🚀 Local Installation and Execution

### Prerequisites
*   Node.js (v18+ recommended)
*   MetaMask wallet configured for the Sepolia test network

### 1. Environment Setup (Hardhat)
In the root directory, install the dependencies and configure the environment variables:
```bash
npm install
cp .env.example .env
```
Configure the required keys inside your `.env` file:
```env
SEPOLIA_PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=your_rpc_endpoint_here
```

### 2. Compilation and Testing
```bash
npx hardhat compile
npx hardhat test
```

### 3. Frontend Execution
Navigate to the frontend folder, install its dependencies, and start the development server:
```bash
cd frontend
npm install
npm run dev
```
Open your browser at the local address provided (typically `http://localhost:5173`).

---

## 🌐 Deployment Details (Sepolia Testnet)

The contracts were successfully deployed to the **Ethereum Sepolia Network (Chain ID: 11155111)**. Generated on-chain artifacts and addresses are mapped and stored in `/deployment/sepolia.json`.

*   **StakeVerseToken (ERC-20):** `0x1695059AE16EA39f66978a63e5199E8BBa7e76C1`
*   **StakeVerseNFT (ERC-721):** `0x499530539E80b26A573c6C5c0583e4067dcCd836`
*   **StakeVerseStaking:** `0xbAd2743efbA270CCB844015C28213932D9e36E33`
*   **StakeVerseDAO:** `0xE500041A14Bbea0a1aD7AC36b59f99BdAfC80E55`
*   **PriceOracleConsumer:** `0x0985528C81c29cb268dE13AB7D2eFAb88DCd4A02`

---

# 🇧🇷 Português

## 📌 Sobre o Projeto
O **StakeVerse Protocol** é um ecossistema Web3 descentralizado e modular desenvolvido como MVP para a disciplina de Desenvolvimento de Protocolo Web3 Completo com Deploy em Testnet (Fase 2 Avançada — Unidade 1 | Capítulo 5). 

O protocolo resolve o problema da fragmentação e da baixa participação em DAOs ao mitigar o custo de oportunidade por meio de um ecossistema de incentivos circular e modular:
*   **Tokenomics Integrado:** Usuários utilizam o token utilitário nativo para travar em contratos de staking e gerar rendimento cíclico.
*   **Acesso Exclusivo (NFT Pass):** O staking e a participação na governança exigem a posse de um NFT exclusivo, mitigando ataques Sybil (personificação) e gerando escassez programada.
*   **Governança Ativa:** O poder de voto é proporcional ao saldo de tokens integrados, fechando o ciclo de utilidade da plataforma.

A segurança do protocolo foi validada por ferramentas de análise estática (*Slither* e *Mythril*) e o deploy foi realizado com sucesso na rede de testes **Ethereum Sepolia**.

---

## 🏗️ Arquitetura do Sistema

```
                       [ Usuário / Frontend React ]
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│ StakeVerseToken  │       │  StakeVerseNFT   │       │ PriceOracleCons. │
│     (ERC-20)     │       │    (ERC-721)     │       │ (Chainlink Feed) │
└────────┬─────────┘       └────────┬─────────┘       └────────┬─────────┘
         │                          │                          │
         ▼                          ▼                          │
┌──────────────────┐       ┌──────────────────┐                │
│StakeVerseStaking │◄──────┤  StakeVerseDAO   │◄───────────────┘
│ (Taxa Fixa/Tempo)│       │ (Votação/Ações)  │ (Futura Extensão Econômica)
└──────────────────┘       └──────────────────┘
```

### Contratos Inteligentes (Solidity ^0.8.x)
*   **`StakeVerseToken.sol` (ERC-20):** Token utilitário e de governança desenvolvido com as bibliotecas OpenZeppelin para garantir compatibilidade universal com exchanges descentralizadas (DEXs) e carteiras.
*   **`StakeVerseNFT.sol` (ERC-721):** Token não-fungível utilizado para o mecanismo de membership (participação), funcionando como o "crachá de acesso" do ecossistema.
*   **`StakeVerseStaking.sol`:** Contrato de custódia que gerencia depósitos de tokens ERC-20 com regra de cálculo de recompensas indexada ao tempo decorrido e taxa fixa. Possui as funções essenciais de `stake()`, `withdraw()` e `claimRewards()`.
*   **`StakeVerseDAO.sol`:** Mecanismo de governança simplificado contendo lógica para criação de propostas, computação de votos (for/against) baseado no saldo de tokens e execução automática on-chain.
*   **`PriceOracleConsumer.sol`:** Integração com o feed de dados descentralizado da **Chainlink** (par ETH/USD) através do método `latestRoundData()` para evitar manipulação de preços com dados puramente on-chain.

---

## 📂 Estrutura do Repositório

```
.
├── audit/                  # Relatórios de auditoria automatizada (Slither/Mythril)
├── contracts/              # Código-fonte dos Contratos Inteligentes (Solidity)
├── deployment/             # Artefatos e endereços do deploy em testnet
│   └── sepolia.json
├── docs/                   # Diagramas e documentação de arquitetura
├── frontend/               # Aplicação Web (React + TypeScript + Vite + Tailwind)
│   ├── src/
│   │   ├── components/     # Componentes de UI (Cards, Modais, Wrappers)
│   │   ├── hooks/          # Hooks customizados (useWallet, useDashboard)
│   │   ├── services/       # Integração Web3 via Ethers.js v6
│   │   └── types/          # Tipagens TypeScript para os contratos
├── scripts/                # Scripts de compilação e deploy (Hardhat v3)
└── test/                   # Testes unitários locais (Mocha/Chai)
```

---

## 🧪 Suíte de Testes & Cobertura de Código (Code Coverage)

Os módulos principais do protocolo são validados por uma suíte completa de testes unitários desenvolvida em **Hardhat v3**, **Mocha** e **Chai**. O protocolo atingiu a marca de **100% de Cobertura de Código** em todos os critérios de implementação.

```
----------------------------|----------|----------|----------|----------|
File                        | % Stmts  | % Branch | % Funcs  | % Lines  |
----------------------------|----------|----------|----------|----------|
 contracts/                 |      100 |      100 |      100 |      100 |
  PriceOracleConsumer.sol   |      100 |      100 |      100 |      100 |
  StakeVerseDAO.sol         |      100 |      100 |      100 |      100 |
  StakeVerseNFT.sol         |      100 |      100 |      100 |      100 |
  StakeVerseStaking.sol     |      100 |      100 |      100 |      100 |
  StakeVerseToken.sol       |      100 |      100 |      100 |      100 |
----------------------------|----------|----------|----------|----------|
All files                   |      100 |      100 |      100 |      100 |
----------------------------|----------|----------|----------|----------|
```

### Adaptação para Hardhat v3 e Uso de Mocks
*   **Configuração de Ambiente:** A arquitetura de testes foi adaptada para as exigências do Hardhat v3, incluindo o novo contexto de redes (`hre.network.create()`), ajustes na inicialização dos providers do Ethers e configurações otimizadas do Mocha no arquivo `hardhat.config.ts`.
*   **Simulação de Oráculo (Chainlink Mocking):** Para evitar a dependência direta da rede Sepolia durante os testes locais, foi implementado o contrato `MockV3Aggregator.sol`. Ele simula as respostas do feed de dados da Chainlink localmente, permitindo testar e alinhar o comportamento do contrato `PriceOracleConsumer` de forma isolada, determinística e sem custos de gas.

---

## 🔒 Segurança e Relatório de Auditoria (Smart Contracts)

O protocolo foi blindado seguindo os padrões de desenvolvimento seguro, diretrizes do OWASP Web3 e verificado via execução simbólica e análise estática avançada.

### 🛡️ Relatório de Segurança Mythril (Execução Simbólica)
A análise profunda de execução simbólica (Deep Scan Mode - Max Depth: 22) foi finalizada com sucesso e obteve parâmetros limpos:
*   **Integer Underflow/Overflow:** PASS (Proteção nativa via verificação aritmética do Solidity 0.8.x).
*   **Reentrancy/Alteração de Estado:** PASS (Proteção via modificadores `nonReentrant` e conformidade estrita com o padrão *Checks-Effects-Interactions*).
*   **Dependência Ambiental:** PASS (Nenhuma dependência vulnerável de variáveis previsíveis de bloco detectada).

### 🔍 Análise de Vulnerabilidades Slither (Análise Estática)
*   **Problemas Críticos/Altos:** 0 Encontrados
*   **Problemas Médios:** 1 Encontrado (Centralization Risk / `pwnable-ownership`)
    *   *Detalhes:* Os contratos herdam o padrão `Ownable` da OpenZeppelin, dando privilégios administrativos sobre variáveis de estado (como taxas de recompensa).
    *   *Mitigação (Decisão de Projeto):* Essa estrutura é proposital para a fase de MVP na rede Sepolia. Após o deploy final em produção, a propriedade de administração (ownership) será transferida inteiramente para o endereço do contrato `StakeVerseDAO`, descentralizando completamente o controle de acesso do ecossistema.

---

## 🛠️ Tecnologias Utilizadas

*   **Smart Contracts:** Solidity ^0.8.x, Hardhat v3, OpenZeppelin, Chainlink Oracles.
*   **Frontend:** React, TypeScript, Vite, Tailwind CSS, Ethers.js (v6).
*   **Testes & Auditoria:** Mocha, Chai, Slither, Mythril.

---

## 🚀 Instalação e Execução Local

### Pré-requisitos
*   Node.js (v18+ recomendado)
*   Carteira MetaMask configurada para a rede Sepolia

### 1. Configuração do Ambiente (Hardhat)
No diretório raiz, instale as dependências e configure as variáveis de ambiente:
```bash
npm install
cp .env.example .env
```
Configure as chaves necessárias no seu arquivo `.env`:
```env
SEPOLIA_PRIVATE_KEY=sua_chave_privada_aqui
SEPOLIA_RPC_URL=seu_endpoint_rpc_aqui
```

### 2. Compilação e Testes
```bash
npx hardhat compile
npx hardhat test
```

### 3. Execução do Frontend
Navegue até a pasta do frontend, instale as dependências e inicie o servidor de desenvolvimento:
```bash
cd frontend
npm install
npm run dev
```
Abra o navegador no endereço indicado (geralmente `http://localhost:5173`).

---

## 🌐 Detalhes do Deploy (Sepolia Testnet)

Os contratos foram implantados com sucesso na rede **Ethereum Sepolia (Chain ID: 11155111)**. Os artefatos e endereços on-chain gerados foram mapeados e persistidos no arquivo `/deployment/sepolia.json`.

*   **StakeVerseToken (ERC-20):** `0x1695059AE16EA39f66978a63e5199E8BBa7e76C1`
*   **StakeVerseNFT (ERC-721):** `0x499530539E80b26A573c6C5c0583e4067dcCd836`
*   **StakeVerseStaking:** `0xbAd2743efbA270CCB844015C28213932D9e36E33`
*   **StakeVerseDAO:** `0xE500041A14Bbea0a1aD7AC36b59f99BdAfC80E55`
*   **PriceOracleConsumer:** `0x0985528C81c29cb268dE13AB7D2eFAb88DCd4A02`