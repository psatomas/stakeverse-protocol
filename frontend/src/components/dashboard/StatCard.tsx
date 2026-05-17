type Props = {
  title: string;
  value: string;
  subtitle: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
      <p className="text-sm text-zinc-400 mb-3">
        {title}
      </p>

      <h3 className="text-3xl font-bold mb-2">
        {value}
      </h3>

      <p className="text-sm text-zinc-500">
        {subtitle}
      </p>
    </div>
  );
}