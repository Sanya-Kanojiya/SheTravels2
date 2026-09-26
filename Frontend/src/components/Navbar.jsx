import { Link, NavLink } from "react-router-dom";
import { Compass, Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "./Button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/login", label: "Member access" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-sage/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-forest">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Compass className="h-4 w-4" />
          </span>
          SheTravels AI
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-forest/80 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className="hover:text-forest">
              {link.label}
            </NavLink>
          ))}
          <Link to="/register">
            <Button className="px-4 py-2">Create account</Button>
          </Link>
        </nav>
        <button
          type="button"
          className="rounded-xl p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="space-y-2 border-t border-white/50 px-5 py-4 md:hidden">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="block py-2 text-forest" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
