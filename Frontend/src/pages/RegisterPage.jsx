import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import { AuthShell } from "../layouts/PublicLayout";
import { useApp } from "../context/AppContext";

export default function RegisterPage() {
  const { register, notify } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      notify("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const nextUser = await register({ name: form.name, email: form.email, password: form.password });
      navigate(nextUser.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <AuthShell
      panel={
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest/50">
            Join the quiet side of travel
          </p>
          <h1 className="mt-4 font-display text-6xl leading-[0.95] text-forest">
            Your plans.
            <span className="mt-1 block text-coral">Your pace.</span>
          </h1>
          <p className="mt-6 max-w-md text-forest/70">
            Create a profile to plan trips, keep safety tools close, and join the women’s travel
            community.
          </p>
        </div>
      }
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">New member</p>
      <h1 className="mt-3 font-display text-5xl text-forest">Create account</h1>
      <p className="mt-3 text-muted">A few details, then you can start a sample trip.</p>
      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <Input label="Name" placeholder="Aanya Mehra" icon={User} value={form.name} onChange={set("name")} />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={form.email}
          onChange={set("email")}
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          icon={Lock}
          value={form.password}
          onChange={set("password")}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Repeat password"
          icon={Lock}
          value={form.confirm}
          onChange={set("confirm")}
        />
        {error ? <p className="text-sm text-sos">{error}</p> : null}
        <Button type="submit" className="mt-2 w-full" disabled={loading}>
          {loading ? "Creating account…" : "Register"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Already have access?{" "}
        <Link to="/login" className="font-semibold text-coral">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
