import { useState } from "react";
import { VehicleDTO, fetchVehicles, deleteVehicle } from "@/api/vehicle";
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, Pencil, Trash2, Car } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { AddVehicleDialog } from "./AddVehicleDialog";
import { EditVehicleDialog } from "./EditVehicleDialog";
import { DeleteVehicleDialog } from "./DeleteVehicleDialog";
import { ViewVehicleDialog } from "./ViewVehicleDialog";
import { Badge } from "@/components/ui/badge";

export function VehicleList() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleDTO | null>(null);

  const { data: vehicles = [], refetch, isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
  });

  const handleDelete = async (vehicleId: number) => {
    try {
      await deleteVehicle(vehicleId);
      await refetch();
      toast.success("Véhicule supprimé avec succès!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la suppression du véhicule"
      );
    }
  };

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case "GOOD":
        return { color: "bg-green-100 text-green-800 border-green-300", text: "Bon état" };
      case "FAIR":
        return { color: "bg-yellow-100 text-yellow-800 border-yellow-300", text: "État moyen" };
      case "POOR":
        return { color: "bg-red-100 text-red-800 border-red-300", text: "Mauvais état" };
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-300", text: "Non spécifié" };
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Car className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Gestion des véhicules</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-8 pr-4 py-2 border rounded-md bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <svg
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau véhicule
          </Button>
        </div>
      </div>

      {vehicles.length === 0 && !isLoading ? (
        <div className="text-center py-12 border rounded-lg">
          <Car className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun véhicule disponible
          </h3>
          <p className="text-gray-500 mb-4">
            Commencez par ajouter votre premier véhicule à la flotte.
          </p>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un véhicule
          </Button>
        </div>
      ) : (
        <div className="rounded-md border shadow-sm">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plaque</TableHead>
                  <TableHead>Modèle</TableHead>
                  <TableHead>Transmission</TableHead>
                  <TableHead>État</TableHead>
                  <TableHead>Disponibilité</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vehicle.brand}</div>
                        <div className="text-sm text-gray-500">{vehicle.model}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {vehicle.transmission === "MANUAL" ? "Manuelle" : "Automatique"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getConditionBadge(vehicle.condition).color}>
                        {getConditionBadge(vehicle.condition).text}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          vehicle.available 
                            ? "bg-green-100 text-green-800 border-green-300"
                            : "bg-red-100 text-red-800 border-red-300"
                        }
                      >
                        {vehicle.available ? "Disponible" : "Indisponible"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedVehicle(vehicle);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedVehicle(vehicle);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}

      <AddVehicleDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={refetch}
      />

      <EditVehicleDialog
        vehicle={selectedVehicle}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSuccess={refetch}
      />

      <DeleteVehicleDialog
        vehicle={selectedVehicle}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDelete}
      />

      <ViewVehicleDialog
        vehicle={selectedVehicle}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />
    </div>
  );
}
