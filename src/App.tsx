import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Shifts from "./pages/Shifts";
import Drivers from "./pages/Drivers";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Maps from "./pages/Maps";
import Planning from "./pages/Planning";
import HistoryShifts from "./pages/HistoryShifts";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import Unauthorized from "./pages/Unauthorized";
import Vehicles from "./pages/Vehicles";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/forget-password"
              element={<Navigate to="/login" replace />}
            />
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history-shifts" element={<HistoryShifts />} />
              <Route path="/shifts" element={<Shifts />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/map" element={<Maps />} />
              <Route path="/vehicles" element={<Vehicles />} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
