import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  User,
  Settings,
  Clock,
  Car,
  FileText,
  BarChart2,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { title: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Shifts", icon: Clock, href: "/shifts" },
  { title: "Chauffeurs", icon: User, href: "/drivers" },
  { title: "Planning", icon: Calendar, href: "/planning" },
  { title: "Paramètres", icon: Settings, href: "/settings" },
  { title: "Véhicules (v2)", icon: Car, href: "#", disabled: true },
  {
    title: "Feuilles de route (v2)",
    icon: FileText,
    href: "#",
    disabled: true,
  },
  { title: "Bilan (v3)", icon: BarChart2, href: "#", disabled: true },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Vérifie si l'écran est en mode mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };
    handleResize(); // Check initial
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Charger l'état de la sidebar depuis le localStorage
  useEffect(() => {
    const storedCollapsed = localStorage.getItem("sidebarCollapsed");
    if (storedCollapsed !== null) {
      setCollapsed(JSON.parse(storedCollapsed));
    }
  }, []);

  // Mettre à jour le localStorage lorsque l'état de la sidebar change
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  // Gestion de l'ouverture/fermeture en fonction du device
  const toggleSidebar = () => {
    setCollapsed(!collapsed); // Même comportement pour mobile et desktop
  };

  return (
    <>
      {/* Bouton visible uniquement en mobile pour afficher le sidebar */}
      {isMobile && collapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 md:hidden"
        >
          <Menu size={20} />
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "h-screen fixed left-0 top-0 z-40 flex flex-col glass-card transition-all duration-300",
          isMobile
            ? collapsed
              ? "-translate-x-full md:translate-x-0" // Cacher complètement en mobile
              : "translate-x-0" // Afficher en mobile après clic
            : collapsed
            ? "w-20" // Réduire sur desktop
            : "w-64" // Agrandir sur desktop
        )}
      >
        {/* Logo et bouton alignés sur la même ligne */}
        <div className="bg-background flex items-center justify-between p-4">
          {/* Affichage du logo seulement quand la sidebar est ouverte */}
          {!collapsed && (
            <div className="w-64 h-20 transition-all duration-300">
              <img
                src="/taxitimelogo.png"
                alt="Taxi Time Logo"
                className="object-contain h-full ml-12"
              />
            </div>
          )}

          {/* Bouton pour ouvrir/fermer la sidebar sur mobile et desktop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="z-50"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 bg-background">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.title}>
                  <Link
                    to={item.href}
                    onClick={(e) => item.disabled && e.preventDefault()}
                    className={cn(
                      "flex p-2 hover:bg-secondary/50 rounded-lg transition-colors",
                      collapsed ? "justify-center" : "items-center space-x-2",
                      item.disabled && "opacity-50 cursor-not-allowed",
                      isActive && "bg-primary/20 text-primary"
                    )}
                  >
                    <item.icon
                      size={20}
                      className={isActive ? "text-primary" : ""}
                    />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bouton de déconnexion */}
        <div className="p-4 bg-background">
          <Button
            variant="destructive"
            size="icon"
            className={cn(
              "w-full flex items-center justify-center space-x-2",
              collapsed ? "justify-center" : ""
            )}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {!collapsed && <span>Se déconnecter</span>}
          </Button>
        </div>
      </div>
    </>
  );
};
