const statusLabels = {
  planned: "Planning",
  ongoing: "Upcoming",
  completed: "Completed",
};

export function mapTrip(trip) {
  if (!trip) return trip;
  const start = trip.startDate ? String(trip.startDate).slice(0, 10) : "";
  const end = trip.endDate ? String(trip.endDate).slice(0, 10) : "";
  return {
    ...trip,
    id: trip._id || trip.id,
    startDate: start,
    endDate: end,
    status: statusLabels[trip.status] || trip.status,
    style: trip.travelStyle || trip.style,
    places: trip.placesToVisit || trip.places || [],
    coverTone: trip.coverTone || "sage",
    safetyScore: trip.safetyScore || 80,
    budget: Number(trip.budget) || 0,
    itinerary: trip.itinerary || [],
    safetyTips: trip.safetyTips || [],
  };
}

export function mapMemory(memory) {
  return {
    id: memory._id || memory.id,
    destination: memory.destination,
    date: memory.createdAt ? new Date(memory.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "",
    note: memory.description || memory.title,
    title: memory.title,
    places: memory.visitedPlaces || [],
    photos: memory.image ? 1 : 0,
    image: memory.image,
  };
}

export function timeAgo(date) {
  if (!date) return "";
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
