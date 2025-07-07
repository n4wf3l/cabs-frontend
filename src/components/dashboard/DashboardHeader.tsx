import { motion } from "framer-motion";
import ThreeBoxes from "@/components/header/ThreeBoxes";

interface DashboardHeaderProps {
  onRefresh?: () => void; // Gardé pour compatibilité, mais pas utilisé
}

export const DashboardHeader = ({ onRefresh }: DashboardHeaderProps) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold text-center md:text-left">
        Tableau de Bord
      </h1>

      <div className="flex flex-col md:flex-row items-center">
        <ThreeBoxes />
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
