import { Compass } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-sage">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export function AuthShell({ children, panel }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-sage px-10 py-10 lg:flex lg:flex-col">
        <Link to="/" className="flex items-center gap-2 font-semibold text-forest">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white">
            <Compass className="h-4 w-4" />
          </span>
          SheTravels AI
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-forest/55">
          Travel with a plan
        </p>
        {panel}
      </section>
      <section className="relative flex items-center justify-center bg-cream px-6 py-12">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </div>
  );
}

export function Sticker({ label, className, children }) {
  return (
    <div
      className={`absolute flex h-16 w-16 rotate-6 flex-col items-center justify-center rounded-[22px] bg-white shadow-[0_10px_24px_rgba(36,49,43,0.08)] ${className}`}
    >
      {children}
      <span className="mt-1 text-[8px] font-bold uppercase tracking-wider text-forest/70">{label}</span>
    </div>
  );
}
