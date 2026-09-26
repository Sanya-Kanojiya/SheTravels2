import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { useApp } from "../context/AppContext";

function Toggle({ on, onClick, label, hint }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center justify-between gap-4 py-3 text-left">
      <span>
        <span className="block text-sm font-semibold text-forest">{label}</span>
        <span className="text-xs text-muted">{hint}</span>
      </span>
      <span className={`h-7 w-12 rounded-full p-1 transition ${on ? "bg-coral" : "bg-line"}`}>
        <span className={`block h-5 w-5 rounded-full bg-white transition ${on ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
}

export default function SettingsPage() {
  const { logout, notify } = useApp();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState({ checkin: true, community: false, marketing: false, share: true });

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <h1 className="font-display text-4xl text-forest">Settings</h1>
      <Card className="p-5">
        <h2 className="font-display text-2xl text-forest">Account</h2>
        <p className="mt-2 text-sm text-muted">Demo account stored only in this browser session.</p>
        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => notify("Password change is not wired in this frontend demo.")}
        >
          Change password
        </Button>
      </Card>
      <Card className="divide-y divide-line p-5">
        <h2 className="pb-3 font-display text-2xl text-forest">Notifications</h2>
        <Toggle
          on={alerts.checkin}
          label="Check-in reminders"
          hint="Evening nudge to message home"
          onClick={() => setAlerts((a) => ({ ...a, checkin: !a.checkin }))}
        />
        <Toggle
          on={alerts.community}
          label="Community replies"
          hint="When someone comments on your post"
          onClick={() => setAlerts((a) => ({ ...a, community: !a.community }))}
        />
        <Toggle
          on={alerts.marketing}
          label="Product notes"
          hint="Occasional tips from SheTravels"
          onClick={() => setAlerts((a) => ({ ...a, marketing: !a.marketing }))}
        />
      </Card>
      <Card className="p-5">
        <h2 className="font-display text-2xl text-forest">Privacy</h2>
        <Toggle
          on={alerts.share}
          label="Share trip status with primary contact"
          hint="Mock preference only"
          onClick={() => setAlerts((a) => ({ ...a, share: !a.share }))}
        />
      </Card>
      <Card className="p-5">
        <h2 className="font-display text-2xl text-forest">Logout</h2>
        <p className="mt-2 text-sm text-muted">Return to the public site. You can sign in again with any email.</p>
        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Sign out
        </Button>
      </Card>
    </div>
  );
}
