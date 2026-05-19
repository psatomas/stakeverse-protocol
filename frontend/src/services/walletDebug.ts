// frontend/src/services/walletDebug.ts

export function logWalletDebug(label: string, data?: any) {
  const time = new Date().toISOString();
  console.log(`[WALLET DEBUG ${time}] ${label}`, data ?? "");
}