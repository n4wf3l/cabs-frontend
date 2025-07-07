import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import ThreeBoxes from "@/components/header/ThreeBoxes";

interface SettingsHeaderProps {
  onSaveAll?: () => void; // Gardé pour compatibilité, mais pas utilisé
}

export const SettingsHeader = ({ onSaveAll }: SettingsHeaderProps) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-center md:text-left">
          Paramètres
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
        <ThreeBoxes />
      </div>
    </motion.div>
  );
};

export default SettingsHeader;
