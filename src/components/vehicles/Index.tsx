import React from "react";
import {
  Car,
  AlertTriangle,
  Wrench,
  CheckCircle,
  Battery,
  Fuel,
  MoreVertical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { VehicleDTO } from "@/api/vehicle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VehicleIndexProps {
  vehicles: VehicleDTO[];
  statusCounts: Record<string, number>;
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  filteredVehicles: VehicleDTO[];
  handleViewVehicle: (vehicle: VehicleDTO) => void;
  onEdit: (vehicle: VehicleDTO) => void;
  onDelete: (vehicle: VehicleDTO) => void;
}

const VehicleIndex: React.FC<VehicleIndexProps> = ({
  vehicles,
  statusCounts,
  activeFilter,
  setActiveFilter,
  filteredVehicles,
  handleViewVehicle,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (available: boolean, condition: string) => {
    if (!available) return "destructive";
    if (condition === "MAINTENANCE") return "secondary";
    return "default";
  };

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case "MAINTENANCE":
        return <Badge variant="warning">Maintenance</Badge>;
      case "REPAIR":
        return <Badge variant="destructive">Réparation</Badge>;
      default:
        return <Badge variant="success">Bon état</Badge>;
    }
  };

  return (
    <>
      {/* Statistiques de la flotte */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Véhicules</p>
            <p className="text-2xl font-bold text-white">{vehicles.length}</p>
          </div>
          <Car className="text-blue-400" size={28} />
        </div>

        <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Disponibles</p>
            <p className="text-2xl font-bold text-white">
              {vehicles.filter((v) => v.available).length}
            </p>
          </div>
          <CheckCircle className="text-green-400" size={28} />
        </div>

        <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Maintenance</p>
            <p className="text-2xl font-bold text-white">
              {vehicles.filter((v) => v.condition === "MAINTENANCE").length}
            </p>
          </div>
          <Wrench className="text-yellow-400" size={28} />
        </div>

        <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Réparation</p>
            <p className="text-2xl font-bold text-white">
              {vehicles.filter((v) => v.condition === "REPAIR").length}
            </p>
          </div>
          <AlertTriangle className="text-red-400" size={28} />
        </div>
      </div>

      {/* Filtres par statut */}
      <Tabs value={activeFilter} className="mb-6">
        <TabsList className="bg-gray-900">
          <TabsTrigger value="all" onClick={() => setActiveFilter("all")}>
            Tous
          </TabsTrigger>
          <TabsTrigger
            value="available"
            onClick={() => setActiveFilter("available")}
          >
            Disponibles
          </TabsTrigger>
          <TabsTrigger
            value="maintenance"
            onClick={() => setActiveFilter("maintenance")}
          >
            Maintenance
          </TabsTrigger>
          <TabsTrigger
            value="repair"
            onClick={() => setActiveFilter("repair")}
          >
            Réparation
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Liste des véhicules */}
      <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Plaque</TableHead>
              <TableHead className="text-gray-400">Modèle</TableHead>
              <TableHead className="text-gray-400">Kilométrage</TableHead>
              <TableHead className="text-gray-400">État</TableHead>
              <TableHead className="text-gray-400">Spécifications</TableHead>
              <TableHead className="text-gray-400">Statut</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow
                key={vehicle.id}
                className="border-t border-gray-800 hover:bg-gray-800/50 transition"
              >
                <TableCell className="font-medium text-white">
                  {vehicle.licensePlate}
                </TableCell>
                <TableCell className="text-gray-300">
                  {vehicle.brand} {vehicle.model}
                </TableCell>
                <TableCell className="text-gray-300">
                  {vehicle.odometerKm} km
                </TableCell>
                <TableCell>
                  {getConditionBadge(vehicle.condition)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-gray-800 flex items-center gap-1 px-1.5"
                    >
                      {vehicle.transmission === "AUTOMATIC" ? "A" : "M"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getStatusColor(vehicle.available, vehicle.condition)}
                    className={`${
                      vehicle.available
                        ? "bg-green-900/30 text-green-400"
                        : "bg-red-900/30 text-red-400"
                    }`}
                  >
                    {vehicle.available ? "Disponible" : "Indisponible"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                      >
                        <span className="sr-only">Menu actions</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-gray-800 border-gray-700"
                    >
                      <DropdownMenuLabel className="text-gray-400">
                        Actions
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleViewVehicle(vehicle)}
                        className="text-gray-300 focus:bg-gray-700 focus:text-white"
                      >
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onEdit(vehicle)}
                        className="text-gray-300 focus:bg-gray-700 focus:text-white"
                      >
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(vehicle)}
                        className="text-red-400 focus:bg-red-900/30 focus:text-red-400"
                      >
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredVehicles.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            Aucun véhicule ne correspond à vos critères
          </div>
        )}
      </div>

      {/* Notes et légende */}
      <div className="mt-6 bg-gray-900 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-2">Légende</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className="bg-gray-800 flex items-center gap-1 px-1.5"
              >
                <span className="w-3 h-3">A</span>
              </Badge>
              <span className="text-gray-300">Transmission automatique</span>
            </p>
            <p className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className="bg-gray-800 flex items-center gap-1 px-1.5"
              >
                <span className="w-3 h-3">M</span>
              </Badge>
              <span className="text-gray-300">Transmission manuelle</span>
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 mb-1">
              <Badge className="bg-green-900/30 text-green-400">
                Bon état
              </Badge>
              <span className="text-gray-300">Véhicule en bon état</span>
            </p>
            <p className="flex items-center gap-2 mb-1">
              <Badge className="bg-yellow-900/30 text-yellow-400">
                Maintenance
              </Badge>
              <span className="text-gray-300">En maintenance programmée</span>
            </p>
            <p className="flex items-center gap-2">
              <Badge className="bg-red-900/30 text-red-400">
                Réparation
              </Badge>
              <span className="text-gray-300">En réparation</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleIndex;
