import { useState } from "react";
import { Bell, Phone, Shield, Siren } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import SafetyCard from "../components/SafetyCard";
import { contacts, safetyTips } from "../data/mock";
import { useApp } from "../context/AppContext";

export default function SafetyPage() {
  const { notify } = useApp();
  const [sos, setSos] = useState(false);
  const [checkedIn, setCheckedIn] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Safety center</p>
          <h1 className="font-display text-4xl text-forest">Stay reachable</h1>
        </div>
        <span className="rounded-full bg-sage px-4 py-2 text-sm font-semibold text-forest">Status: All clear</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-sm text-muted">Demo only — does not call emergency services</p>
          <button
            type="button"
            onClick={() => setSos(true)}
            className="mt-4 flex h-40 w-40 items-center justify-center rounded-full bg-sos text-xl font-bold text-white shadow-[0_16px_40px_rgba(214,69,69,0.35)] transition hover:scale-[1.02]"
          >
            SOS
          </button>
          <p className="mt-4 max-w-sm text-sm text-muted">
            Opens a confirmation modal. Use real local numbers in an actual emergency.
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="font-display text-2xl text-forest">Check-in</h2>
          <p className="mt-2 text-sm text-muted">
            {checkedIn ? "You checked in this morning from Mumbai." : "You are overdue for today’s check-in."}
          </p>
          <Button
            className="mt-5 w-full"
            variant={checkedIn ? "ghost" : "primary"}
            onClick={() => {
              setCheckedIn(true);
              notify("Check-in recorded (mock).");
            }}
          >
            I’m safe — check in
          </Button>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <SafetyCard icon={Shield} title="Share today’s route" body="Send a simple summary to your primary contact before you leave." />
        <SafetyCard icon={Bell} title="8pm reminder" body="A nudge to message home. Demo toast only." tone="peach" />
        <SafetyCard icon={Phone} title="Local numbers" body="Keep hotel desk and sister on the first screen of contacts." tone="lilac" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-display text-2xl text-forest">Safety tips</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {safetyTips.map((tip) => (
              <li key={tip}>• {tip}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <h2 className="font-display text-2xl text-forest">Emergency contacts</h2>
          <ul className="mt-4 space-y-3">
            {contacts.map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3 text-sm">
                <span className="font-semibold text-forest">{c.name}</span>
                <span className="text-muted">{c.phone}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Modal open={sos} title="Send SOS?" onClose={() => setSos(false)}>
        <p className="text-sm leading-6 text-muted">
          This is a frontend demonstration. No call, SMS, or location share will be sent. In a real
          product this would notify your contacts and show local emergency numbers.
        </p>
        <div className="mt-5 flex gap-2">
          <Button variant="danger" className="flex-1" onClick={() => { notify("SOS demo sent to mock contacts."); setSos(false); }}>
            <Siren className="h-4 w-4" /> Simulate alert
          </Button>
          <Button variant="ghost" className="flex-1" onClick={() => setSos(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
