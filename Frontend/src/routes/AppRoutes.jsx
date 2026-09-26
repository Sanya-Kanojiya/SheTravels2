import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";
import { RequireAuth } from "./guards";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import TripsPage from "../pages/TripsPage";
import CreateTripPage from "../pages/CreateTripPage";
import TripDetailsPage from "../pages/TripDetailsPage";
import AiPlannerPage from "../pages/AiPlannerPage";
import SafetyPage from "../pages/SafetyPage";
import EmergencyContactsPage from "../pages/EmergencyContactsPage";
import PackingPage from "../pages/PackingPage";
import CommunityPage from "../pages/CommunityPage";
import MemoriesPage from "../pages/MemoriesPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminReportsPage from "../pages/admin/AdminReportsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/trips" element={<TripsPage />} />
            <Route path="/trips/create" element={<CreateTripPage />} />
            <Route path="/trips/:id" element={<TripDetailsPage />} />
            <Route path="/ai-planner" element={<AiPlannerPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/emergency-contacts" element={<EmergencyContactsPage />} />
            <Route path="/packing" element={<PackingPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/memories" element={<MemoriesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route element={<RequireAuth role="admin" />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/reports" element={<AdminReportsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
