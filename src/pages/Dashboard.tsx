import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Essence from "@/components/dashboard/Essence";
import Graphic from "@/components/dashboard/Graphic";
import InteractiveMap from "@/components/dashboard/InteractiveMap";
import InteractiveResults from "@/components/dashboard/InteractiveResults";
import { Card } from "@/components/ui/card";
import { Users, Car, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Chauffeurs Actifs",
    value: "12",
    icon: Users,
    trend: "+2 cette semaine",
  },
  {
    title: "Véhicules en Route",
    value: "8",
    icon: Car,
    trend: "75% de la flotte",
  },
  {
    title: "Chiffre d'Affaires",
    value: "€2,450",
    icon: TrendingUp,
    trend: "+15% ce mois",
  },
];

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

const generateShiftStartInPast = () => {
  const now = new Date();
  const pastOffset = Math.floor(Math.random() * 3 + 1) * 60 * 60 * 1000; // 1 à 3 heures en arrière
  return new Date(now.getTime() - pastOffset);
};

const activeDrivers = [
  "Ahmed",
  "Youssef",
  "Fatima",
  "Khadija",
  "Mohamed",
  "Omar",
  "Salma",
  "Ibrahim",
  "Sara",
  "Nadia",
  "Hassan",
  "Mounir",
  "Layla",
  "Soufiane",
  "Rachid",
].map((name) => ({
  name,
  shiftStart: generateShiftStartInPast(),
}));

const Dashboard = () => {
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updatedTimes: { [key: string]: number } = {};

      activeDrivers.forEach((driver) => {
        const elapsedSeconds = Math.floor(
          (now.getTime() - driver.shiftStart.getTime()) / 1000
        );
        updatedTimes[driver.name] = elapsedSeconds > 0 ? elapsedSeconds : 0;
      });

      setCurrentTimes(updatedTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const chartData = activeDrivers.map((driver) => {
    const shiftHour = driver.shiftStart.getHours();
    const shiftMinute = driver.shiftStart.getMinutes();
    const shiftTime = shiftHour * 3600 + shiftMinute * 60;
    return {
      name: driver.name,
      shiftStart: shiftTime,
    };
  });

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
                    Début du shift : {driver.shiftStart.toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold text-primary">
                    {formatTime(currentTimes[driver.name] || 0)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Graphic chartData={chartData} />
        <div>
          <h2 className="text-xl font-bold mb-4">
            Suivi des chauffeurs en temps réel
          </h2>
          <InteractiveMap />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
