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
  ChevronRight,
  ChevronLeft,
  PanelLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Home, Car as LucideCar, Users } from "lucide-react"; // exemple d'icônes
import React from "react";

// Types de mode pour le sidebar
type SidebarMode = "expanded" | "collapsed" | "hover";

// Modifie la constante menuItems pour respecter le nouvel ordre
interface MenuItem {
  title: string;
  icon: React.ComponentType;
  href: string;
  disabled?: boolean;
}

const menuItems: MenuItem[] = [
  { title: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Véhicules", icon: LucideCar, href: "/vehicles" },
  { title: "Chauffeurs", icon: User, href: "/drivers" },
  { title: "Shifts", icon: Clock, href: "/shifts" },
  {
    title: "Feuilles de route",
    icon: FileText,
    href: "/route-sheet",
  },
  { title: "Map", icon: Map, href: "/map" },
  { title: "Bilan de caisse", icon: BarChart2, href: "/cash-report" },
  { title: "Planning", icon: Calendar, href: "/planning" },
  { title: "Paramètres", icon: Settings, href: "/settings" },
];

export const Sidebar = () => {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(() => {
    // Récupérer la préférence de l'utilisateur depuis localStorage
    const savedMode = localStorage.getItem("sidebarMode") as SidebarMode;
    return savedMode || "hover"; // Par défaut: hover
  });
  const [collapsed, setCollapsed] = useState(sidebarMode === "collapsed" || sidebarMode === "hover");
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
    const newWidth = collapsed ? "5rem" : "16rem";
    document.documentElement.style.setProperty("--sidebar-width", newWidth);

    // Appliquer une classe au body pour ajuster le layout en fonction de l'état du sidebar
    if (collapsed) {
      document.body.classList.add("sidebar-collapsed");
      document.body.classList.remove("sidebar-expanded");
    } else {
      document.body.classList.add("sidebar-expanded");
      document.body.classList.remove("sidebar-collapsed");
    }

    // Notifier les autres composants du changement via un événement personnalisé
    const event = new CustomEvent("sidebarStateChange", { 
      detail: { collapsed, width: newWidth } 
    });
    window.dispatchEvent(event);
    
    // Forcer le redimensionnement des composants qui pourraient en dépendre
    window.dispatchEvent(new Event('resize'));
    
    // Permettre au CSS de s'appliquer correctement
    requestAnimationFrame(() => {
      const currentMarginLeft = document.body.style.marginLeft;
      document.body.style.marginLeft = "0";
      requestAnimationFrame(() => {
        document.body.style.marginLeft = currentMarginLeft;
      });
    });
  }, [collapsed]);

  // Mettre à jour le comportement en fonction du mode
  useEffect(() => {
    if (sidebarMode === "expanded") {
      setCollapsed(false);
    } else if (sidebarMode === "collapsed") {
      setCollapsed(true);
    } else {
      // Mode hover par défaut
      setCollapsed(true);
    }
    // Sauvegarder la préférence
    localStorage.setItem("sidebarMode", sidebarMode);
  }, [sidebarMode]);
  
  // Effet d'initialisation pour s'assurer que le layout est correctement configuré au chargement de la page
  useEffect(() => {
    // Appliquer immédiatement la bonne classe pour éviter le "flash" de mauvais layout au chargement
    if (sidebarMode === "expanded") {
      document.body.classList.add("sidebar-expanded");
      document.body.classList.remove("sidebar-collapsed");
    } else {
      document.body.classList.add("sidebar-collapsed");
      document.body.classList.remove("sidebar-expanded");
    }
    
    // Ajuster le layout du contenu principal
    document.documentElement.style.setProperty(
      "--sidebar-width",
      sidebarMode === "expanded" ? "16rem" : "5rem"
    );
  }, []);

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const handleMouseEnter = () => {
    if (!isMobile && sidebarMode === "hover") {
      setCollapsed(false);
      // Assurer que les classes sont appliquées de manière cohérente
      document.body.classList.add("sidebar-expanded");
      document.body.classList.remove("sidebar-collapsed");
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && sidebarMode === "hover") {
      setCollapsed(true);
      // Assurer que les classes sont appliquées de manière cohérente
      document.body.classList.add("sidebar-collapsed");
      document.body.classList.remove("sidebar-expanded");
    }
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "h-screen fixed left-0 top-0 z-40 flex flex-col glass-card transition-all duration-300 border-r-0",
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
          <TooltipProvider key={collapsed ? "collapsed" : "expanded"}>
            <ul className="flex flex-col gap-2 mt-4">
              {menuItems.map((item, idx) => (
                <li key={item.title}>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() =>
                          !item.disabled && handleNavigation(item.href)
                        }
                        className={cn(
                          "flex items-center w-full px-3 py-2 rounded hover:bg-muted transition-colors",
                          collapsed ? "justify-center" : ""
                        )}
                        aria-label={item.title}
                      >
                        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                          {React.createElement(
                            item.icon as React.ComponentType<{ className?: string }>,
                            {
                              className: cn(
                                "w-5 h-5", // Tailwind size for 20px
                                location.pathname === item.href ? "text-primary" : ""
                            ),
                            }
                          )}
                        </div>
                        {!collapsed && <span className="ml-3 text-sm">{item.title}</span>}
                      </button>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" align="center" className="text-sm">
                        {item.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </li>
              ))}
            </ul>
          </TooltipProvider>
        </nav>

        <div className="p-4 bg-background space-y-2">
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
          
          {/* Contrôleur de Sidebar */}
          <div className="relative group mt-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <PanelLeft size={16} />
                  <span className={cn(
                    "overflow-hidden transition-all duration-300",
                    collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                  )}>
                    Sidebar control
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuRadioGroup value={sidebarMode} onValueChange={(value) => setSidebarMode(value as SidebarMode)}>
                  <DropdownMenuRadioItem value="expanded" className="flex items-center gap-2">
                    <ChevronRight size={14} className="mr-1" />
                    Expanded
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="collapsed" className="flex items-center gap-2">
                    <ChevronLeft size={14} className="mr-1" />
                    Collapsed
                  </DropdownMenuRadioItem>
                  <Separator className="my-1" />
                  <DropdownMenuRadioItem value="hover" className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary mr-1.5" />
                    Expand on hover
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

// SidebarItem.tsx
// import React from "react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  onClick?: () => void;
  active?: boolean;
}

export function SidebarItem({ icon: Icon, label, isCollapsed, onClick, active }: SidebarItemProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={onClick}
            className={cn(
              "sidebar-btn flex items-center w-10 h-10 justify-center rounded transition-colors",
              active && "bg-primary/10 text-primary"
            )}
            aria-label={label}
          >
            <Icon className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3 text-sm">{label}</span>}
          </button>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right" align="center" className="text-sm">
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
