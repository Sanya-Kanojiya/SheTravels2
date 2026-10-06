import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Camera, Eye, EyeOff, Globe, Lock, Luggage, Mail, MapPin, Plane } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import { AuthShell, Sticker } from "../layouts/PublicLayout";
import { useApp } from "../context/AppContext";

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const nextUser = await login(email, password);
      navigate(nextUser.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      panel={
        <div className="relative flex flex-1 flex-col justify-center">
          <Sticker label="Wander" className="right-16 top-8 bg-lilac -rotate-6">
            <Globe className="h-5 w-5 text-forest" />
          </Sticker>
          <Sticker label="Take off" className="right-8 top-32 bg-peach">
            <Plane className="h-5 w-5 text-forest" />
          </Sticker>
          <Sticker label="Passport" className="left-0 top-40 bg-lilac -rotate-12">
            <Mail className="h-5 w-5 text-forest" />
          </Sticker>
          <Sticker label="Meet here" className="left-24 top-[22rem] bg-peach -rotate-6">
            <MapPin className="h-5 w-5 text-forest" />
          </Sticker>
          <Sticker label="Pack light" className="bottom-16 left-4 bg-white -rotate-6">
            <Luggage className="h-5 w-5 text-forest" />
          </Sticker>
          <Sticker label="Moments" className="bottom-28 right-10 bg-peach rotate-12">
            <Camera className="h-5 w-5 text-forest" />
          </Sticker>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest/50">
            A steadier way to go
          </p>
          <h1 className="mt-4 font-display text-6xl leading-[0.95] text-forest">
            Plan well.
            <span className="mt-1 block text-coral">Go freely.</span>
          </h1>
          <p className="mt-6 max-w-md text-forest/70">
            Practical guidance for planning safer solo travel — from your first route idea to a
            confident arrival.
          </p>
          <div className="relative mt-10 overflow-hidden rounded-[28px] bg-white/50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest/50">
              Route overview
            </p>
            <svg viewBox="0 0 320 120" className="mt-4 h-28 w-full text-coral">
              <path
                d="M10 90 C 70 20, 120 110, 180 50 S 270 20, 310 45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="6 8"
              />
              <circle cx="24" cy="82" r="6" fill="#fff" stroke="#1b3a2f" />
              <circle cx="180" cy="50" r="6" fill="#1b3a2f" />
              <circle cx="300" cy="42" r="6" fill="#fff" stroke="#e06a55" />
            </svg>
            <p className="text-xs text-forest/60">From first plan to safe arrival</p>
          </div>
        </div>
      }
    >
      <Sticker label="Boarding pass" className="right-8 top-8 hidden bg-peach lg:flex">
        <Plane className="h-4 w-4 text-forest" />
      </Sticker>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-coral">
        <span className="h-1.5 w-1.5 rounded-full bg-coral" /> Member access
      </p>
      <h1 className="mt-3 font-display text-5xl text-forest">Welcome back</h1>
      <p className="mt-3 text-muted">Sign in to keep your plans, notes, and safety preferences close at hand.</p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-forest">Password</span>
            <button type="button" className="text-xs font-semibold text-coral">
              Forgot password?
            </button>
          </div>
          <Input
            type={show ? "text" : "password"}
            placeholder="At least 8 characters"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-4 top-[42px] text-muted"
            onClick={() => setShow((v) => !v)}
            aria-label="Toggle password"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm text-forest">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="accent-coral"
          />
          Keep me signed in on this device
        </label>
        {error ? <p className="text-sm text-sos">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Continue to my trips →"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        New to SheTravels?{" "}
        <Link to="/register" className="font-semibold text-coral">
          Create your account
        </Link>
      </p>
      <p className="mt-6 text-center text-xs text-muted">
        Use a registered account. Register with admin@shetravels.ai to open the admin desk.
      </p>
    </AuthShell>
  );
}
