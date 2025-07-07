import React from "react";
import { motion } from "framer-motion";
import { Users, Car, TrendingUp } from "lucide-react";

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

const InteractiveResults: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          className="p-4 glass-card border border-transparent hover:border-white hover:scale-105 transition-all duration-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              <p className="text-sm text-muted-foreground mt-1">{stat.trend}</p>
            </div>
            <stat.icon className="text-primary" size={24} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default InteractiveResults;
