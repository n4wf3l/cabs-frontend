import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/auth/LandingPage";
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
import { TopRevealBar } from "./components/TopRevealBar";
import { ThemeProvider } from "./hooks/use-theme";
import { Sidebar } from "./components/Sidebar";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Ajout d'un style global pour supporter la transition responsive de la sidebar
const AppContent = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Initialiser la variable CSS au chargement
    document.documentElement.style.setProperty("--sidebar-width", "16rem");

    // Ajouter un style global pour le contenu principal
    const style = document.createElement("style");
    style.innerHTML = `
      .main-content {
        transition: margin-left 0.3s ease;
        margin-left: 0;
      }
      
      @media (min-width: 768px) {
        .main-content {
          margin-left: var(--sidebar-width, 16rem);
        }
      }
      
      .auth-page .main-content {
        margin-left: 0 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <>{children}</>;
};

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ThemeProvider>
            <div className="app">
              <TopRevealBar />
              <AppContent>
                <Routes>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route
                    path="/login"
                    element={
                      <div className="auth-page">
                        <LandingPage />
                      </div>
                    }
                  />
                  <Route
                    path="/forget-password"
                    element={<Navigate to="/login" replace />}
                  />
                  <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                    <Route
                      path="/dashboard"
                      element={
                        <>
                          <Sidebar />
                          <div className="main-content">
                            <Dashboard />
                          </div>
                        </>
                      }
                    />
                    <Route
                      path="/history-shifts"
                      element={
                        <>
                          <Sidebar />
                          <div className="main-content">
                            <HistoryShifts />
                          </div>
                        </>
                      }
                    />
                    <Route
                      path="/shifts"
                      element={
                        <>
                          <Sidebar />
                          <div className="main-content">
                            <Shifts />
                          </div>
                        </>
                      }
                    />
                    <Route
                      path="/drivers"
                      element={
                        <>
                          <Sidebar />
                          <div className="main-content">
                            <Drivers />
                          </div>
                        </>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <>
                          <Sidebar />
                          <div className="main-content">
                            <Settings />
                          </div>
                        </>
                      }
                    />
                    <Route
                      path="/planning"
                      element={
                        <>
                          <Sidebar />
                          <div className="main-content">
                            <Planning />
                          </div>
                        </>
                      }
                    />
                    <Route
                      path="/map"
                      element={
                        <>
                          <Sidebar />
                          <div className="main-content">
                            <Maps />
                          </div>
                        </>
                      }
                    />
                    <Route
                      path="/vehicles"
                      element={
                        <>
                          <Sidebar />
                          <div className="main-content">
                            <Vehicles />
                          </div>
                        </>
                      }
                    />
                  </Route>
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppContent>
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
