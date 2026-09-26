export default function StatCard({ label, value, hint, icon: Icon, tone = "sage" }) {
  const tones = {
    sage: "bg-sage",
    peach: "bg-peach",
    lilac: "bg-lilac",
    coral: "bg-coral/15",
  };

  return (
    <div className="rounded-[24px] border border-white bg-card p-5 shadow-[0_10px_30px_rgba(36,49,43,0.05)]">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
        {Icon ? (
          <span className={`rounded-2xl p-2 ${tones[tone]}`}>
            <Icon className="h-4 w-4 text-forest" />
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-display text-3xl text-forest">{value}</p>
      {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
    </div>
  );
}
