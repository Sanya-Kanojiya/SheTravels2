export default function LoadingSkeleton({ rows = 3, className = "" }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-cream-deep/80 p-4">
          <div className="mb-3 h-4 w-2/5 rounded-full bg-line" />
          <div className="h-3 w-full rounded-full bg-line/80" />
          <div className="mt-2 h-3 w-4/5 rounded-full bg-line/70" />
        </div>
      ))}
    </div>
  );
}
