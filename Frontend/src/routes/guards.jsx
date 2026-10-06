import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function RequireAuth({ role }) {
  const { user, ready } = useApp();
  if (!ready) {
    return <div className="p-10 text-sm text-muted">Loading…</div>;
  }
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }
  return <Outlet />;
}
