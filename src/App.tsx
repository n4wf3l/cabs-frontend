import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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
    // Récupérer l'état de la sidebar depuis le localStorage AVANT de définir la variable CSS
    const sidebarCollapsed = localStorage.getItem("sidebarCollapsed");
    const isCollapsed = sidebarCollapsed ? JSON.parse(sidebarCollapsed) : false;

    // Initialiser la variable CSS avec la bonne valeur en fonction de l'état sauvegardé
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isCollapsed ? "5rem" : "16rem"
    );

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

// Composant qui encapsule les pages protégées avec la sidebar
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <div className="main-content">{children}</div>
    </>
  );
};

// Composant pour conditionner l'affichage du TopRevealBar
const ConditionalTopRevealBar = () => {
  const location = useLocation();
  const authPaths = ["/login", "/forget-password", "/"]; // Chemins où le TopRevealBar ne doit pas s'afficher

  if (authPaths.includes(location.pathname)) {
    return null;
  }

  return <TopRevealBar />;
};

// Wrapper pour le BrowserRouter afin d'utiliser useLocation
const AppWithRouter = () => {
  return (
    <BrowserRouter>
      <AppWithTopRevealBar />
    </BrowserRouter>
  );
};

// Composant principal avec vérification conditionnelle du TopRevealBar
const AppWithTopRevealBar = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <ConditionalTopRevealBar />
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
                  <ProtectedLayout>
                    <Dashboard />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/history-shifts"
                element={
                  <ProtectedLayout>
                    <HistoryShifts />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/shifts"
                element={
                  <ProtectedLayout>
                    <Shifts />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/drivers"
                element={
                  <ProtectedLayout>
                    <Drivers />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedLayout>
                    <Settings />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/planning"
                element={
                  <ProtectedLayout>
                    <Planning />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/map"
                element={
                  <ProtectedLayout>
                    <Maps />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/vehicles"
                element={
                  <ProtectedLayout>
                    <Vehicles />
                  </ProtectedLayout>
                }
              />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppContent>
      </div>
    </ThemeProvider>
  );
};

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppWithRouter />
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
