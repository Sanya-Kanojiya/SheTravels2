import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import EmptyState from "../components/EmptyState";
import Input from "../components/Input";
import TripCard from "../components/TripCard";
import { useApp } from "../context/AppContext";
import Button from "../components/Button";
import { Map } from "lucide-react";

const filters = ["All", "Upcoming", "Planning", "Completed"];

export default function TripsPage() {
  const { trips } = useApp();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");

  const visible = useMemo(() => {
    return trips.filter((trip) => {
      const matchQ = trip.destination.toLowerCase().includes(q.toLowerCase());
      const matchF = filter === "All" || trip.status === filter;
      return matchQ && matchF;
    });
  }, [trips, q, filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">My trips</p>
          <h1 className="font-display text-4xl text-forest">Routes on the table</h1>
        </div>
        <Link to="/trips/create">
          <Button>Create trip</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          icon={Search}
          placeholder="Search destinations"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="md:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                filter === item ? "bg-forest text-white" : "bg-white text-forest"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {visible.length === 0 ? (
        <EmptyState
          icon={Map}
          title="No trips in this view"
          body="Try another filter, or sketch a new route with the planner."
          action={
            <Link to="/trips/create">
              <Button>Create a trip</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}
