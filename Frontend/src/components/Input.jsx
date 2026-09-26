export default function Input({ label, hint, icon: Icon, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      {label ? (
        <span className="mb-2 block text-sm font-semibold text-forest">{label}</span>
      ) : null}
      <span className="relative block">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        ) : null}
        <input
          className={`w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/80 focus:border-forest/30 focus:ring-4 focus:ring-sage ${
            Icon ? "pl-11" : ""
          }`}
          {...props}
        />
      </span>
      {hint ? <span className="mt-1.5 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}
