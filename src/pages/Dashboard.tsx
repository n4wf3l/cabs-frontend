import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Essence from "@/components/dashboard/Essence";
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

const generateShiftStartBetween5And8 = () => {
  const minSeconds = 18000; // 05:00:00
  const maxSeconds = 28800; // 08:00:00
  const randomSeconds =
    Math.floor(Math.random() * (maxSeconds - minSeconds)) + minSeconds;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return new Date(now.getTime() + randomSeconds * 1000);
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
  shiftStart: generateShiftStartBetween5And8(),
}));

const Dashboard = () => {
  const [currentTimes, setCurrentTimes] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <div
        className={`fixed z-50 md:relative md:translate-x-0 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

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
          <Essence />
        </motion.div>

        <hr className="hr-light-effect mb-10" />

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

        {/* Graphique des horaires de shift */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Horaires de début de shift</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                type="number"
                domain={[18000, 28800]}
                tickFormatter={(tick) => {
                  const hours = Math.floor(tick / 3600)
                    .toString()
                    .padStart(2, "0");
                  const minutes = Math.floor((tick % 3600) / 60)
                    .toString()
                    .padStart(2, "0");
                  return `${hours}:${minutes}`;
                }}
              />
              <Tooltip
                formatter={(value) => {
                  if (typeof value === "number") {
                    const hours = Math.floor(value / 3600)
                      .toString()
                      .padStart(2, "0");
                    const minutes = Math.floor((value % 3600) / 60)
                      .toString()
                      .padStart(2, "0");
                    return `${hours}:${minutes}`;
                  }
                  return "Pas commencé";
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="shiftStart" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
