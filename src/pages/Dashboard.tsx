import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Graphic from "@/components/dashboard/Graphic";
import InteractiveMap from "@/components/dashboard/InteractiveMap";
import InteractiveResults from "@/components/dashboard/InteractiveResults";
import { motion } from "framer-motion";

// Fonction pour formater le temps en HH:MM:SS
const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
};

// Fonction pour générer un shift réaliste
const generateShiftStart = (isNightShift: boolean) => {
  let shiftHour, shiftMinute;

  if (isNightShift) {
    shiftHour = Math.floor(Math.random() * 12) + 18; // 18h à 5h59
    if (shiftHour >= 24) shiftHour -= 24;
  } else {
    shiftHour = Math.floor(Math.random() * 12) + 6; // 6h à 17h59
  }

  shiftMinute = Math.floor(Math.random() * 60);

  // Ajouter une variation aléatoire de retard/avance (5 min à 3h)
  const variation = Math.floor(Math.random() * (3 * 3600)) - 1800; // ±30 min
  let adjustedShift = shiftHour * 3600 + shiftMinute * 60 + variation;

  return adjustedShift < 0 ? 0 : adjustedShift;
};

// Génération des chauffeurs avec shifts réalistes
const activeDrivers = [
  { name: "Ahmed", isNightShift: false },
  { name: "Youssef", isNightShift: false },
  { name: "Fatima", isNightShift: false },
  { name: "Khadija", isNightShift: false },
  { name: "Mohamed", isNightShift: false },
  { name: "Omar", isNightShift: false },
  { name: "Salma", isNightShift: false },
  { name: "Ibrahim", isNightShift: false },
  { name: "Sara", isNightShift: false },
  { name: "Nadia", isNightShift: false },
  { name: "Hassan", isNightShift: true },
  { name: "Mounir", isNightShift: true },
  { name: "Layla", isNightShift: true },
  { name: "Soufiane", isNightShift: true },
  { name: "Rachid", isNightShift: true },
].map((driver) => ({
  name: driver.name,
  shiftStart: generateShiftStart(driver.isNightShift),
  isNightShift: driver.isNightShift,
}));

const Dashboard = () => {
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTimeInSeconds =
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      const updatedTimes: { [key: string]: number } = {};

      activeDrivers.forEach((driver) => {
        let elapsedSeconds = currentTimeInSeconds - driver.shiftStart;

        // Si le shift est négatif (shift de nuit après minuit), recalculer
        if (elapsedSeconds < 0) {
          elapsedSeconds += 86400; // Ajouter 24h
        }

        updatedTimes[driver.name] = elapsedSeconds;
      });

      setCurrentTimes(updatedTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Diviser les données en shift de jour et shift de nuit
  const chartDataDay = activeDrivers.filter((d) => !d.isNightShift);
  const chartDataNight = activeDrivers.filter((d) => d.isNightShift);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-center md:text-left">
            Tableau de Bord
          </h1>
          <InteractiveResults />
        </motion.div>

        <hr className="hr-light-effect mb-10" />

        {/* Affichage des chauffeurs avec leur compteur de shift */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeDrivers.map((driver, index) => (
            <motion.div
              key={driver.name}
              className="p-4 glass-card border border-transparent hover:border-white hover:scale-105 transition-all duration-500"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{driver.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Début du shift : {formatTime(driver.shiftStart)}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-xl font-bold ${
                      driver.isNightShift
                        ? "text-purple-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {formatTime(currentTimes[driver.name] || 0)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Affichage des graphiques avec shift jour et nuit */}
        <Graphic chartDataDay={chartDataDay} chartDataNight={chartDataNight} />
      </main>
    </div>
  );
};

export default Dashboard;
