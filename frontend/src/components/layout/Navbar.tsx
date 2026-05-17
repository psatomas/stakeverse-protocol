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
          <h1 className="text-2xl font-bold tracking-tight">
            StakeVerse Protocol
          </h1>

          <p className="text-sm text-zinc-400 mt-1">
            Decentralized Staking &
            Governance Infrastructure
          </p>
        </div>

        <button
          onClick={connect}
          className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm font-medium"
        >
          {address
            ? `${address.slice(
                0,
                6
              )}...${address.slice(-4)}`
            : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
}