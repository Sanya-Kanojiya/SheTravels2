import { useParams, Link } from "react-router-dom";
import { Calendar, Shield, Wallet } from "lucide-react";
import Card from "../components/Card";
import ItineraryCard from "../components/ItineraryCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { useApp } from "../context/AppContext";

export default function TripDetailsPage() {
  const { id } = useParams();
  const { trips } = useApp();
  const trip = trips.find(
    (item) => String(item._id || item.id) === id
  );

  if (!trip) {
    return (
      <EmptyState
        title="Trip not found"
        body="This route is not in your mock list."
        action={
          <Link to="/trips">
            <Button variant="ghost">Back to trips</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden p-0">
        <div className="bg-sage px-6 py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest/60">{trip.status}</p>
          <h1 className="mt-2 font-display text-4xl text-forest">{trip.destination}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-forest/80">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {trip.startDate} → {trip.endDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <Wallet className="h-4 w-4" />₹{trip.budget.toLocaleString("en-IN")}
            </span>
            <span className="inline-flex items-center gap-2">
              <Shield className="h-4 w-4" /> Safety {trip.safetyScore}
            </span>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h2 className="font-display text-2xl text-forest">Day-wise itinerary</h2>
          <div className="space-y-4">
            {(trip.itinerary || []).length ? (
              trip.itinerary.map((day) => <ItineraryCard key={day.day} day={day} />)
            ) : (
              <p className="text-sm text-muted">No day plan saved yet. Generate one from Create Trip.</p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-display text-xl text-forest">Places to visit</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {(trip.places || []).map((place) => (
                <li key={place}>• {place}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <h3 className="font-display text-xl text-forest">Safety tips</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {(trip.safetyTips || []).map((tip) => (
                <li key={tip}>• {tip}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
