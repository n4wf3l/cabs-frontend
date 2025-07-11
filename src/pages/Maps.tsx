import React, { useEffect, useState } from "react";
import Map from "../components/map/Map";
import SidebarMap from "../components/map/SidebarMap";
import { Sidebar } from "@/components/Sidebar";
import {
  BRUSSELS_CENTER,
  Taxi,
  communes,
  generateFakeTaxis,
  updateCommuneTaxiCount,
  updateTaxiPositions,
} from "../utils/mapData";
import { motion } from "framer-motion";
import { toast } from "sonner";

// ✅ Clé API Mapbox
const MAPBOX_TOKEN =
  "pk.eyJ1IjoibjR3ZjNsIiwiYSI6ImNtN3J6dm1vZDEyeWoycXI2b25id29sdDcifQ.cZyy5fIi1f-GBGzQoOSdGg";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [taxis, setTaxis] = useState<Taxi[]>([]);
  const [selectedTaxi, setSelectedTaxi] = useState<Taxi | null>(null);
  const [selectedCommunes, setSelectedCommunes] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<"disponible"[]>([
    "disponible",
  ]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Charge la carte en arrière-plan mais invisible
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // ⏳ Affiche le loader au moins 1 secondes
    return () => clearTimeout(timer);
  }, []);

  // Génère les données de taxis initiales
  useEffect(() => {
    if (taxis.length === 0) {
      const initialTaxis = generateFakeTaxis(50);
      setTaxis(initialTaxis);
    }
  }, [taxis.length]);

  // Simule les mises à jour des positions en temps réel
  useEffect(() => {
    if (taxis.length === 0) return;

    const intervalId = setInterval(() => {
      const updatedTaxis = updateTaxiPositions([...taxis]);
      updateCommuneTaxiCount(updatedTaxis);
      setTaxis(updatedTaxis);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [taxis]);

  // Gère les filtres par commune
  const handleToggleCommune = (communeId: string) => {
    setSelectedCommunes((prev) =>
      prev.includes(communeId)
        ? prev.filter((id) => id !== communeId)
        : [...prev, communeId]
    );
  };

  const handleSelectAllCommunes = () => {
    setSelectedCommunes(communes.map((c) => c.id));
  };

  const handleClearAllCommunes = () => {
    setSelectedCommunes([]);
  };

  // Gère les filtres par statut
  const handleToggleStatusFilter = (status: "disponible") => {
    if (!statusFilter.includes(status)) {
      setStatusFilter([status]);
    }
  };

  // Gère la sélection d'un taxi
  const handleSelectTaxi = (taxi: Taxi | null) => {
    setSelectedTaxi(taxi);
  };

  // Gère la navigation vers un taxi
  const handleFlyToTaxi = (taxi: Taxi) => {
    setSelectedTaxi(taxi);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      {/* ✅ Loader en plein écran (empêche l'affichage des carrés) */}
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              className="w-24 h-24 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <motion.p
              className="mt-6 text-lg text-white font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              Chargement de la carte...
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* ✅ La carte est déjà chargée mais invisible, évite les carrés graphiques */}
      <div
        className={`w-full h-full transition-opacity duration-700 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Map
          taxis={taxis}
          selectedTaxi={selectedTaxi}
          onSelectTaxi={handleSelectTaxi}
          selectedCommunes={selectedCommunes}
          statusFilter={statusFilter}
          mapboxToken={MAPBOX_TOKEN}
        />

        <SidebarMap
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          communes={communes}
          selectedCommunes={selectedCommunes}
          onToggleCommune={handleToggleCommune}
          onSelectAllCommunes={handleSelectAllCommunes}
          onClearAllCommunes={handleClearAllCommunes}
          taxis={taxis}
          selectedTaxi={selectedTaxi}
          onSelectTaxi={handleSelectTaxi}
          onFlyToTaxi={handleFlyToTaxi}
          statusFilter={statusFilter}
          onToggleStatusFilter={handleToggleStatusFilter}
        />
      </div>
    </div>
  );
};

export default Index;
