import React from "react";
import {
  Car,
  AlertTriangle,
  Wrench,
  CheckCircle,
  Battery,
  Fuel,
  Leaf,
  MoreVertical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

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

interface VehicleIndexProps {
  vehicles: Vehicle[];
  statusCounts: Record<VehicleStatus, number>;
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  filteredVehicles: Vehicle[];
  handleViewVehicle: (vehicle: Vehicle) => void;
}

const VehicleIndex: React.FC<VehicleIndexProps> = ({
  vehicles,
  statusCounts,
  activeFilter,
  setActiveFilter,
  filteredVehicles,
  handleViewVehicle,
}) => {
  return (
    <>
      {/* Statistiques de la flotte */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Véhicules</p>
            <p className="text-2xl font-bold">{vehicles.length}</p>
          </div>
          <Car className="text-blue-400" size={28} />
        </div>

        <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Disponibles</p>
            <p className="text-2xl font-bold">{statusCounts.available || 0}</p>
          </div>
          <CheckCircle className="text-green-400" size={28} />
        </div>

        <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Maintenance</p>
            <p className="text-2xl font-bold">
              {statusCounts.maintenance || 0}
            </p>
          </div>
          <Wrench className="text-yellow-400" size={28} />
        </div>

        <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Réparation</p>
            <p className="text-2xl font-bold">{statusCounts.repair || 0}</p>
          </div>
          <AlertTriangle className="text-red-400" size={28} />
        </div>
      </div>

      {/* Filtres par statut */}
      <Tabs
        value={activeFilter}
        onValueChange={setActiveFilter}
        className="mb-6"
      >
        <TabsList className="bg-gray-900">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="available">Disponibles</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="repair">Réparation</TabsTrigger>
          <TabsTrigger value="outOfService">Hors service</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Liste des véhicules */}
      <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 bg-gray-800/50">
              <th className="px-4 py-3">Plaque</th>
              <th className="px-4 py-3">Modèle</th>
              <th className="px-4 py-3">Chauffeur (Jour)</th>
              <th className="px-4 py-3">Chauffeur (Nuit)</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Spécifications</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="border-t border-gray-800 hover:bg-gray-800/50 transition"
              >
                <td className="px-4 py-3 font-medium">{vehicle.plate}</td>
                <td className="px-4 py-3">{vehicle.model}</td>

                {/* Chauffeur de jour */}
                <td className="px-4 py-3">
                  {vehicle.dayDriver ? (
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-950 text-yellow-500 rounded-full w-2 h-2 inline-block"></span>
                      {vehicle.dayDriver.name}
                    </div>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-gray-400 bg-gray-800"
                    >
                      Libre
                    </Badge>
                  )}
                </td>

                {/* Chauffeur de nuit */}
                <td className="px-4 py-3">
                  {vehicle.nightDriver ? (
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-950 text-purple-500 rounded-full w-2 h-2 inline-block"></span>
                      {vehicle.nightDriver.name}
                    </div>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-gray-400 bg-gray-800"
                    >
                      Libre
                    </Badge>
                  )}
                </td>

                {/* Statut du véhicule */}
                <td className="px-4 py-3">
                  {vehicle.status === "available" && (
                    <Badge className="bg-green-900/30 text-green-400 hover:bg-green-900/50">
                      Disponible
                    </Badge>
                  )}
                  {vehicle.status === "maintenance" && (
                    <Badge className="bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/50">
                      Maintenance
                    </Badge>
                  )}
                  {vehicle.status === "repair" && (
                    <Badge className="bg-red-900/30 text-red-400 hover:bg-red-900/50">
                      Réparation
                    </Badge>
                  )}
                  {vehicle.status === "outOfService" && (
                    <Badge variant="outline" className="text-gray-400">
                      Hors Service
                    </Badge>
                  )}
                </td>

                {/* Spécifications techniques */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {/* Type de transmission */}
                    <Badge
                      variant="outline"
                      className="bg-gray-800 flex items-center gap-1"
                    >
                      <span className="w-3 h-3">
                        {vehicle.transmission === "automatic" ? "A" : "M"}
                      </span>
                    </Badge>

                    {/* Type de carburant */}
                    {vehicle.fuelType === "gasoline" && (
                      <Badge
                        variant="outline"
                        className="bg-gray-800 flex items-center gap-1"
                      >
                        <Fuel className="w-3 h-3" />
                      </Badge>
                    )}
                    {vehicle.fuelType === "electric" && (
                      <Badge
                        variant="outline"
                        className="bg-gray-800 flex items-center gap-1"
                      >
                        <Battery className="w-3 h-3" />
                      </Badge>
                    )}
                    {vehicle.fuelType === "hybrid" && (
                      <Badge
                        variant="outline"
                        className="bg-gray-800 flex items-center gap-1"
                      >
                        <Leaf className="w-3 h-3" />
                      </Badge>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => handleViewVehicle(vehicle)}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredVehicles.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            Aucun véhicule ne correspond à vos critères
          </div>
        )}
      </div>

      {/* Notes et légende */}
      <div className="mt-6 bg-gray-900 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-2">Légende</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="flex items-center gap-2 mb-1">
              <span className="bg-yellow-950 text-yellow-500 rounded-full w-2 h-2 inline-block"></span>
              <span>Shift de jour</span>
            </p>
            <p className="flex items-center gap-2 mb-1">
              <span className="bg-purple-950 text-purple-500 rounded-full w-2 h-2 inline-block"></span>
              <span>Shift de nuit</span>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className="bg-gray-800 flex items-center gap-1 px-1.5"
              >
                <span className="w-3 h-3">A</span>
              </Badge>
              <span>Transmission automatique</span>
            </p>
            <p className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className="bg-gray-800 flex items-center gap-1 px-1.5"
              >
                <span className="w-3 h-3">M</span>
              </Badge>
              <span>Transmission manuelle</span>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className="bg-gray-800 flex items-center gap-1 px-1.5"
              >
                <Fuel className="w-3 h-3" />
              </Badge>
              <span>Essence</span>
            </p>
            <p className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className="bg-gray-800 flex items-center gap-1 px-1.5"
              >
                <Battery className="w-3 h-3" />
              </Badge>
              <span>Électrique</span>
            </p>
            <p className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-gray-800 flex items-center gap-1 px-1.5"
              >
                <Leaf className="w-3 h-3" />
              </Badge>
              <span>Hybride</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleIndex;
