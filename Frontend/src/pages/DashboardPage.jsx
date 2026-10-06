import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Compass, Shield, Sparkles, Wallet } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import TripCard from "../components/TripCard";
import { useApp } from "../context/AppContext";
import api from "../services/api";
import { mapTrip, timeAgo } from "../utils/mappers";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function DashboardPage() {
  const { user, notify } = useApp();
  const [trips, setTrips] = useState([]);
  const [safety, setSafety] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/trips"),
      api.get("/safety/status"),
      api.get("/community/posts"),
    ])
      .then(([tripRes, safetyRes, postRes]) => {
        setTrips((tripRes.data.data.trips || []).map(mapTrip));
        setSafety(safetyRes.data.data);
        setPosts(postRes.data.data.posts || []);
      })
      .catch((err) => notify(err.message))
      .finally(() => setLoading(false));
  }, [notify]);

  const upcoming = trips.find((t) => t.status === "Upcoming") || trips.find((t) => t.status === "Planning") || trips[0];
  const recent = trips.filter((t) => t.status === "Completed").slice(0, 2);
  const nextBudget = upcoming?.budget || 0;

  if (loading) return <LoadingSkeleton rows={5} />;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Dashboard</p>
        <h1 className="mt-1 font-display text-4xl text-forest">
          Welcome back, {(user?.name || "there").split(" ")[0]}.
        </h1>
        <p className="mt-2 text-muted">Your next stretch of road is already sketched in.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="bg-sage p-6 lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest/60">Upcoming trip</p>
          {upcoming ? (
            <>
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
            </>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-forest/70">No trips yet. Start with a destination and travel type.</p>
              <Link to="/trips/create" className="mt-4 inline-block">
                <Button>Create a trip</Button>
              </Link>
            </div>
          )}
        </Card>
        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Safety status</p>
          <p className="mt-3 font-display text-4xl text-forest">{safety?.sosActive ? "SOS active" : "All clear"}</p>
          <p className="mt-2 text-sm text-muted">
            {safety?.lastCheckIn
              ? `Last check-in: ${new Date(safety.lastCheckIn).toLocaleString()}`
              : "No check-in recorded yet."}
          </p>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Trips planned" value={trips.length} hint="Including drafts" icon={Compass} />
        <StatCard
          label="Budget on deck"
          value={nextBudget ? `₹${Math.round(nextBudget / 1000)}k` : "—"}
          hint={upcoming?.destination || "Add a trip"}
          icon={Wallet}
          tone="peach"
        />
        <StatCard label="Safety" value={safety?.sosActive ? "Alert" : "OK"} hint="Check-in + contacts" icon={Shield} tone="lilac" />
        <StatCard label="Community" value={posts.length} hint="Recent notes" icon={Sparkles} tone="coral" />
      </div>

      <div>
        <h2 className="mb-3 font-display text-2xl text-forest">Quick actions</h2>
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
          {recent.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {recent.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">Completed trips will show up here.</p>
          )}
        </div>
        <Card className="p-5">
          <h2 className="font-display text-2xl text-forest">Community activity</h2>
          <ul className="mt-4 space-y-4">
            {posts.slice(0, 4).map((item) => (
              <li key={item.id} className="border-b border-line pb-3 text-sm last:border-0">
                <p className="text-forest">
                  {item.author} posted from {item.destination || "the road"}.
                </p>
                <p className="text-xs text-muted">{timeAgo(item.time)}</p>
              </li>
            ))}
            {posts.length === 0 ? <p className="text-sm text-muted">No community notes yet.</p> : null}
          </ul>
        </Card>
      </div>
    </div>
  );
}
