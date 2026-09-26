import { Link } from "react-router-dom";
import { Compass, Shield, Sparkles, Wallet } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import TripCard from "../components/TripCard";
import { activity, currentUser } from "../data/mock";
import { useApp } from "../context/AppContext";

export default function DashboardPage() {
  const { user, trips } = useApp();
  const upcoming = trips.find((t) => t.status === "Upcoming") || trips[0];
  const recent = trips.filter((t) => t.status === "Completed").slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Dashboard</p>
        <h1 className="mt-1 font-display text-4xl text-forest">
          Welcome back, {(user?.name || currentUser.name).split(" ")[0]}.
        </h1>
        <p className="mt-2 text-muted">Your next stretch of road is already sketched in.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="bg-sage p-6 lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest/60">Upcoming trip</p>
          <h2 className="mt-2 font-display text-3xl text-forest">{upcoming.destination}</h2>
          <p className="mt-2 text-sm text-forest/70">
            {upcoming.startDate} → {upcoming.endDate} · ₹{upcoming.budget.toLocaleString("en-IN")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={`/trips/${upcoming.id}`}>
              <Button>Open itinerary</Button>
            </Link>
            <Link to="/safety">
              <Button variant="ghost">Safety check-in</Button>
            </Link>
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Safety status</p>
          <p className="mt-3 font-display text-4xl text-forest">All clear</p>
          <p className="mt-2 text-sm text-muted">Last mock check-in: this morning, Mumbai.</p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-cream-deep">
            <div className="h-full w-[86%] rounded-full bg-coral" />
          </div>
          <p className="mt-2 text-xs text-muted">Preparedness 86%</p>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Trips planned" value={trips.length} hint="Including drafts" icon={Compass} />
        <StatCard label="Budget on deck" value="₹42k" hint="Udaipur next" icon={Wallet} tone="peach" />
        <StatCard label="Safety score" value="86" hint="Contacts + packing" icon={Shield} tone="lilac" />
        <StatCard label="AI drafts" value="3" hint="Ready to refine" icon={Sparkles} tone="coral" />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl text-forest">Quick actions</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/trips/create", label: "Create a trip" },
            { to: "/ai-planner", label: "Ask the planner" },
            { to: "/packing", label: "Packing list" },
            { to: "/community", label: "Community" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-2xl border border-line bg-white px-4 py-4 text-sm font-semibold text-forest transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-2xl text-forest">Recent trips</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {recent.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
        <Card className="p-5">
          <h2 className="font-display text-2xl text-forest">Community activity</h2>
          <ul className="mt-4 space-y-4">
            {activity.map((item) => (
              <li key={item.id} className="border-b border-line pb-3 text-sm last:border-0">
                <p className="text-forest">{item.text}</p>
                <p className="text-xs text-muted">{item.time} ago</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
