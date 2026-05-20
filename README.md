# StakeVerse Protocol — MVP

🌐 **Select Language / Selecione o Idioma:**
*   [English Version (# English)](#-english)
*   [Versão em Português (# Português)](#-português)

---

# 🇺🇸 English

## 📌 About the Project
The **StakeVerse Protocol** is a decentralized, modular Web3 ecosystem developed as an MVP for the *Complete Web3 Protocol Development with Testnet Deployment* course (Advanced Phase — Unit 1 | Chapter 5).

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

### Justification of ERC Token Standards
*   **ERC-20 (`StakeVerseToken.sol`):** Chosen for the core utility and governance token due to its universal compatibility with decentralized exchanges (DEXs), AMMs, automated liquidity protocols, and market wallets (e.g., MetaMask). It allows precise fractional math required for staking rewards and voting weight distribution.
*   **ERC-721 (`StakeVerseNFT.sol`):** Chosen for the membership mechanism. Since membership profiles can hold unique metadata and governance identity traits in future expansions, a non-fungible token functions perfectly as the ecosystem's cryptographic access badge.

---

## 📂 Repository Structure

```
.
├── audit/                  # Automated audit reports (Slither/Mythril)
├── contracts/              # Smart Contract source code (Solidity)
│   ├── MockV3Aggregator.sol     # Mock contract for local testing environment
│   ├── PriceOracleConsumer.sol
│   ├── StakeVerseDAO.sol
│   ├── StakeVerseNFT.sol
│   ├── StakeVerseStaking.sol
│   └── StakeVerseToken.sol
├── deployment/             # Testnet deployment artifacts and addresses
│   └── sepolia.json
├── docs/                   # Architecture documentation and diagrams
│   └── diagrams/
├── frontend/               # Web Application (React + TypeScript + Vite + Tailwind)
│   ├── src/
│   │   ├── components/     # UI Components (Cards, Modals)
│   │   ├── hooks/          # useWallet.ts and useDashboard.ts
│   │   ├── services/       # Web3 provider abstraction (ethers.js v6)
│   │   └── types/          # TypeScript typings for smart contracts
├── scripts/                # Compilation and deployment scripts (Hardhat v3)
│   └── deploy.ts
└── test/                   # Local unit tests (Mocha/Chai)
    ├── dao.test.ts
    └── staking.test.ts
```

---

## 🧪 Testing Suite & Code Coverage

The core modules of the protocol are validated by a unit testing suite built using **Hardhat v3**, **Mocha**, and **Chai**.

*   **Environment Configuration:** Tailored for Hardhat v3 compilation, implementing isolated network context routines via `hre.network.create()` to isolate blockchain provider state across execution loops.
*   **EVM Time Simulation:** The governance test suite (`dao.test.ts`) simulates live voting lifetimes by triggering low-level client JSON-RPC commands: `evm_increaseTime` to advance the Unix timestamp past deadlines, and `evm_mine` to forge a new block, ensuring execution rules are enforced correctly.

### 📊 Automated Code Coverage Report
The testing infrastructure has achieved a flawless **100% Code Coverage** across all files, functions, lines, and statement branches, guaranteeing that no logical or edge-case path goes unvalidated.

```text
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

---

## ⛓️ Testing Strategy & Oracle Mocking

### 🇺🇸 Oracle Mocking Mechanism (Local Environment)
To run unit tests locally without external dependencies or internet connection to the Sepolia network, we implemented a **Mocking** pattern:
*   **Contract Used:** `MockV3Aggregator.sol` (located under `contracts/`).
*   **How it Works:** During local development network deployments (`hardhat`), the script detects the environment and deploys this Mock contract instead of pointing to a live Chainlink registry address, perfectly mimicking Chainlink's `AggregatorV3Interface`.
*   **Objective:** This allows the test suite to artificially manipulate asset prices (via the `updateAnswer` function), verifying how the protocol handles market volatility in a 100% isolated, local, and offline manner.

---

## 🔒 Security and Smart Contract Auditing

The protocol was secured following smart contract development best practices, OWASP Web3 guidelines, and checked using formal symbolic execution and static analysis.

### 🛡️ Mythril Security Report (Symbolic Execution)
Deep Scan Symbolic Execution completed successfully with clean results:
*   **Integer Underflow/Overflow:** PASS (Solidity 0.8.x native checked arithmetic).
*   **Reentrancy/State Changes:** PASS (Protected by OpenZeppelin's `ReentrancyGuard` on `withdraw` and `claimRewards` functions, strictly following the *Checks-Effects-Interactions* pattern).
*   **Environmental Dependence:** PASS (No risky environment dependencies detected).

### 🔍 Slither Analysis (Static Analysis)
*   **Critical / High Issues:** 0 Found
*   **Medium Issues:** 1 Found (Centralization Risk / `pwnable-ownership`)
    *   *Mitigation:* This structure is intentional for the MVP stage. Contract ownership will be transferred completely to the `StakeVerseDAO` contract upon full production deployment to decentralize operational control.

---

## 🛠️ Tech Stack

*   **Smart Contracts:** Solidity ^0.8.x, Hardhat v3, OpenZeppelin libraries, Chainlink Data Feeds.
*   **Frontend:** React, TypeScript, Vite, Tailwind CSS, Ethers.js (v6).
*   **Testing & Auditing:** Mocha, Chai, Slither, Mythril.

---

## 🚀 Local Installation and Execution

### Prerequisites
*   Node.js (v18+ recommended)
*   MetaMask wallet configured for the Sepolia test network

### 1. Environment Setup (Hardhat)
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
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment & Deliverables (Sepolia Testnet)

The contracts were successfully deployed to the **Ethereum Sepolia Network (Chain ID: 11155111)**. Generated on-chain artifacts and addresses are mapped and stored in `/deployment/sepolia.json`.

*   **StakeVerseToken (ERC-20):** `0x1695059AE16EA39f66978a63e5199E8BBa7e76C1`
*   **StakeVerseNFT (ERC-721):** `0x499530539E80b26A573c6C5c0583e4067dcCd836`
*   **StakeVerseStaking:** `0xbAd2743efbA270CCB844015C28213932D9e36E33`
*   **StakeVerseDAO:** `0xE500041A14Bbea0a1aD7AC36b59f99BdAfC80E55`
*   **PriceOracleConsumer:** `0x0985528C81c29cb268dE13AB7D2eFAb88DCd4A02`

⚠️ **Environment Security Note:** During the deployment pipeline execution, any local credentials risk was mitigated by rotating the environment variables and enforcing strict infrastructure RPC provider access bounds, ensuring the integrity and isolation of this academic project.

### 🔗 Project Links
*   **Block Explorer Link (Etherscan):** [https://sepolia.etherscan.io/address/0x1695059AE16EA39f66978a63e5199E8BBa7e76C1](https://sepolia.etherscan.io/)
*   **GitHub Repository:** *(Insert your GitHub repository link here)*
*   **Video Demonstration (5-10 min):** *(Insert your video submission link here)*

---

# 🇧🇷 Português

## 📌 Sobre o Projeto
O **StakeVerse Protocol** é um ecossistema Web3 descentralizado e modular desenvolvido como MVP para a disciplina de *Desenvolvimento de Protocolo Web3 Completo com Deploy em Testnet* (Fase 2 Avançada — Unidade 1 | Capítulo 5). 

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

### Justificativa dos Padrões ERC Escolhidos
*   **ERC-20 (`StakeVerseToken.sol`):** Utilizado para o token utilitário e de governança devido à sua compatibilidade universal com exchanges descentralizadas (DEXs), AMMs e carteiras do mercado (como MetaMask). Permite o fracionamento preciso para cálculo de recompensas de staking e distribuição do peso de votos.
*   **ERC-721 (`StakeVerseNFT.sol`):** Escolhido para o mecanismo de membership (participação). Como cada título de membro pode conter metadados e IDs únicos de governança em expansões futures, o padrão não-fungível atua perfeitamente como o "crachá de acesso" criptográfico do ecossistema.

---

## 📂 Estrutura do Repositório

```
.
├── audit/                  # Relatórios de auditoria automatizada (Slither/Mythril)
├── contracts/              # Código-fonte dos Contratos Inteligentes (Solidity)
│   ├── MockV3Aggregator.sol     # Contrato Mock para simulação local do Oráculo
│   ├── PriceOracleConsumer.sol
│   ├── StakeVerseDAO.sol
│   ├── StakeVerseNFT.sol
│   ├── StakeVerseStaking.sol
│   └── StakeVerseToken.sol
├── deployment/             # Artefatos e endereços do deploy em testnet
│   └── sepolia.json
├── docs/                   # Diagramas e documentação de arquitetura
│   └── diagrams/
├── frontend/               # Aplicação Web (React + TypeScript + Vite + Tailwind)
│   ├── src/
│   │   ├── components/     # Componentes visuais isolados (Cards, Modais)
│   │   ├── hooks/          # Hooks customizados (useWallet, useDashboard)
│   │   ├── services/       # Abstração do provedor Web3 via ethers.js v6
│   │   └── types/          # Tipagens TypeScript para os contratos
├── scripts/                # Scripts de compilação e deploy (Hardhat v3)
│   └── deploy.ts
└── test/                   # Testes unitários locais (Mocha/Chai)
    ├── dao.test.ts
    └── staking.test.ts
```

---

## 🧪 Suíte de Testes & Cobertura de Código

Os módulos principais do protocolo são validados por uma suíte completa de testes unitários desenvolvida em **Hardhat v3**, **Mocha** e **Chai**.

*   **Configuração de Ambiente:** Adaptado para as regras de compilação do Hardhat v3, implementando rotinas isoladas de contexto de rede via `hre.network.create()` para segregar o estado do provider blockchain a cada loop de execução.
*   **Simulação de Passagem de Tempo na EVM:** A suíte de testes de governança (`dao.test.ts`) simula os prazos de vigência das propostas enviando comandos JSON-RPC de baixo nível ao cliente local: `evm_increaseTime` para avançar o relógio Unix e `evm_mine` para forçar a criação de um bloco subsequente, garantindo o teste preciso das regras de expiração.

### 📊 Relatório Automatizado de Cobertura (Code Coverage)
A infraestrutura de testes atingiu a marca histórica de **100% de Cobertura de Código** em todas as funções, declarações, linhas e ramificações de arquivos, assegurando que nenhuma regra de negócio ou fluxo de exceção ficasse desprotegido.

```text
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

---

## ⛓️ Estratégia de Testes Local vs. Testnet (Oráculos)

### 🇧🇷 Mecanismo de Mocking para Oráculo (Ambiente Local)
Para que os testes unitários funcionem localmente via Hardhat sem depender de conexões externas ou internet ativa com a rede Sepolia, implementamos o padrão de **Mocking**:
*   **Contrato Utilizado:** `MockV3Aggregator.sol` (localizado diretamente na pasta `contracts/`).
*   **Como Funciona:** Durante o deploy em ambiente de desenvolvimento local (`hardhat`), o script de automação detecta a rede e implanta este contrato Mock ao invés de apontar para o agregador real da rede pública, emulando perfeitamente a interface `AggregatorV3Interface` da Chainlink.
*   **Objetivo:** Isso permite que a suíte de testes manipule o preço do ativo artificialmente (via função `updateAnswer`), testando como o protocolo reage a flutuações severas de mercado de forma 100% isolada, determinística e offline.

---

## 🔒 Segurança e Relatório de Auditoria (Smart Contracts)

O protocolo foi blindado seguindo os padrões de desenvolvimento seguro, diretrizes do OWASP Web3 e verificado via execução simbólica e análise estática avançada.

### 🛡️ Relatório de Segurança Mythril (Execução Simbólica)
A análise profunda de execução simbólica foi finalizada com sucesso e obteve parâmetros limpos:
*   **Integer Underflow/Overflow:** PASS (Proteção nativa via verificação aritmética do Solidity 0.8.x).
*   **Reentrancy/Alteração de Estado:** PASS (Proteção via modificadores `ReentrancyGuard` da OpenZeppelin nas funções de saque e resgate de recompensas, em total conformidade com o padrão *Checks-Effects-Interactions*).
*   **Dependência Ambiental:** PASS (Nenhuma dependência vulnerável de variáveis previsíveis de bloco detectada).

### 🔍 Análise de Vulnerabilidades Slither (Análise Estática)
*   **Problemas Críticos / Altos:** 0 Encontrados
*   **Problemas Médios:** 1 Encontrado (Centralization Risk / `pwnable-ownership`)
    *   *Mitigação:* Estrutura intencional para a fase de MVP. A administração (ownership) dos contratos será transferida inteiramente para o endereço do `StakeVerseDAO` no deploy definitivo em produção, descentralizando as permissões operacionais.

---

## 🛠️ Tecnologias Utilizadas

*   **Smart Contracts:** Solidity ^0.8.x, Hardhat v3, OpenZeppelin, Chainlink Data Feeds.
*   **Frontend:** React, TypeScript, Vite, Tailwind CSS, Ethers.js (v6).
*   **Testes & Auditoria:** Mocha, Chai, Slither, Mythril.

---

## 🚀 Instalação e Execução Local

### Pré-requisitos
*   Node.js (v18+ recommended)
*   Carteira MetaMask configurada para a rede Sepolia

### 1. Configuração do Ambiente (Hardhat)
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
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Detalhes do Deploy e Entregáveis (Sepolia Testnet)

Os contratos foram implantados com sucesso na rede **Ethereum Sepolia (Chain ID: 11155111)**. Os artefatos e endereços on-chain gerados foram mapeados e persistidos no arquivo `/deployment/sepolia.json`.

*   **StakeVerseToken (ERC-20):** `0x1695059AE16EA39f66978a63e5199E8BBa7e76C1`
*   **StakeVerseNFT (ERC-721):** `0x499530539E80b26A573c6C5c0583e4067dcCd836`
*   **StakeVerseStaking:** `0xbAd2743efbA270CCB844015C28213932D9e36E33`
*   **StakeVerseDAO:** `0xE500041A14Bbea0a1aD7AC36b59f99BdAfC80E55`
*   **PriceOracleConsumer:** `0x0985528C81c29cb268dE13AB7D2eFAb88DCd4A02`

⚠️ **Nota de Segurança do Ambiente:** Durante a execução do pipeline de deploy, mitigou-se qualquer exposição local de credenciais rotacionando imediatamente as variáveis de ambiente e aplicando restrições de provedor nas chamadas de infraestrutura RPC, garantindo a integridade e o total isolamento do projeto acadêmico.git s