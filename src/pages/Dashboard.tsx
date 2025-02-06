import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Users, Car, TrendingUp, Menu } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { motion } from "framer-motion"; // 👉 Import de Framer Motion

// Données des 15 chauffeurs jusqu'à jeudi
const driverWorkHours = [
  {
    day: "Lundi",
    Ahmed: 28800,
    Youssef: 27000,
    Fatima: 21600,
    Khadija: 25200,
    Mohamed: 23400,
  },
  {
    day: "Mardi",
    Ahmed: 32400,
    Youssef: 28800,
    Fatima: 25200,
    Khadija: 27000,
    Mohamed: 25200,
  },
  {
    day: "Mercredi",
    Ahmed: 27000,
    Youssef: 25200,
    Fatima: 28800,
    Khadija: 24300,
    Mohamed: 22500,
  },
  {
    day: "Jeudi",
    Ahmed: 28800,
    Youssef: 32400,
    Fatima: 27000,
    Khadija: 25200,
    Mohamed: 27000,
  },
];

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

// Fonction pour formater les secondes en HH:MM:SS
const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
};

// Génération des heures de début de shift aléatoires entre 00:00:00 et 12:00:00
const generateRandomShiftStart = () => {
  const randomSeconds = Math.floor(Math.random() * 43200); // 43200 secondes = 12 heures
  const now = new Date();
  return new Date(now.getTime() - randomSeconds * 1000); // Génère un shift dans les 12 dernières heures
};

// Liste des chauffeurs actifs avec leurs heures de début de shift
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
  shiftStart: generateRandomShiftStart(),
}));

const Dashboard = () => {
  const [currentTimes, setCurrentTimes] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mettre à jour le compteur chaque seconde
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updatedTimes = {};

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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar responsive */}
      <div
        className={`fixed z-50 md:relative md:translate-x-0 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <main className="flex-1 p-4 md:p-8 md:ml-64">
        {/* Titre centré en mobile */}
        <motion.h1
          className="text-2xl font-bold mb-8 text-center md:text-left mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tableau de Bord
        </motion.h1>

        <hr className="hr-light-effect mb-10" />

        {/* Statistiques Globales avec animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="p-4 glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.trend}
                  </p>
                </div>
                <stat.icon className="text-primary" size={24} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chauffeurs Actuellement en Cours de Shift avec animations */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeDrivers.map((driver, index) => (
            <motion.div
              key={driver.name}
              className="p-4 glass-card"
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
      </main>
    </div>
  );
};

export default Dashboard;
