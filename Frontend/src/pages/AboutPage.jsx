import Card from "../components/Card";

export default function AboutPage() {
  return (
    <div className="bg-cream px-5 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">About</p>
        <h1 className="mt-3 font-display text-5xl text-forest">A companion, not a dare.</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          SheTravels AI is a college mini-project: an AI safety and travel companion for solo women.
          This build is frontend-only. It shows how planning, packing, community, and safety tools
          can live in one calm interface.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { t: "Mission", d: "Make solo travel feel prepared — itineraries that leave room to rest, and safety habits that are easy to keep." },
            { t: "Who it’s for", d: "Students and first-time solo travellers who want structure without a loud, crowded travel app." },
            { t: "What’s mock", d: "Login, AI generation, SOS, and tracking are simulated. No backend, no real emergency calls." },
          ].map((item) => (
            <Card key={item.t} className="p-5">
              <h2 className="font-display text-2xl text-forest">{item.t}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{item.d}</p>
            </Card>
          ))}
        </div>
        <h2 className="mt-12 font-display text-3xl text-forest">Main benefits</h2>
        <ul className="mt-4 space-y-3 text-muted">
          <li>One place for trips, packing, contacts, and memories.</li>
          <li>AI planner UI with loading states — ready to connect later.</li>
          <li>Community feed with report actions for a simple moderation story.</li>
        </ul>
      </div>
    </div>
  );
}
