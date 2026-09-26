import { Link } from "react-router-dom";
import {
  Camera,
  Check,
  Compass,
  Globe,
  Luggage,
  MapPin,
  Plane,
  Shield,
  Sparkles,
} from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import SafetyCard from "../components/SafetyCard";

const features = [
  {
    title: "AI trip planner",
    body: "Turn a destination and budget into a paced, daylight-first itinerary.",
    icon: Sparkles,
    tone: "lilac",
  },
  {
    title: "Safety center",
    body: "Check-ins, SOS demo, and habits that keep you reachable without noise.",
    icon: Shield,
    tone: "peach",
  },
  {
    title: "Community notes",
    body: "Stay tips from other women travellers — the kind you’d actually use.",
    icon: Globe,
    tone: "sage",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden px-5 pb-16 pt-10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest/60">
              A steadier way to go
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] text-forest sm:text-6xl lg:text-7xl">
              Plan well.
              <span className="mt-2 block text-coral">Go freely.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-forest/75">
              Practical guidance for planning safer solo travel — from your first route idea to a
              confident arrival.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register">
                <Button>
                  Start planning <Sparkles className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost">How SheTravels works</Button>
              </Link>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-forest/70">
              <Check className="h-4 w-4 text-coral" /> Thoughtful tools for independent travellers.
            </p>
          </div>

          <Card className="relative overflow-hidden bg-sage/40 p-6">
            <div className="absolute right-4 top-4 rounded-[20px] bg-peach p-3 shadow-sm">
              <Plane className="h-5 w-5 text-forest" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest/60">
              Route overview
            </p>
            <svg viewBox="0 0 360 180" className="mt-6 h-44 w-full text-coral">
              <line x1="20" y1="40" x2="340" y2="40" stroke="rgba(27,58,47,0.12)" />
              <line x1="20" y1="90" x2="340" y2="90" stroke="rgba(27,58,47,0.12)" />
              <line x1="20" y1="140" x2="340" y2="140" stroke="rgba(27,58,47,0.12)" />
              <path
                d="M20 130 C 80 40, 140 150, 200 80 S 300 40, 340 70"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="7 9"
                strokeLinecap="round"
              />
              <circle cx="40" cy="118" r="7" fill="#fff" stroke="#1b3a2f" strokeWidth="2" />
              <circle cx="200" cy="80" r="7" fill="#1b3a2f" />
              <circle cx="320" cy="62" r="7" fill="#fff" stroke="#e06a55" strokeWidth="2" />
            </svg>
            <p className="mt-2 text-sm text-forest/70">From first plan to safe arrival</p>
            <div className="pointer-events-none absolute -left-3 bottom-8 rounded-[20px] bg-white p-3 shadow-md">
              <Luggage className="h-5 w-5 text-forest" />
            </div>
            <div className="pointer-events-none absolute bottom-10 right-6 rounded-[20px] bg-peach p-3 shadow-md">
              <Camera className="h-5 w-5 text-forest" />
            </div>
          </Card>
        </div>
      </section>

      <section className="bg-cream px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">The idea</p>
          <h2 className="mt-2 font-display text-4xl text-forest">Plan. Travel. Stay safe.</h2>
          <p className="mt-4 max-w-2xl text-muted">
            SheTravels AI is a companion for solo women who want beautiful trips without leaving
            safety as an afterthought. This demo is frontend-only, with mock itineraries and local
            interaction.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <SafetyCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl text-forest">How it works</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { n: "01", t: "Tell us the place", d: "Destination, dates, budget, and the pace you like." },
              { n: "02", t: "Get a calmer plan", d: "A mock AI itinerary with daylight-first days and buffer time." },
              { n: "03", t: "Travel with a net", d: "Contacts, packing, check-ins, and community notes in one place." },
            ].map((step) => (
              <Card key={step.n} className="p-6">
                <p className="text-xs font-bold tracking-[0.2em] text-coral">{step.n}</p>
                <h3 className="mt-3 font-display text-2xl text-forest">{step.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Safety</p>
            <h2 className="mt-2 font-display text-4xl text-forest">Designed to keep you reachable</h2>
            <p className="mt-4 text-muted">
              Large SOS is a demo modal only. Real trips still need your own judgement, local
              numbers, and people who know your plan.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-forest">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 text-coral" /> Daily check-in reminders
              </li>
              <li className="flex gap-2">
                <Shield className="h-4 w-4 text-coral" /> Emergency contacts on every trip
              </li>
              <li className="flex gap-2">
                <Compass className="h-4 w-4 text-coral" /> Tips written for first-night arrivals
              </li>
            </ul>
          </div>
          <Card className="bg-forest p-8 text-cream">
            <p className="text-xs uppercase tracking-[0.18em] text-peach">Member access</p>
            <h3 className="mt-3 font-display text-3xl">Keep plans, notes, and safety preferences close at hand.</h3>
            <Link to="/login" className="mt-6 inline-block">
              <Button>Continue to my trips</Button>
            </Link>
          </Card>
        </div>
      </section>

      <section className="px-5 py-16">
        <Card className="mx-auto max-w-6xl bg-peach/50 p-10 text-center">
          <h2 className="font-display text-4xl text-forest">Ready when you are.</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Create a demo account — any name and password works. Use an email with “admin” to open
            the simple admin desk.
          </p>
          <Link to="/register" className="mt-6 inline-block">
            <Button>Create your account</Button>
          </Link>
        </Card>
      </section>
    </>
  );
}
