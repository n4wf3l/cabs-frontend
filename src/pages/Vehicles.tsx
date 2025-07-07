import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { toast } from "sonner";

// Composants pour la gestion des véhicules
import AddVehicle from "@/components/vehicles/AddVehicle";
import EditVehicle from "@/components/vehicles/EditVehicle";
import ViewVehicle from "@/components/vehicles/ViewVehicle";
import { VehicleHeader } from "@/components/vehicles/VehicleHeader";
import VehicleIndex from "@/components/vehicles/Index";

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

// Données de démonstration
const mockVehicles: Vehicle[] = [
  {
    id: "1",
    plate: "T-445-DSC",
    model: "Toyota Prius",
    dayDriver: { id: "d1", name: "Jean D." },
    nightDriver: { id: "d3", name: "Pierre B." },
    status: "available",
    transmission: "automatic",
    fuelType: "hybrid",
  },
  {
    id: "2",
    plate: "T-123-ABC",
    model: "Renault Zoe",
    dayDriver: { id: "d2", name: "Marie M." },
    nightDriver: null,
    status: "available",
    transmission: "automatic",
    fuelType: "electric",
  },
  {
    id: "3",
    plate: "T-987-XYZ",
    model: "Peugeot 208",
    dayDriver: null,
    nightDriver: { id: "d5", name: "Lucas M." },
    status: "maintenance",
    transmission: "manual",
    fuelType: "gasoline",
    notes: "Révision programmée - Retour le 10/07",
  },
  {
    id: "4",
    plate: "T-654-QWE",
    model: "Tesla Model 3",
    dayDriver: { id: "d4", name: "Sophie D." },
    nightDriver: { id: "d10", name: "Camille S." },
    status: "available",
    transmission: "automatic",
    fuelType: "electric",
  },
  {
    id: "5",
    plate: "T-321-RTY",
    model: "Volkswagen ID.3",
    dayDriver: null,
    nightDriver: null,
    status: "repair",
    transmission: "automatic",
    fuelType: "electric",
    notes: "Problème batterie - Indisponible jusqu'au 15/07",
  },
];

export default function Vehicles() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // États pour les modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Filtrage des véhicules
  const filteredVehicles = mockVehicles.filter((vehicle) => {
    // Filtre par statut
    if (activeFilter !== "all" && vehicle.status !== activeFilter) {
      return false;
    }

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        vehicle.plate.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query) ||
        vehicle.dayDriver?.name?.toLowerCase().includes(query) ||
        vehicle.nightDriver?.name?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Comptage des statuts pour les badges
  const statusCounts = mockVehicles.reduce((acc, vehicle) => {
    acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
    return acc;
  }, {} as Record<VehicleStatus, number>);

  // Gérer l'ajout d'un véhicule
  const handleAddVehicle = (newVehicleData: Partial<Vehicle>) => {
    // Implémentation de l'ajout (simulation)
    toast.success("Véhicule ajouté avec succès");
  };

  // Gérer la modification d'un véhicule
  const handleEditVehicle = (vehicleData: Vehicle) => {
    // Implémentation de la modification (simulation)
    toast.success("Véhicule modifié avec succès");
  };

  // Ouvrir le modal de détails
  const handleViewVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsViewModalOpen(true);
  };

  // Ouvrir le modal d'édition depuis le modal de détails
  const handleEditFromView = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleFilterClick = () => {
    // Logique pour ouvrir les filtres avancés, si nécessaire
  };

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

        {/* Utilisation du composant VehicleIndex */}
        <VehicleIndex
          vehicles={mockVehicles}
          statusCounts={statusCounts}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filteredVehicles={filteredVehicles}
          handleViewVehicle={handleViewVehicle}
        />
      </main>

      {/* Modals */}
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
    </div>
  );
}
