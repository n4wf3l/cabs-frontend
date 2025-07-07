import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Car,
  User,
  Clock,
  Calendar,
  Fuel,
  Battery,
  Leaf,
  Wrench,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Types
type DriverInfo = { id: string; name: string } | null;
type VehicleStatus = "available" | "maintenance" | "repair" | "outOfService";
type TransmissionType = "automatic" | "manual";
type FuelType = "gasoline" | "electric" | "hybrid";

interface Vehicle {
  id: string;
  plate: string;
  model: string;
  dayDriver: DriverInfo;
  nightDriver: DriverInfo;
  status: VehicleStatus;
  transmission: TransmissionType;
  fuelType: FuelType;
  lastService?: Date;
  notes?: string;
}

interface ViewVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
  onEdit: () => void;
}

export default function ViewVehicle({
  isOpen,
  onClose,
  vehicle,
  onEdit,
}: ViewVehicleProps) {
  // Si pas de véhicule sélectionné, on ne rend rien
  if (!vehicle) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium flex items-center gap-2">
            <Car className="text-blue-400" size={18} />
            {vehicle.plate} - {vehicle.model}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 my-4">
          {/* Statut du véhicule */}
          <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
            <span className="font-medium">Statut</span>
            <div>
              {vehicle.status === "available" && (
                <Badge className="bg-green-900/30 text-green-400 flex items-center gap-1">
                  <CheckCircle size={14} /> Disponible
                </Badge>
              )}
              {vehicle.status === "maintenance" && (
                <Badge className="bg-yellow-900/30 text-yellow-400 flex items-center gap-1">
                  <Wrench size={14} /> Maintenance
                </Badge>
              )}
              {vehicle.status === "repair" && (
                <Badge className="bg-red-900/30 text-red-400 flex items-center gap-1">
                  <AlertTriangle size={14} /> Réparation
                </Badge>
              )}
              {vehicle.status === "outOfService" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Hors service
                </Badge>
              )}
            </div>
          </div>

          {/* Chauffeurs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <User size={16} />
                <span className="font-medium">Chauffeur (Jour)</span>
              </div>
              {vehicle.dayDriver ? (
                <p>{vehicle.dayDriver.name}</p>
              ) : (
                <Badge variant="outline" className="text-gray-400">
                  Non assigné
                </Badge>
              )}
            </div>

            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <User size={16} />
                <span className="font-medium">Chauffeur (Nuit)</span>
              </div>
              {vehicle.nightDriver ? (
                <p>{vehicle.nightDriver.name}</p>
              ) : (
                <Badge variant="outline" className="text-gray-400">
                  Non assigné
                </Badge>
              )}
            </div>
          </div>

          {/* Spécifications techniques */}
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400 mb-3">
              <Wrench size={16} />
              <span className="font-medium">Caractéristiques techniques</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-gray-400 text-sm">Transmission</p>
                <p>
                  {vehicle.transmission === "automatic"
                    ? "Automatique"
                    : "Manuelle"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Type de carburant</p>
                <div className="flex items-center gap-2">
                  {vehicle.fuelType === "gasoline" && (
                    <>
                      <Fuel size={14} className="text-orange-400" /> Essence
                    </>
                  )}
                  {vehicle.fuelType === "electric" && (
                    <>
                      <Battery size={14} className="text-green-400" />{" "}
                      Électrique
                    </>
                  )}
                  {vehicle.fuelType === "hybrid" && (
                    <>
                      <Leaf size={14} className="text-blue-400" /> Hybride
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dernière révision */}
          {vehicle.lastService && (
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={16} className="text-gray-400" />
                <span className="font-medium">Dernière révision</span>
              </div>
              <p>
                {format(vehicle.lastService, "dd MMMM yyyy", { locale: fr })}
              </p>
            </div>
          )}

          {/* Notes */}
          {vehicle.notes && (
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">Notes</span>
              </div>
              <p className="text-gray-300">{vehicle.notes}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button onClick={onEdit}>Modifier</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
