import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BellIcon, SunIcon, MoonIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";
import { Badge } from "@/components/ui/badge";

export const TopRevealBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  // Notifications factices
  const [notifications] = useState([
    {
      id: 1,
      title: "Nouveau chauffeur",
      message: "Ali Baba vient de s'inscrire",
    },
    {
      id: 2,
      title: "Véhicule en maintenance",
      message: "La voiture AB-123-CD est désormais en maintenance",
    },
  ]);

  // Basculer l'ouverture/fermeture au clic
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Fermer la barre en cliquant ailleurs sur la page
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        barRef.current &&
        buttonRef.current &&
        !barRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Basculer le thème
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      {/* Bouton déclencheur fixe - maintenant avec onClick au lieu de onMouseEnter */}
      <Button
        ref={buttonRef}
        className="fixed top-3 right-3 z-50 rounded-full h-10 w-10 p-0 bg-gray-800/80 backdrop-blur hover:bg-gray-700 shadow-md"
        onClick={handleToggle}
        variant="outline"
        size="icon"
      >
        <BellIcon size={20} className="text-white" />
        {notifications.length > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-yellow-500 text-black text-xs">
            {notifications.length}
          </Badge>
        )}
      </Button>

      {/* Barre révélable - sans les gestionnaires de survol */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={barRef}
            className="fixed top-0 right-0 left-0 z-40 bg-gray-900/95 backdrop-blur shadow-lg border-b border-gray-800"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Le reste du contenu reste inchangé */}
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BellIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <h2 className="text-sm font-medium text-white">
                    Notifications
                  </h2>
                  <Badge
                    variant="outline"
                    className="ml-2 bg-yellow-600/20 text-yellow-400 border-yellow-500/30"
                  >
                    {notifications.length} nouvelles
                  </Badge>
                </div>

                <div className="flex items-center space-x-6">
                  {/* Toggle mode jour/nuit */}
                  <div className="flex items-center space-x-2">
                    <SunIcon
                      className={`h-4 w-4 ${
                        !isDark ? "text-yellow-400" : "text-gray-500"
                      }`}
                    />
                    <Switch
                      checked={isDark}
                      onCheckedChange={toggleTheme}
                      className="data-[state=checked]:bg-gray-700"
                    />
                    <MoonIcon
                      className={`h-4 w-4 ${
                        isDark ? "text-blue-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Liste des notifications */}
              <div className="mt-3 space-y-2">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/70 rounded-md p-3 hover:bg-gray-800 cursor-pointer"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-white">
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-400">à l'instant</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.message}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Option pour voir toutes les notifications */}
              <Button
                variant="link"
                className="text-xs text-yellow-500 hover:text-yellow-400 mt-3 px-0"
              >
                Voir toutes les notifications
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopRevealBar;
