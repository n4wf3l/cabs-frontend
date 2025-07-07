import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Driver {
  name: string;
  shiftStart: number;
  isNightShift: boolean;
}

interface DriverTimerProps {
  drivers: Driver[];
}

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

export const DriverTimer: React.FC<DriverTimerProps> = ({ drivers }) => {
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTimeInSeconds =
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      const updatedTimes: { [key: string]: number } = {};

      drivers.forEach((driver) => {
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
  }, [drivers]);

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {drivers.map((driver, index) => (
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
                  driver.isNightShift ? "text-purple-500" : "text-yellow-500"
                }`}
              >
                {formatTime(currentTimes[driver.name] || 0)}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DriverTimer;
