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
  { title: "Bilan de caisse", icon: BarChart2, href: "/cash-report" },
  { title: "Planning", icon: Calendar, href: "/planning" },
  { title: "Paramètres", icon: Settings, href: "/settings" },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <>
      <div
        onMouseEnter={() => {
          if (!isMobile && collapsed) setCollapsed(false);
        }}
        onMouseLeave={() => {
          if (!isMobile && !collapsed) setCollapsed(true);
        }}
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
        <div className="bg-background relative h-[76px] flex items-center justify-center px-4">
          <div className={cn(
            "flex items-center gap-2 transition-all duration-300",
            collapsed ? "justify-center" : "justify-start w-full"
          )}>
            <div className={cn(
              "flex-shrink-0 transition-all duration-300",
              collapsed ? "h-10 w-10" : "h-12 w-12"
            )}>
              <img
                src="/tlogo.png"
                alt="Cabs Logo"
                className="object-contain h-full"
              />
            </div>
            <div className={cn(
              "flex flex-col overflow-hidden transition-all duration-300",
              collapsed ? "w-0" : "w-auto"
            )}>
              <span className="font-semibold text-lg whitespace-nowrap">YourCompany</span>
              <span className="text-xs text-gray-400 whitespace-nowrap">Fleet Management</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 bg-background">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.title} className="relative group">
                  <button
                    onClick={() =>
                      !item.disabled && handleNavigation(item.href)
                    }
                    className={cn(
                      "w-full h-10 flex items-center p-2 hover:bg-secondary/50 rounded-lg transition-all duration-300 text-left relative",
                      item.disabled && "opacity-50 cursor-not-allowed",
                      isActive && "bg-primary/20 text-primary"
                    )}
                  >
                    <div className="flex items-center w-full">
                      <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                        <item.icon
                          size={20}
                          className={isActive ? "text-primary" : ""}
                        />
                      </div>
                      <div className={cn(
                        "overflow-hidden transition-all duration-300",
                        collapsed ? "w-0 opacity-0" : "w-auto ml-2 opacity-100"
                      )}>
                        <span className="whitespace-nowrap">{item.title}</span>
                      </div>
                    </div>
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
                "w-full flex items-center justify-center gap-2",
                collapsed ? "justify-center" : ""
              )}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              <LogOut size={20} />
              <div className={cn(
                "overflow-hidden transition-all duration-300",
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              )}>
                <span className="whitespace-nowrap">Se déconnecter</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
