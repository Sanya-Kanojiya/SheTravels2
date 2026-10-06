import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState([]);

  const notify = (message) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.data.user))
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const nextUser = res.data.data.user;
    setUser(nextUser);
    notify(nextUser.role === "admin" ? "Welcome to the admin desk." : "Signed in. Your plans are ready.");
    return nextUser;
  };

  const register = async ({ name, email, password }) => {
    const res = await api.post("/auth/register", { name, email, password });
    const nextUser = res.data.data.user;
    setUser(nextUser);
    notify("Account created. Welcome to SheTravels.");
    return nextUser;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // cookie may already be gone
    }
    setUser(null);
    notify("You have been signed out.");
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      ready,
      toasts,
      notify,
      login,
      register,
      logout,
    }),
    [user, ready, toasts],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
