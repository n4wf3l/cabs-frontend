import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  Map,
} from "lucide-react";

// Modifie la constante menuItems pour respecter le nouvel ordre
const menuItems = [
  { title: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Véhicules", icon: Car, href: "/vehicles" },
  { title: "Chauffeurs", icon: User, href: "/drivers" },
  { title: "Shifts", icon: Clock, href: "/shifts" },
  {
    title: "Feuilles de route (v2)",
    icon: FileText,
    href: "#",
    disabled: true,
  },
  { title: "Map", icon: Map, href: "/map" },
  { title: "Bilan (v3)", icon: BarChart2, href: "#", disabled: true },
  { title: "Planning", icon: Calendar, href: "/planning" },
  { title: "Paramètres", icon: Settings, href: "/settings" },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const storedState = localStorage.getItem("sidebarCollapsed");
    return storedState ? JSON.parse(storedState) : false;
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpening, setIsOpening] = useState(false); // Détection de l'ouverture manuelle
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));

    // Mettre à jour la variable CSS en fonction de l'état actuel
    document.documentElement.style.setProperty(
      "--sidebar-width",
      collapsed ? "5rem" : "16rem"
    );

    // Forcer une relecture des styles si nécessaire
    document.body.style.marginLeft = "0";
    setTimeout(() => {
      document.body.style.marginLeft = "";
    }, 0);
  }, [collapsed]);

  const toggleSidebar = () => {
    if (collapsed) {
      setIsOpening(true); // Animation activée uniquement lors d'une ouverture
    }
    setCollapsed((prev) => !prev);
  };

  const handleNavigation = (href: string) => {
    if (collapsed) {
      setCollapsed(true);
    }
    navigate(href);
  };

  return (
    <>
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

      <div
        className={cn(
          "h-screen fixed left-0 top-0 z-40 flex flex-col glass-card transition-all duration-300",
          isMobile
            ? collapsed
              ? "-translate-x-full md:translate-x-0"
              : "translate-x-0"
            : collapsed
            ? "w-20"
            : "w-64"
        )}
      >
        <div className="bg-background flex items-center justify-between p-4">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              {/* Logo rétréci */}
              <div className="h-12 w-12 flex-shrink-0">
                <img
                  src="/tlogo.png"
                  alt="Cabs Logo"
                  className="object-contain h-full"
                />
              </div>

              {/* Nom de l'entreprise */}
              <div className="flex flex-col">
                <span className="font-semibold text-lg">YourCompany</span>
                <span className="text-xs text-gray-400">Fleet Management</span>
              </div>
            </div>
          ) : (
            // Ne rien afficher quand la sidebar est réduite
            <div></div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="z-50"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </Button>
        </div>

        <nav className="flex-1 p-4 bg-background">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return isOpening && !collapsed ? ( // Appliquer l'animation uniquement lors de l'ouverture
                <motion.li
                  key={item.title}
                  className="relative group"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    onClick={() =>
                      !item.disabled && handleNavigation(item.href)
                    }
                    className={cn(
                      "w-full flex p-2 hover:bg-secondary/50 rounded-lg transition-colors text-left relative",
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
                    {collapsed && (
                      <span className="absolute left-full ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {item.title}
                      </span>
                    )}
                  </button>
                </motion.li>
              ) : (
                <li key={item.title} className="relative group">
                  <button
                    onClick={() =>
                      !item.disabled && handleNavigation(item.href)
                    }
                    className={cn(
                      "w-full flex p-2 hover:bg-secondary/50 rounded-lg transition-colors text-left relative",
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
                    {collapsed && (
                      <span className="absolute left-full ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {item.title}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 bg-background">
          <div className="relative group">
            <Button
              variant="destructive"
              size="icon"
              className={cn(
                "w-full flex items-center justify-center space-x-2",
                collapsed ? "justify-center" : ""
              )}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              <LogOut size={20} />
              {!collapsed && <span>Se déconnecter</span>}
              {collapsed && (
                <span className="absolute left-full ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Se déconnecter
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
