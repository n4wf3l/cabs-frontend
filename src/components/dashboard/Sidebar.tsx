import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Shifts",
    icon: Calendar,
    href: "/shifts",
  },
  {
    title: "Chauffeurs",
    icon: Users,
    href: "/drivers",
  },
  {
    title: "Paramètres",
    icon: Settings,
    href: "/settings",
  },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out",
          "w-64 -translate-x-full md:translate-x-0", // Mobile: hidden by default, Desktop: always visible
          "md:w-20 lg:w-64", // Desktop: collapsed/expanded states
          mobileOpen && "translate-x-0", // Mobile: show when mobileOpen is true
          "glass-card"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <h1
            className={cn(
              "text-xl font-bold transition-opacity duration-200",
              ((collapsed && !mobileOpen) || (!mobileOpen && window.innerWidth >= 768 && window.innerWidth < 1024)) && "hidden lg:block"
            )}
          >
            Taxi Time
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (window.innerWidth < 768) {
                setMobileOpen(!mobileOpen);
              } else {
                setCollapsed(!collapsed);
              }
            }}
            className="ml-auto"
          >
            {mobileOpen || !collapsed ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => window.innerWidth < 768 && setMobileOpen(false)}
                  className={cn(
                    "flex items-center space-x-2 p-2 hover:bg-secondary/50 rounded-lg transition-colors",
                    ((collapsed && !mobileOpen) || (!mobileOpen && window.innerWidth >= 768 && window.innerWidth < 1024)) && "lg:justify-center lg:space-x-0"
                  )}
                >
                  <item.icon size={20} />
                  <span
                    className={cn(
                      "transition-opacity duration-200",
                      ((collapsed && !mobileOpen) || (!mobileOpen && window.innerWidth >= 768 && window.innerWidth < 1024)) && "hidden lg:block"
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        <Menu size={20} />
      </Button>
    </>
  );
};