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
import CashReport from "./pages/CashReport";
import RouteSheet from "./pages/RouteSheet";

const queryClient = new QueryClient();

// Composant pour gérer le comportement responsive de la sidebar
const AppContent = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Récupérer l'état de la sidebar depuis le localStorage au chargement
    const sidebarMode = localStorage.getItem("sidebarMode") || "hover";
    const isExpanded = sidebarMode === "expanded";
    
    // Fonction pour configurer correctement l'état du sidebar et les styles associés
    const configureSidebarState = () => {
      // Gérer les classes CSS sur le body
      if (isExpanded) {
        document.body.classList.add("sidebar-expanded");
        document.body.classList.remove("sidebar-collapsed");
      } else {
        document.body.classList.add("sidebar-collapsed");
        document.body.classList.remove("sidebar-expanded");
      }

      // Mettre à jour la variable CSS pour la largeur du sidebar
      document.documentElement.style.setProperty(
        "--sidebar-width",
        isExpanded ? "16rem" : "5rem"
      );
      
      // Forcer un re-rendu du layout si nécessaire
      window.dispatchEvent(new Event('resize'));
    };
    
    // Configuration initiale au chargement
    configureSidebarState();
    
    // Écouter les changements de mode de la sidebar dans le localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sidebarMode') {
        const newMode = e.newValue || 'hover';
        const isNowExpanded = newMode === 'expanded';
        
        if (isNowExpanded) {
          document.body.classList.add("sidebar-expanded");
          document.body.classList.remove("sidebar-collapsed");
        } else {
          document.body.classList.add("sidebar-collapsed");
          document.body.classList.remove("sidebar-expanded");
        }
        
        document.documentElement.style.setProperty(
          "--sidebar-width",
          isNowExpanded ? "16rem" : "5rem"
        );
      }
    };
    
    // Ajouter l'écouteur d'événement pour les changements de localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Appliquer la configuration immédiatement, puis à nouveau après un court délai
    // pour s'assurer que le DOM est bien chargé et que les styles sont appliqués
    configureSidebarState();
    setTimeout(configureSidebarState, 100);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return <>{children}</>;
};

// Composant qui encapsule les pages protégées avec la sidebar
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Synchroniser l'état du sidebar au chargement initial
    const sidebarMode = localStorage.getItem("sidebarMode") || "hover";
    const isExpanded = sidebarMode === "expanded";
    
    if (isExpanded) {
      document.body.classList.add("sidebar-expanded");
      document.body.classList.remove("sidebar-collapsed");
    } else {
      document.body.classList.add("sidebar-collapsed");
      document.body.classList.remove("sidebar-expanded");
    }
    
    // Forcer une mise à jour du layout après le montage
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }, []);

  return (
    <>
      <Sidebar />
      <div className="main-content overflow-auto">{children}</div>
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
              <Route
                path="/cash-report"
                element={
                  <ProtectedLayout>
                    <CashReport />
                  </ProtectedLayout>
                }
              />
              <Route
                path="/route-sheet"
                element={
                  <ProtectedLayout>
                    <RouteSheet />
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
