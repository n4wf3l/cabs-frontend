import { useState } from "react";
import { motion } from "framer-motion";
import { DayShift } from "@/components/dashboard/DayShift";
import { NightShift } from "@/components/dashboard/NightShift";
import { DriverTimer } from "@/components/dashboard/DriverTimer";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

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
  const [drivers, setDrivers] = useState(activeDrivers);

  // Fonction pour rafraîchir les données
  const handleRefresh = () => {
    const refreshedDrivers = drivers.map((driver) => ({
      ...driver,
      shiftStart: generateShiftStart(driver.isNightShift),
    }));
    setDrivers(refreshedDrivers);
  };

  // Diviser les données en shift de jour et shift de nuit
  const chartDataDay = drivers.filter((d) => !d.isNightShift);
  const chartDataNight = drivers.filter((d) => d.isNightShift);

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1 p-4 md:p-8">
        {/* Remplacer l'ancien header par le composant DashboardHeader */}
        <DashboardHeader onRefresh={handleRefresh} />

        <hr className="hr-light-effect mb-10" />

        {/* Affichage des chauffeurs avec leur compteur de shift */}
        <DriverTimer drivers={drivers} />

        {/* Affichage des graphiques avec shift jour et nuit */}
        <div className="mt-10 space-y-10">
          <DayShift chartData={chartDataDay} />
          <NightShift chartData={chartDataNight} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
