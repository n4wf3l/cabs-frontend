import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Car, Wrench, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VehicleDTO } from "@/api/vehicle";

interface ViewVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: VehicleDTO | null;
  onEdit: () => void;
}

export default function ViewVehicle({
  isOpen,
  onClose,
  vehicle,
  onEdit,
}: ViewVehicleProps) {
  if (!vehicle) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium flex items-center gap-2">
            <Car className="text-blue-400" size={18} />
            {vehicle.licensePlate} - {vehicle.brand} {vehicle.model}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 my-4">
          {/* Statut du véhicule */}
          <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
            <span className="font-medium">Statut</span>
            <div>
              {vehicle.available ? (
                <Badge className="bg-green-900/30 text-green-400 flex items-center gap-1">
                  <CheckCircle size={14} /> Disponible
                </Badge>
              ) : (
                <Badge className="bg-red-900/30 text-red-400 flex items-center gap-1">
                  <AlertTriangle size={14} /> Indisponible
                </Badge>
              )}
            </div>
          </div>

          {/* État du véhicule */}
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">État</span>
              <div>
                {vehicle.condition === "GOOD" && (
                  <Badge className="bg-green-900/30 text-green-400">
                    Bon état
                  </Badge>
                )}
                {vehicle.condition === "MAINTENANCE" && (
                  <Badge className="bg-yellow-900/30 text-yellow-400">
                    Maintenance
                  </Badge>
                )}
                {vehicle.condition === "REPAIR" && (
                  <Badge className="bg-red-900/30 text-red-400">
                    Réparation
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Spécifications techniques */}
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400 mb-3">
              <Wrench size={16} />
              <span className="font-medium">Caractéristiques techniques</span>
            </div>
            <div className="grid gap-3">
              <div>
                <p className="text-gray-400 text-sm">Transmission</p>
                <p className="text-white">
                  {vehicle.transmission === "AUTOMATIC"
                    ? "Automatique"
                    : "Manuelle"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Kilométrage</p>
                <p className="text-white">{vehicle.odometerKm} km</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">En service</p>
                <p className="text-white">
                  {vehicle.activeInShift ? "Oui" : "Non"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            Fermer
          </Button>
          <Button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Modifier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
