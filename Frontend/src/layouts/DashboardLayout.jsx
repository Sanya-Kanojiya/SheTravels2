import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  Camera,
  Compass,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Map,
  Menu,
  Phone,
  Settings,
  Shield,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/trips", label: "My Trips", icon: Map },
  { to: "/ai-planner", label: "AI Trip Planner", icon: Sparkles },
  { to: "/safety", label: "Safety Center", icon: Shield },
  { to: "/emergency-contacts", label: "Emergency Contacts", icon: Phone },
  { to: "/packing", label: "Packing Checklist", icon: BookOpen },
  { to: "/community", label: "Community", icon: Compass },
  { to: "/memories", label: "Memories", icon: Camera },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/settings", label: "Settings", icon: Settings },
];

function SideLinks({ onNavigate }) {
  const { logout } = useApp();
  const navigate = useNavigate();

  return (
    <nav className="flex flex-1 flex-col gap-1">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? "bg-sage text-forest" : "text-forest/75 hover:bg-white/70"
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </NavLink>
        );
      })}
      <button
        type="button"
        className="mt-auto flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-coral hover:bg-white/70"
        onClick={async () => {
          await logout();
          onNavigate?.();
          navigate("/");
        }}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </nav>
  );
}

export default function DashboardLayout() {
  const { user } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-line bg-sage/70 p-5 lg:flex">
          <div className="mb-8 flex items-center gap-2 font-semibold text-forest">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white">
              <Compass className="h-4 w-4" />
            </span>
            SheTravels AI
          </div>
          <SideLinks />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-cream/90 px-4 py-3 backdrop-blur lg:px-8">
            <button type="button" className="rounded-xl p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu />
            </button>
            <p className="hidden text-sm text-muted md:block">Travel with a plan · stay reachable</p>
            <div className="ml-auto flex items-center gap-3">
              <button type="button" className="rounded-2xl bg-white p-2 text-forest shadow-sm" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-lilac text-xs font-bold text-forest">
                  {(user?.name || "A")[0]}
                </span>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-forest">{user?.name || "Guest"}</p>
                  <p className="text-xs text-muted">{user?.role === "admin" ? "Admin" : "Traveller"}</p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-forest/40" onClick={() => setOpen(false)} />
          <aside className="relative flex h-full w-72 flex-col bg-sage p-5">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-semibold text-forest">Menu</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
                <X />
              </button>
            </div>
            <SideLinks onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      ) : null}
    </div>
  );
}
