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
  chartData: { name: string; shiftStart: number }[];
}

const Graphic: React.FC<GraphicProps> = ({ chartData }) => {
  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
            domain={[0, 86400]}
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
          <Line type="monotone" dataKey="shiftStart" stroke="#4A90E2" />
          <ReferenceLine
            y={21600}
            stroke="blue"
            strokeWidth={2}
            strokeDasharray="0"
            label={{ value: "6:00", position: "right", fill: "blue" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default Graphic;
