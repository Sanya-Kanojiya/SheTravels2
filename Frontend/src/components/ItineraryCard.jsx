export default function ItineraryCard({ day }) {
  return (
    <div className="relative pl-8">
      <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-coral text-[11px] font-bold text-white">
        {day.day}
      </span>
      <div className="rounded-[22px] border border-line bg-white p-4">
        <h4 className="font-semibold text-forest">{day.title}</h4>
        <ul className="mt-2 space-y-1.5 text-sm text-muted">
          {day.items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
