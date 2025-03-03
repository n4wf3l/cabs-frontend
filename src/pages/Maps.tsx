import React, { useEffect, useState } from "react";
import Map from ".././components/map/Map";
import SidebarMap from "../components/map/SidebarMap";
import { Sidebar } from "@/components/dashboard/Sidebar";
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
import InteractiveResults from "@/components/dashboard/InteractiveResults";

// Utilisation directe de la clé API
const MAPBOX_TOKEN =
  "pk.eyJ1IjoibjR3ZjNsIiwiYSI6ImNtN3J6dm1vZDEyeWoycXI2b25id29sdDcifQ.cZyy5fIi1f-GBGzQoOSdGg";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [taxis, setTaxis] = useState<Taxi[]>([]);
  const [selectedTaxi, setSelectedTaxi] = useState<Taxi | null>(null);
  const [selectedCommunes, setSelectedCommunes] = useState<string[]>([]);
  // Nous gardons uniquement le statut "disponible" par défaut
  const [statusFilter, setStatusFilter] = useState<"disponible"[]>([
    "disponible",
  ]);

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

  // Gère les filtres par statut - maintenant simplifié
  const handleToggleStatusFilter = (status: "disponible") => {
    // Nous gardons toujours "disponible" activé
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
    // La navigation est gérée dans le composant Map via useEffect
    setSelectedTaxi(taxi);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
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
  );
};

export default Index;
