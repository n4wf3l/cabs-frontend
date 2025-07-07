import { motion } from "framer-motion";

export function PlanningHeader({ weekStart, weekEnd }) {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold text-center md:text-left">Planning</h1>
    </motion.div>
  );
}
