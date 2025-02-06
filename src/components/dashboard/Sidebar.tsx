import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  User,
  Settings,
  Clock,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { title: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Shifts", icon: Clock, href: "/shifts" },
  { title: "Chauffeurs", icon: User, href: "/drivers" },
  { title: "Planning", icon: Calendar, href: "/planning" },
  { title: "Paramètres", icon: Settings, href: "/settings" },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Vérifie si l'écran est en mode mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };
    handleResize(); // Check initial
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <div className="w-32 h-10 transition-all duration-300">
              <img
                src="/taxitimelogo.png"
                alt="Taxi Time Logo"
                className="object-contain h-full"
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
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex p-2 hover:bg-secondary/50 rounded-lg transition-colors",
                    collapsed ? "justify-center" : "items-center space-x-2"
                  )}
                >
                  <item.icon size={20} />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
