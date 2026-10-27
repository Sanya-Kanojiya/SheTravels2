import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Wallet } from "lucide-react";
import Card from "./Card";

const tones = {
  sage: "bg-sage",
  peach: "bg-peach",
  lilac: "bg-lilac",
};

export default function TripCard({ trip }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className={`${tones[trip.coverTone] || tones.sage} px-5 py-4`}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest/70">
          {trip.status}
        </p>
        <h3 className="mt-1 font-display text-2xl text-forest">{trip.destination}</h3>
      </div>
      <div className="space-y-3 p-5">
        <p className="flex items-center gap-2 text-sm text-muted">
          <Calendar className="h-4 w-4" />
          {trip.startDate} → {trip.endDate}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted">
          <Wallet className="h-4 w-4" />
          ₹{trip.budget.toLocaleString("en-IN")}
        </p>
        <Link
          to={`/trips/${trip._id || trip.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-coral hover:text-coral-dark"
        >
          View trip <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}
