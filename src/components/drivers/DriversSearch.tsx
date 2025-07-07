import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface DriversSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const DriversSearch = ({ value, onChange }: DriversSearchProps) => {
  return (
    <motion.div
      className="flex items-center relative mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Rechercher un chauffeur..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-gray-900 border-gray-700 focus:border-blue-500 rounded-lg"
      />
    </motion.div>
  );
};
