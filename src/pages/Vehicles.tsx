import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchVehicles, deleteVehicle } from "@/api/vehicle";
import { VehicleDTO } from "@/api/models/VehicleDTO";
// Composants pour la gestion des véhicules
import { AddVehicleDialog } from "@/components/vehicles/AddVehicleDialog";
import EditVehicle from "@/components/vehicles/EditVehicle";
import ViewVehicle from "@/components/vehicles/ViewVehicle";
import { VehicleHeader } from "@/components/vehicles/VehicleHeader";
import VehicleIndex from "@/components/vehicles/Index";
import { DeleteVehicleDialog } from "@/components/vehicles/DeleteVehicleDialog";

export default function Vehicles() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // États pour les modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleDTO | null>(null);

  // Supposons que tu as :
  const [vehicles, setVehicles] = useState<VehicleDTO[]>([]);

  // Récupération des véhicules depuis l'API
  const { data: vehiclesData = [], isLoading, error } = useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles
  });

  // Filtrage des véhicules
  const filteredVehicles = vehiclesData.filter((vehicle) => {
    if (activeFilter !== "all") {
      if (activeFilter === "available" && !vehicle.available) return false;
      if (activeFilter === "maintenance" && vehicle.condition !== "MAINTENANCE") return false;
      if (activeFilter === "repair" && vehicle.condition !== "REPAIR") return false;
      if (activeFilter === "good" && vehicle.condition !== "GOOD") return false;
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

  // Comptage des statuts
  const statusCounts = vehiclesData.reduce((acc, vehicle) => {
    if (vehicle.available) {
      acc.available = (acc.available || 0) + 1;
    }
    if (vehicle.condition === 'MAINTENANCE') {
      acc.maintenance = (acc.maintenance || 0) + 1;
    }
    if (vehicle.condition === 'REPAIR') {
      acc.repair = (acc.repair || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Gérer l'ajout d'un véhicule
  const handleAddVehicle = (newVehicleData: Partial<VehicleDTO>) => {
    setIsAddModalOpen(false);
    toast.success("Véhicule ajouté avec succès");
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

  // Gérer le filtre avancé
  const handleFilterClick = () => {
    // Logique pour ouvrir les filtres avancés
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

  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        Erreur de chargement des véhicules
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1 p-4 md:p-8">
        <VehicleHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddClick={() => setIsAddModalOpen(true)}
          onFilterClick={handleFilterClick}
        />

        {/* Ajout de la ligne séparatrice avec effet lumineux */}
        <hr className="hr-light-effect mb-10" />

        <VehicleIndex
          vehicles={vehiclesData}
          statusCounts={statusCounts}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filteredVehicles={filteredVehicles}
          handleViewVehicle={handleViewVehicle}
          setSelectedVehicle={setSelectedVehicle} // AJOUTE
          setIsDeleteDialogOpen={setIsDeleteDialogOpen} // AJOUTE
        />
      </main>

      {/* Modals */}
      <AddVehicleDialog
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSuccess={() => {
          // Tu peux éventuellement faire un refetch ici si besoin
          toast.success("Véhicule ajouté avec succès");
        }}
      />

      <EditVehicle
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        vehicle={selectedVehicle}
      />

      <ViewVehicle
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        vehicle={selectedVehicle}
        onEdit={handleEditFromView}
      />

      <DeleteVehicleDialog
        vehicle={selectedVehicle}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={async (vehicleId) => {
          try {
            await deleteVehicle(vehicleId);
            await queryClient.invalidateQueries({ queryKey: ["vehicles"] }); // <-- MAJ immédiate
            toast.success("Véhicule supprimé avec succès");
          } catch (error) {
            toast.error("Erreur lors de la suppression du véhicule");
          }
        }}
      />
    </div>
  );
}
