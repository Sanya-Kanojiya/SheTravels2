import { useState } from "react";
import Card from "../components/Card";
import { packingLists } from "../data/mock";

export default function PackingPage() {
  const [data, setData] = useState(packingLists);

  const toggle = (catId, itemId) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === catId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, packed: !item.packed } : item,
              ),
            }
          : cat,
      ),
    }));
  };

  const packed = data.categories.flatMap((c) => c.items).filter((i) => i.packed).length;
  const total = data.categories.flatMap((c) => c.items).length;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">AI packing checklist</p>
        <h1 className="font-display text-4xl text-forest">What goes in the bag</h1>
        <p className="mt-2 text-muted">
          {data.destination} · {data.duration} · {packed}/{total} packed
        </p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-cream-deep">
        <div className="h-full rounded-full bg-coral" style={{ width: `${(packed / total) * 100}%` }} />
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data.categories.map((cat) => (
          <Card key={cat.id} className="p-5">
            <h2 className="font-display text-2xl text-forest">{cat.name}</h2>
            <ul className="mt-4 space-y-2">
              {cat.items.map((item) => (
                <li key={item.id}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 hover:bg-cream">
                    <input
                      type="checkbox"
                      checked={item.packed}
                      onChange={() => toggle(cat.id, item.id)}
                      className="accent-coral h-4 w-4"
                    />
                    <span className={item.packed ? "text-muted line-through" : "text-forest"}>{item.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
