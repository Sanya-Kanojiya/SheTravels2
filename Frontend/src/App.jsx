import { AppProvider } from "./context/AppContext";
import AppRoutes from "./routes/AppRoutes";
import Toast from "./components/Toast";

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
      <Toast />
    </AppProvider>
  );
}
