import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { BRUSSELS_CENTER, Taxi, communes } from "../../utils/mapData";
import TaxiMarker from "../map/TaxiMarker";

// Style de carte pour le mode sombre
const DARK_STYLE = "mapbox://styles/mapbox/dark-v11";

interface MapProps {
  taxis: Taxi[];
  selectedTaxi: Taxi | null;
  onSelectTaxi: (taxi: Taxi | null) => void;
  selectedCommunes: string[];
  statusFilter: "disponible"[];
  mapboxToken: string;
}

const Map: React.FC<MapProps> = ({
  taxis,
  selectedTaxi,
  onSelectTaxi,
  selectedCommunes,
  statusFilter,
  mapboxToken,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Récupérer le token depuis le localStorage ou utiliser celui en props
  const storedToken = localStorage.getItem("mapbox_token") || mapboxToken;
  mapboxgl.accessToken = storedToken;

  console.log("🔑 Utilisation du token Mapbox :", storedToken);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    console.log("Initialisation de la carte...");

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: DARK_STYLE,
      center: BRUSSELS_CENTER,
      zoom: 11.5,
      pitch: 45,
      bearing: 0,
      antialias: true,
    });

    // Ajouter les contrôles de zoom/dézoom
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.current.on("load", () => {
      console.log("Carte Mapbox chargée !");
      setIsMapLoaded(true);
    });

    // Désactive le zoom avec la molette pour une meilleure expérience
    map.current.scrollZoom.disable();

    // Active le contrôle de rotation avec le clic droit
    map.current.dragRotate.enable();

    // Attend que la carte soit chargée
    map.current.on("load", () => {
      setIsMapLoaded(true);

      // Ajoute un effet de brouillard
      if (map.current) {
        map.current.setFog({
          color: "rgba(0, 0, 0, 0.9)",
          "high-color": "rgba(0, 20, 40, 0.8)",
          "horizon-blend": 0.1,
          "space-color": "rgba(0, 0, 15, 0.9)",
          "star-intensity": 0.15,
        });

        // Ajoute une couche d'extrusion pour les bâtiments 3D
        if (!map.current.getLayer("3d-buildings")) {
          map.current.addLayer({
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 14,
            paint: {
              "fill-extrusion-color": "#111827",
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                14,
                0,
                16,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                14,
                0,
                16,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.7,
            },
          });
        }
      }
    });

    // Nettoie lorsque le composant est démonté
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [storedToken]);

  // Filtre les taxis selon les critères sélectionnés
  const filteredTaxis = taxis.filter(
    (taxi) =>
      (selectedCommunes.length === 0 ||
        selectedCommunes.includes(taxi.commune)) &&
      (statusFilter.length === 0 || statusFilter.includes(taxi.status))
  );

  useEffect(() => {
    console.log("🚕 Taxis après filtrage :", filteredTaxis);
    if (!map.current || !isMapLoaded) return;

    const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
      // Si on clique sur la carte elle-même (pas sur un marqueur), désélectionne le taxi
      onSelectTaxi(null);
    };

    map.current.on("click", handleMapClick);

    return () => {
      if (map.current) {
        map.current.off("click", handleMapClick);
      }
    };
  }, [filteredTaxis, isMapLoaded, onSelectTaxi]);

  // Effet pour centrer la carte sur le taxi sélectionné
  useEffect(() => {
    console.log("🗺️ Vérification de map.current :", map.current);

    if (!map.current || !isMapLoaded || !selectedTaxi) return;

    map.current.flyTo({
      center: selectedTaxi.position,
      zoom: 14,
      pitch: 60,
      bearing: Math.random() * 360,
      duration: 1500,
      essential: true,
    });
  }, [selectedTaxi, isMapLoaded]);

  const flyToCommune = (communeId: string) => {
    if (!map.current) return;

    const commune = communes.find((c) => c.id === communeId);
    if (commune) {
      map.current.flyTo({
        center: commune.center,
        zoom: 13,
        pitch: 45,
        duration: 1500,
      });
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="w-full h-full border-2" />
      {/* Affiche les marqueurs de taxi uniquement si la carte est chargée */}
      {isMapLoaded &&
        map.current &&
        taxis.map((taxi) => (
          <TaxiMarker
            key={taxi.id}
            taxi={taxi}
            map={map.current!}
            onClick={onSelectTaxi}
            isSelected={selectedTaxi?.id === taxi.id}
          />
        ))}

      {/* Overlay pour améliorer la lisibilité */}
      <div className="map-overlay" />

      {/* Informations de légende */}
      <div className="absolute bottom-4 left-20 glassmorphism p-3 rounded-lg">
        <div className="text-xs font-medium mb-2">Légende</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#4ade80]"></div>
            <span className="text-xs">Disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
