import { createContext, useContext, useMemo, useState } from "react";
import { communityPosts as seedPosts, contacts as seedContacts, trips as seedTrips } from "../data/mock";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState(seedTrips);
  const [contacts, setContacts] = useState(seedContacts);
  const [posts, setPosts] = useState(seedPosts);
  const [toasts, setToasts] = useState([]);

  const notify = (message, type = "success") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const login = (email, name) => {
    const isAdmin = email.toLowerCase().includes("admin");
    const nextUser = {
      id: isAdmin ? "admin-1" : "u-1",
      name: isAdmin ? "SheTravels Admin" : name || "Aanya Mehra",
      email,
      role: isAdmin ? "admin" : "traveller",
    };
    setUser(nextUser);
    notify(isAdmin ? "Welcome to the admin desk." : "Signed in. Your plans are ready.");
    return nextUser;
  };

  const logout = () => {
    setUser(null);
    notify("You have been signed out.", "info");
  };

  const addTrip = (trip) => {
    setTrips((prev) => [trip, ...prev]);
    notify("Trip saved to My Trips.");
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      trips,
      setTrips,
      addTrip,
      contacts,
      setContacts,
      posts,
      setPosts,
      toasts,
      notify,
      login,
      logout,
    }),
    [user, trips, contacts, posts, toasts],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
