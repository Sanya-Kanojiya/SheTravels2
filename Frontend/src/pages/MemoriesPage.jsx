import { Camera, MapPin } from "lucide-react";
import Card from "../components/Card";
import { memories } from "../data/mock";

export default function MemoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Memories</p>
        <h1 className="font-display text-4xl text-forest">Places that stayed with you</h1>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {memories.map((m, i) => (
          <Card key={m.id} className="overflow-hidden p-0">
            <div
              className={`flex h-40 items-center justify-center ${
                i % 3 === 0 ? "bg-sage" : i % 3 === 1 ? "bg-peach" : "bg-lilac"
              }`}
            >
              <Camera className="h-8 w-8 text-forest/50" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{m.date}</p>
              <h2 className="mt-1 font-display text-2xl text-forest">{m.destination}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{m.note}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {m.places.map((place) => (
                  <span key={place} className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-xs text-forest">
                    <MapPin className="h-3 w-3" />
                    {place}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted">{m.photos} photo placeholders</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
