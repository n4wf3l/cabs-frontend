import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

interface GraphicProps {
  chartDataDay: { name: string; shiftStart: number; isNightShift: boolean }[];
  chartDataNight: { name: string; shiftStart: number; isNightShift: boolean }[];
}

// Fonction pour formater le temps en HH:mm
const formatShiftTime = (seconds: number) => {
  let hours = Math.floor(seconds / 3600) % 24; // Rester entre 0 et 23h
  let minutes = Math.floor((seconds % 3600) / 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

// Correction des shifts de nuit : on ajoute 86400s (24h) aux shifts après minuit
const convertedNightShifts = (shifts: GraphicProps["chartDataNight"]) =>
  shifts.map((driver) => ({
    ...driver,
    shiftStart:
      driver.shiftStart < 21600 ? driver.shiftStart + 86400 : driver.shiftStart,
  }));

const Graphic: React.FC<GraphicProps> = ({ chartDataDay, chartDataNight }) => {
  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Graphique des shifts de jour */}
      <h2 className="text-xl font-bold mb-4 text-yellow-500">
        Horaires shifts en journée
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartDataDay}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            type="number"
            domain={[21600, 64800]} // Échelle 06:00 - 18:00
            tickFormatter={formatShiftTime}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div
                    style={{
                      background: "rgba(0, 0, 0, 0.8)",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "5px",
                        color: "#D4AF37", // Jaune foncé
                      }}
                    >
                      🏷 {data.name}
                    </div>
                    <div style={{ color: "#D4AF37", fontSize: "16px" }}>
                      🕒 Début : {formatShiftTime(data.shiftStart)}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend formatter={() => "Shifts de jour"} />
          <Line
            type="monotone"
            dataKey="shiftStart"
            stroke="#D4AF37"
            strokeWidth={3}
            name="Début de shift (Jour)"
          />
          <ReferenceLine
            y={21600} // 6:00
            stroke="yellow"
            strokeWidth={2}
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={64800} // 18:00
            stroke="purple"
            strokeWidth={2}
            strokeDasharray="3 3"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Graphique des shifts de nuit */}
      <h2 className="text-xl font-bold mb-4 text-purple-500">
        Horaires shifts de nuit
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={convertedNightShifts(chartDataNight)}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            type="number"
            domain={[64800, 108000]} // Échelle 18:00 - 06:00 (en décalé pour éviter 27:00)
            tickFormatter={formatShiftTime}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div
                    style={{
                      background: "rgba(0, 0, 0, 0.8)",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "5px",
                        color: "#800080", // Mauve
                      }}
                    >
                      🏷 {data.name}
                    </div>
                    <div style={{ color: "#800080", fontSize: "16px" }}>
                      🕒 Début : {formatShiftTime(data.shiftStart)}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend formatter={() => "Shifts de nuit"} />
          <Line
            type="monotone"
            dataKey="shiftStart"
            stroke="#800080"
            strokeWidth={3}
            name="Début de shift (Nuit)"
          />
          <ReferenceLine
            y={64800} // 18:00
            stroke="purple"
            strokeWidth={2}
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={108000} // 6:00 (ajouté 24h pour les shifts de nuit après minuit)
            stroke="yellow"
            strokeWidth={2}
            strokeDasharray="3 3"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default Graphic;
