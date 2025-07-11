import React from "react";
import { Car, Wrench, MoreVertical, Check, Hammer, Trash2 } from "lucide-react";
import { VehicleDTO } from "@/api/vehicle";
import LegendVehicle from "./LegendVehicle";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface VehicleIndexProps {
  vehicles: VehicleDTO[];
  statusCounts: Record<string, number>;
  activeFilter: string;
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
  filteredVehicles: VehicleDTO[];
  handleViewVehicle: (vehicle: VehicleDTO) => void;
  setSelectedVehicle: (vehicle: VehicleDTO) => void; // AJOUTE
  setIsDeleteDialogOpen: (open: boolean) => void;    // AJOUTE
}

export const VehicleIndex: React.FC<VehicleIndexProps> = ({
  vehicles,
  statusCounts,
  activeFilter,
  setActiveFilter,
  filteredVehicles,
  handleViewVehicle,
  setSelectedVehicle,
  setIsDeleteDialogOpen,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-6"
    >
      {/* Statistiques */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1a1f2c] rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Véhicules</p>
            <p className="text-xl font-semibold text-white">{vehicles.length}</p>
          </div>
          <Car className="text-blue-400" />
        </div>
        <div className="bg-[#1a1f2c] rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">En service</p>
            <p className="text-xl font-semibold text-white">
              {vehicles.filter(
                (v) => v.available && v.condition === "GOOD"
              ).length}
            </p>
          </div>
          <div className="text-green-400">
            <Car className="h-5 w-5" />
          </div>
        </div>
        <div className="bg-[#1a1f2c] rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">En maintenance</p>
            <p className="text-xl font-semibold text-white">
              {vehicles.filter((v) => v.condition === "MAINTENANCE").length}
            </p>
          </div>
          <Wrench className="text-yellow-400 h-5 w-5" />
        </div>
        <div className="bg-[#1a1f2c] rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">En réparation</p>
            <p className="text-xl font-semibold text-white">
              {vehicles.filter((v) => v.condition === "REPAIR").length}
            </p>
          </div>
          <Wrench className="text-red-400 h-5 w-5" />
        </div>
      </div>

      {/* Filtres */}
      <div className="flex space-x-2 text-sm">
        <button
          className={`px-3 py-1 rounded ${
            activeFilter === "all"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:bg-[#1a1f2c]"
          }`}
          onClick={() => setActiveFilter("all")}
        >
          Tous
        </button>
        <button
          className={`px-3 py-1 rounded ${
            activeFilter === "available"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:bg-[#1a1f2c]"
          }`}
          onClick={() => setActiveFilter("available")}
        >
          Disponibles
        </button>
        <button
          className={`px-3 py-1 rounded ${
            activeFilter === "maintenance"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:bg-[#1a1f2c]"
          }`}
          onClick={() => setActiveFilter("maintenance")}
        >
          Maintenance
        </button>
        <button
          className={`px-3 py-1 rounded ${
            activeFilter === "repair"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:bg-[#1a1f2c]"
          }`}
          onClick={() => setActiveFilter("repair")}
        >
          Réparation
        </button>
      </div>

      {/* Tableau */}
      <div className="bg-[#1a1f2c] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#151a27] text-gray-400 text-sm">
              <th className="px-4 py-3 text-left">Plaque</th>
              <th className="px-4 py-3 text-left">Modèle</th>
              <th className="px-4 py-3 text-left">Chauffeur (Jour)</th>
              <th className="px-4 py-3 text-left">Chauffeur (Nuit)</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-left">Spécifications</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="border-t border-[#2a2f3c] hover:bg-[#151a27] cursor-pointer"
              >
                <td className="px-4 py-3 font-medium text-white">
                  {vehicle.licensePlate}
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {vehicle.brand} {vehicle.model}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-950 text-yellow-500 rounded-full w-2 h-2" />
                    <span className="text-gray-300">-</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-950 text-purple-500 rounded-full w-2 h-2" />
                    <span className="text-gray-300">-</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        vehicle.condition === "GOOD"
                          ? "bg-green-900/30 text-green-400"
                          : vehicle.condition === "MAINTENANCE"
                          ? "bg-yellow-900/30 text-yellow-400"
                          : "bg-red-900/30 text-red-400"
                      }`}
                    >
                      {vehicle.condition === "GOOD"
                        ? "Bon état"
                        : vehicle.condition === "MAINTENANCE"
                        ? "En maintenance"
                        : "En réparation"}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        vehicle.available
                          ? "bg-emerald-900/30 text-emerald-400"
                          : "bg-slate-900/30 text-slate-400"
                      }`}
                    >
                      {vehicle.available ? "En service" : "Hors service"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 flex items-center justify-center rounded bg-[#2a2f3c] text-gray-300"
                      title={
                        vehicle.transmission === "AUTOMATIC"
                          ? "Transmission automatique"
                          : "Transmission manuelle"
                      }
                    >
                      {vehicle.transmission === "AUTOMATIC" ? "A" : "M"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleViewVehicle(vehicle)}
                      className="p-1 hover:bg-[#2a2f3c] rounded"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredVehicles.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Aucun véhicule ne correspond à vos critères
          </div>
        )}
      </div>

      {/* Légende */}
      <LegendVehicle />
    </motion.div>
  );
};

export default VehicleIndex;
