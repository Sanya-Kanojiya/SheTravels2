
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Show notification
  const notify = (message) => {
    const id = crypto.randomUUID();

    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2800);
  };

  // ---------------- TRIPS ----------------

  // Fetch user's trips from backend
  const fetchTrips = async () => {
    try {
      const res = await api.get("/trips");
      setTrips(res.data.data.trips || []);
    } catch (error) {
      console.error("Failed to fetch trips:", error);
      setTrips([]);
    }
  };

  // Add a trip
  const addTrip = async (tripData) => {
    try {
      const res = await api.post("/trips", tripData);
      const newTrip = res.data.data.trip;

      setTrips((prev) => [newTrip, ...prev]);

      return newTrip;
    } catch (error) {
      console.error("Failed to save trip:", error);
      throw error;
    }
  };

  // ---------------- EMERGENCY CONTACTS ----------------

  // Fetch contacts saved by the logged-in user
  const fetchContacts = async () => {
    try {
      const res = await api.get("/emergency-contacts");

      setContacts(res.data.data.contacts || []);
    } catch (error) {
      console.error("Failed to fetch emergency contacts:", error);
      setContacts([]);
      throw error;
    }
  };

  // Add a new emergency contact
  const addContact = async (contactData) => {
    try {
      const res = await api.post("/emergency-contacts", contactData);

      const newContact = res.data.data.contact;

      setContacts((prev) => [newContact, ...prev]);

      return newContact;
    } catch (error) {
      console.error("Failed to add emergency contact:", error);
      throw error;
    }
  };

  // Update an existing emergency contact
  const updateContact = async (contactId, contactData) => {
    try {
      const res = await api.put(
        `/emergency-contacts/${contactId}`,
        contactData
      );

      const updatedContact = res.data.data.contact;

      setContacts((prev) =>
        prev.map((contact) =>
          (contact._id || contact.id) === contactId
            ? updatedContact
            : contact
        )
      );

      return updatedContact;
    } catch (error) {
      console.error("Failed to update emergency contact:", error);
      throw error;
    }
  };

  // Delete an emergency contact
  const deleteContact = async (contactId) => {
    try {
      await api.delete(`/emergency-contacts/${contactId}`);

      setContacts((prev) =>
        prev.filter(
          (contact) => (contact._id || contact.id) !== contactId
        )
      );
    } catch (error) {
      console.error("Failed to delete emergency contact:", error);
      throw error;
    }
  };

  // ---------------- AUTHENTICATION ----------------

  // Check whether an existing login session is active
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get("/auth/me");
        const currentUser = res.data.data.user;

        setUser(currentUser);

        // Load this user's data after authentication
        await Promise.all([fetchTrips(), fetchContacts()]);
      } catch (error) {
        setUser(null);
        setTrips([]);
        setContacts([]);
      } finally {
        setReady(true);
      }
    };

    checkSession();
  }, []);

  // Login
  const login = async (email, password) => {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const nextUser = res.data.data.user;

    setUser(nextUser);

    // Load trips and contacts after login
    await Promise.all([fetchTrips(), fetchContacts()]);

    notify(
      nextUser.role === "admin"
        ? "Welcome to the admin desk."
        : "Signed in. Your plans are ready."
    );

    return nextUser;
  };

  // Register
  const register = async ({ name, email, password }) => {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    const nextUser = res.data.data.user;

    setUser(nextUser);
    setTrips([]);
    setContacts([]);

    notify("Account created. Welcome to SheTravels.");

    return nextUser;
  };

  // Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // The session may already have expired
    }

    setUser(null);
    setTrips([]);
    setContacts([]);

    notify("You have been signed out.");
  };

  // ---------------- CONTEXT VALUE ----------------

  const value = {
    user,
    setUser,

    trips,
    setTrips,
    fetchTrips,
    addTrip,

    contacts,
    setContacts,
    fetchContacts,
    addContact,
    updateContact,
    deleteContact,

    ready,
    toasts,
    notify,

    login,
    register,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return ctx;
}
