type Props = {
  address?: string;
  connect: () => void;
};

export default function Navbar({
  address,
  connect,
}: Props) {
  return (
    <header className="relative z-10 border-b border-zinc-800 backdrop-blur-xl bg-zinc-950/70">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            StakeVerse Protocol
          </h1>

          <p className="text-sm text-zinc-400 mt-1">
            Decentralized Staking & Governance Infrastructure
          </p>
        </div>

        {address ? (
          /* CONNECTED STATE DISPLAY: Replaces the button to avoid double-triggering actions */
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-5 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-sm font-medium text-emerald-400">
              {`${address.slice(0, 6)}...${address.slice(-4)}`}
            </span>
          </div>
        ) : (
          /* DISCONNECTED STATE DISPLAY: Click handles connection safely */
          <button
            onClick={connect}
            type="button"
            className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-400 hover:bg-indigo-500/20 active:scale-95 transition"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}