import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Compass, Flag, LayoutDashboard, LogOut, Users } from "lucide-react";
import { useApp } from "../context/AppContext";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/users", label: "Manage Users", icon: Users },
  { to: "/admin/reports", label: "Community Reports", icon: Flag },
];

export default function AdminLayout() {
  const { logout, user } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-64 flex-col border-r border-line bg-forest p-5 text-white md:flex">
          <p className="mb-8 flex items-center gap-2 font-semibold">
            <Compass className="h-4 w-4" /> Admin
          </p>
          <nav className="flex flex-1 flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/admin"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm ${
                      isActive ? "bg-white/15" : "text-white/75 hover:bg-white/10"
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
              className="mt-auto flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-peach"
              onClick={async () => {
                await logout();
                navigate("/");
              }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </nav>
        </aside>
        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-line px-4 py-4 lg:px-8">
            <p className="text-sm text-muted">SheTravels moderation desk</p>
            <p className="text-sm font-semibold text-forest">{user?.name}</p>
          </header>
          <div className="flex gap-2 overflow-x-auto px-4 py-3 md:hidden">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/admin"}
                className="rounded-full bg-white px-3 py-1.5 text-sm text-forest"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <main className="px-4 py-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
