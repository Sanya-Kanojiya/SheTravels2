import { useState } from "react";
import { Sparkles } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import ItineraryCard from "../components/ItineraryCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { mockGeneratedItinerary } from "../data/mock";

export default function AiPlannerPage() {
  const [form, setForm] = useState({ destination: "Lisbon", budget: "98000", duration: "5", interests: "Viewpoints, cafes, trams" });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const generate = (e) => {
    e.preventDefault();
    setLoading(true);
    setPlan(null);
    setTimeout(() => {
      setPlan(mockGeneratedItinerary(form.destination, form.duration));
      setLoading(false);
    }, 1200);
  };

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="h-fit bg-forest p-6 text-cream">
        <p className="text-xs uppercase tracking-[0.18em] text-peach">AI trip planner</p>
        <h1 className="mt-2 font-display text-4xl">Ask for a calmer route</h1>
        <p className="mt-3 text-sm text-cream/75">
          Mock generation only — no live model. The pause you see is a loading state for the demo.
        </p>
        <form className="mt-6 space-y-4" onSubmit={generate}>
          <label className="block text-sm">
            Destination
            <input
              className="mt-2 w-full rounded-2xl border-0 bg-white/10 px-4 py-3 text-sm text-white outline-none"
              value={form.destination}
              onChange={set("destination")}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm">
              Budget
              <input
                className="mt-2 w-full rounded-2xl border-0 bg-white/10 px-4 py-3 text-sm text-white outline-none"
                value={form.budget}
                onChange={set("budget")}
              />
            </label>
            <label className="block text-sm">
              Duration (days)
              <input
                className="mt-2 w-full rounded-2xl border-0 bg-white/10 px-4 py-3 text-sm text-white outline-none"
                value={form.duration}
                onChange={set("duration")}
              />
            </label>
          </div>
          <Input label="Interests" className="text-forest" value={form.interests} onChange={set("interests")} />
          <Button type="submit" className="w-full" disabled={loading}>
            <Sparkles className="h-4 w-4" /> Generate itinerary
          </Button>
        </form>
      </Card>

      <div>
        {loading ? <LoadingSkeleton rows={4} /> : null}
        {!loading && !plan ? (
          <Card className="flex min-h-[320px] items-center justify-center p-8 text-center">
            <div>
              <Sparkles className="mx-auto h-8 w-8 text-coral" />
              <h2 className="mt-3 font-display text-2xl text-forest">Waiting for a prompt</h2>
              <p className="mt-2 text-sm text-muted">Fill the left panel and generate a sample plan.</p>
            </div>
          </Card>
        ) : null}
        {plan ? (
          <Card className="space-y-4 p-6">
            <h2 className="font-display text-3xl text-forest">{plan.destination}</h2>
            <p className="text-sm text-muted">{plan.summary}</p>
            {plan.days.map((day) => (
              <ItineraryCard key={day.day} day={day} />
            ))}
            <div className="rounded-2xl bg-sage p-4 text-sm text-forest">
              {plan.safety.map((tip) => (
                <p key={tip}>• {tip}</p>
              ))}
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
