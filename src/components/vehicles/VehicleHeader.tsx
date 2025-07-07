import React from "react";
import { Car, Plus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface VehicleHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
  onFilterClick?: () => void;
}

export const VehicleHeader: React.FC<VehicleHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onAddClick,
  onFilterClick,
}) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Car className="text-blue-400" /> Gestion des Véhicules
      </h1>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher..."
            className="pl-9 bg-gray-900 border-gray-700"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onFilterClick}
        >
          <Filter size={16} /> Filtres
        </Button>

        <Button className="flex items-center gap-2" onClick={onAddClick}>
          <Plus size={16} /> Nouveau Véhicule
        </Button>
      </div>
    </motion.div>
  );
};

export default VehicleHeader;
