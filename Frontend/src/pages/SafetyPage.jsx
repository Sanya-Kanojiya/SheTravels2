
import { useEffect, useState } from "react";
import { Bell, Phone, Shield, Siren, MapPin } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import SafetyCard from "../components/SafetyCard";
import { safetyTips } from "../data/mock";
import { useApp } from "../context/AppContext";
import api from "../services/api";

export default function SafetyPage() {
  const { notify } = useApp();

  const [sos, setSos] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sosLoading, setSosLoading] = useState(false);
  const [checkInLoading, setCheckInLoading] = useState(false);

  // Load real safety status from backend
  const fetchSafetyStatus = async () => {
    try {
      const res = await api.get("/safety/status");
      const data = res.data.data;

      setCheckedIn(data.checkedIn);
      setSosActive(data.sosActive);
      setContacts(data.contacts || []);
      setLastCheckIn(data.lastCheckIn);
    } catch (error) {
      notify(error.message || "Unable to load safety status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSafetyStatus();
  }, []);

  // Get current GPS location
  const getCurrentLocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => resolve(null),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  // Trigger SOS
  const handleSOS = async () => {
    try {
      setSosLoading(true);

      const location = await getCurrentLocation();

      const res = await api.post("/safety/sos", {
        location,
      });

      setSosActive(true);
      setSos(false);

      const notified = res.data.data.notifiedContacts || [];

      notify(
        `SOS activated. ${notified.length} emergency contacts found.`
      );

      await fetchSafetyStatus();
    } catch (error) {
      notify(error.message || "Unable to activate SOS");
    } finally {
      setSosLoading(false);
    }
  };

  // Record check-in
  const handleCheckIn = async () => {
    try {
      setCheckInLoading(true);

      const res = await api.post("/safety/check-in");

      setCheckedIn(true);
      setLastCheckIn(res.data.data.lastCheckIn);

      notify("Your safety check-in has been recorded!");
      await fetchSafetyStatus();
    } catch (error) {
      notify(error.message || "Check-in failed");
    } finally {
      setCheckInLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-muted">
        Loading Safety Center...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Safety Center
          </p>
          <h1 className="font-display text-4xl text-forest">
            Stay Safe, Stay Connected
          </h1>
        </div>

        <span className={`rounded-full px-4 py-2 text-sm font-semibold ${
          sosActive
            ? "bg-red-100 text-red-700"
            : "bg-sage text-forest"
        }`}>
          Status: {sosActive ? "SOS Active" : "All Clear"}
        </span>
      </div>

      {/* SOS and Check-in */}
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">

        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-sm text-muted">
            Need immediate assistance?
          </p>

          <button
            type="button"
            onClick={() => setSos(true)}
            disabled={sosLoading}
            className="mt-4 flex h-40 w-40 items-center justify-center rounded-full bg-sos text-xl font-bold text-white shadow-[0_16px_40px_rgba(214,69,69,0.35)] transition hover:scale-[1.02] disabled:opacity-60"
          >
            SOS
          </button>

          <p className="mt-4 max-w-sm text-sm text-muted">
            Activate an emergency alert and attach your current GPS location
            when permission is available.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-2xl text-forest">
            Safety Check-in
          </h2>

          <p className="mt-2 text-sm text-muted">
            {checkedIn
              ? "Your safety check-in is recorded."
              : "You haven't checked in yet."}
          </p>

          {lastCheckIn && (
            <p className="mt-2 text-xs text-muted">
              Last check-in: {new Date(lastCheckIn).toLocaleString()}
            </p>
          )}

          <Button
            className="mt-5 w-full"
            variant="primary"
            onClick={handleCheckIn}
            disabled={checkInLoading}
          >
            {checkInLoading ? "Recording..." : "I'm safe — Check in"}
          </Button>
        </Card>
      </div>

      {/* Safety Features */}
      <div className="grid gap-4 md:grid-cols-3">
        <SafetyCard
          icon={Shield}
          title="Share today's route"
          body="Share your travel route with a trusted contact."
        />

        <SafetyCard
          icon={Bell}
          title="Safety reminders"
          body="Stay updated with regular safety check-in reminders."
          tone="peach"
        />

        <SafetyCard
          icon={Phone}
          title="Emergency support"
          body="Keep your trusted contacts accessible."
          tone="lilac"
        />
      </div>

      {/* Safety Tips and Emergency Contacts */}
      <div className="grid gap-6 lg:grid-cols-2">

        <Card className="p-6">
          <h2 className="font-display text-2xl text-forest">
            Safety Tips
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-muted">
            {safetyTips.map((tip) => (
              <li key={tip}>• {tip}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-2xl text-forest">
            Emergency Contacts
          </h2>

          {contacts.length === 0 ? (
            <p className="mt-4 text-sm text-muted">
              No emergency contacts added yet. Please add trusted contacts.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {contacts.map((contact) => (
                <li
                  key={contact._id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-cream px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-forest">
                      {contact.name}
                      {contact.primary && " ★"}
                    </p>
                    <p className="text-xs text-muted">
                      {contact.relationship}
                    </p>
                  </div>

                  <a
                    href={`tel:${contact.phone}`}
                    className="font-medium text-forest"
                  >
                    {contact.phone}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* SOS Confirmation */}
      <Modal
        open={sos}
        title="Send Emergency SOS?"
        onClose={() => setSos(false)}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-5 w-5" />
            Your current location will be requested.
          </div>

          <p className="text-sm leading-6 text-muted">
            This will activate the SOS status in SheTravels.
            GPS permission may be requested. External emergency
            notifications are not yet configured.
          </p>

          <div className="flex gap-2">
            <Button
              variant="danger"
              className="flex-1"
              disabled={sosLoading}
              onClick={handleSOS}
            >
              <Siren className="h-4 w-4" />
              {sosLoading ? "Activating..." : "Confirm SOS"}
            </Button>

            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => setSos(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
