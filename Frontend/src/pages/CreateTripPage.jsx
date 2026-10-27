import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import ItineraryCard from "../components/ItineraryCard";

import { useApp } from "../context/AppContext";
import api from "../services/api";

export default function CreateTripPage() {
  const { addTrip } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    interests: "",
    style: "Independent & unhurried",
  });
  const [plan, setPlan] = useState(null);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));


  const generate = async (e) => {
    e.preventDefault();
    console.log("🔥 GENERATE BUTTON CLICKED");
    try {
      const response = await api.post("/trips/generate", {
        destination: form.destination,
        startDate: form.startDate,
        endDate: form.endDate,
        budget: form.budget,
        interests: form.interests,
        travelType: "Solo",
        travelStyle: form.style,
      });

      console.log("✅ BACKEND RESPONSE:", response.data);

      setPlan(response.data.data.plan);
    } catch (error) {
      console.error("❌ GENERATE ERROR:", error);
      alert(error.message || "Failed to generate trip");
    }
  };

  const save = () => {
    const id = `t-${Date.now()}`;
    addTrip({
      id,
      destination: form.destination || "New destination",
      country: "",
      startDate: form.startDate || "TBD",
      endDate: form.endDate || "TBD",
      budget: Number(form.budget) || 25000,
      currency: "INR",
      status: "planned",
      style: form.style,
      coverTone: "lilac",
      safetyScore: 80,
      note: form.interests,
      places: ["Old town walk", "Sunset point", "Local cafe"],
      itinerary: plan?.days || [],
      safetyTips: plan?.safety || [],
    });
    navigate("/trips");
  };


  
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Create trip</p>
        <h1 className="font-display text-4xl text-forest">Sketch the next one</h1>
      </div>
      <Card className="p-6">
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={generate}>
          <Input
            className="sm:col-span-2"
            label="Destination"
            placeholder="Udaipur, Rajasthan"
            value={form.destination}
            onChange={set("destination")}
          />
          <Input label="Start date" type="date" value={form.startDate} onChange={set("startDate")} />
          <Input label="End date" type="date" value={form.endDate} onChange={set("endDate")} />
          <Input label="Budget (INR)" type="number" placeholder="42000" value={form.budget} onChange={set("budget")} />
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-forest">Travel style</span>
            <select
              className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm"
              value={form.style}
              onChange={set("style")}
            >
              <option>Independent & unhurried</option>
              <option>Heritage & food</option>
              <option>Coastal slow travel</option>
              <option>Hills & cafes</option>
            </select>
          </label>
          <Input
            className="sm:col-span-2"
            label="Travel interests"
            placeholder="Lakes, palaces, women-run stays"
            value={form.interests}
            onChange={set("interests")}
          />
          <Button type="submit" className="sm:col-span-2">
            Generate My Trip
          </Button>
        </form>
      </Card>

      {plan ? (
        <Card className="space-y-4 p-6">
          <h2 className="font-display text-2xl text-forest">{plan.destination}</h2>
          <p className="text-sm text-muted">{plan.summary}</p>
          <div className="space-y-4 border-l border-line ml-2">
            {plan.days.map((day) => (
              <ItineraryCard key={day.day} day={day} />
            ))}
          </div>
          <Button onClick={save}>Save to My Trips</Button>
        </Card>
      ) : null}
    </div>
  );
}
