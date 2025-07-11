import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { VehicleDTO, fetchVehicles, deleteVehicle } from "@/api/vehicle";
import AddVehicle from "@/components/vehicles/AddVehicle";
import EditVehicle from "@/components/vehicles/EditVehicle";
import ViewVehicle from "@/components/vehicles/ViewVehicle";
import { VehicleHeader } from "@/components/vehicles/VehicleHeader";
import VehicleIndex from "@/components/vehicles/Index";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Vehicles() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // États pour les modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleDTO | null>(null);

  // Récupération des véhicules depuis le backend
  const { data: vehicles = [], isLoading, error } = useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles
  });

  // Filtrage des véhicules
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (activeFilter !== "all") {
      if (activeFilter === "available" && !vehicle.available) return false;
      if (activeFilter === "unavailable" && vehicle.available) return false;
      if (activeFilter === "maintenance" && vehicle.condition !== "MAINTENANCE") return false;
      if (activeFilter === "repair" && vehicle.condition !== "REPAIR") return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        vehicle.licensePlate.toLowerCase().includes(query) ||
        vehicle.brand.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Comptage des statuts pour les badges et statistiques
  const statusCounts = vehicles.reduce((acc, vehicle) => {
    if (vehicle.available) acc["available"] = (acc["available"] || 0) + 1;
    if (vehicle.condition === "MAINTENANCE") acc["maintenance"] = (acc["maintenance"] || 0) + 1;
    if (vehicle.condition === "REPAIR") acc["repair"] = (acc["repair"] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Gérer l'ajout d'un véhicule
  const handleAddVehicle = (newVehicleData: Partial<VehicleDTO>) => {
    setIsAddModalOpen(false);
  };

  // Gérer la modification d'un véhicule
  const handleEditVehicle = (vehicleData: VehicleDTO) => {
    setIsEditModalOpen(false);
  };

  // Ouvrir le modal de détails
  const handleViewVehicle = (vehicle: VehicleDTO) => {
    setSelectedVehicle(vehicle);
    setIsViewModalOpen(true);
  };

  // Ouvrir le modal d'édition depuis le modal de détails
  const handleEditFromView = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(true);
  };

  // Ouvrir le modal d'édition directement
  const handleEdit = (vehicle: VehicleDTO) => {
    setSelectedVehicle(vehicle);
    setIsEditModalOpen(true);
  };

  // Ouvrir la boîte de dialogue de suppression
  const handleDeleteClick = (vehicle: VehicleDTO) => {
    setSelectedVehicle(vehicle);
    setIsDeleteDialogOpen(true);
  };

  // Confirmer la suppression
  const handleConfirmDelete = async () => {
    if (selectedVehicle) {
      try {
        await deleteVehicle(selectedVehicle.id);
        toast.success("Véhicule supprimé avec succès");
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        toast.error("Erreur lors de la suppression du véhicule");
      }
    }
    setIsDeleteDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Erreur de chargement des véhicules
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="flex-1 p-4 md:p-8">
        <VehicleHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddClick={() => setIsAddModalOpen(true)}
        />

        <VehicleIndex
          vehicles={vehicles}
          statusCounts={statusCounts}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filteredVehicles={filteredVehicles}
          handleViewVehicle={handleViewVehicle}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </main>

      <AddVehicle
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddVehicle}
      />

      <EditVehicle
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditVehicle}
        vehicle={selectedVehicle}
      />

      <ViewVehicle
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        vehicle={selectedVehicle}
        onEdit={handleEditFromView}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-700 text-white hover:bg-gray-800">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleConfirmDelete}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
