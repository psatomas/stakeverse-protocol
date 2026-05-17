type Props = {
  price: string;
  loading: boolean;
};

export function OracleCard({
  price,
  loading,
}: Props) {
  return (
    <div className="rounded-2xl border p-6">
      <h2 className="text-xl font-semibold">
        ETH / USD Oracle
      </h2>

      <p className="mt-4 text-3xl font-bold">
        {loading ? "Loading..." : `$${price}`}
      </p>

      <p className="mt-2 text-sm text-zinc-500">
        Chainlink Sepolia Feed
      </p>
    </div>
  );
}