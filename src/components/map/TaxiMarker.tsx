import React, { useEffect, useState } from "react";
import { Marker, Popup } from "mapbox-gl";
import { Taxi, getTaxiColor } from "../../utils/mapData";

interface TaxiMarkerProps {
  taxi: Taxi;
  map: mapboxgl.Map;
  onClick: (taxi: Taxi) => void;
  isSelected: boolean;
}

const TaxiMarker: React.FC<TaxiMarkerProps> = ({
  taxi,
  map,
  onClick,
  isSelected,
}) => {
  const [marker, setMarker] = useState<Marker | null>(null);
  const [popup, setPopup] = useState<Popup | null>(null);

  useEffect(() => {
    const element = document.createElement("div");
    element.className = isSelected ? "taxi-marker-active" : "taxi-marker";
    element.style.backgroundColor = getTaxiColor(taxi.status);
    element.style.animation = isSelected
      ? "none"
      : "pulse-soft 2s ease-in-out infinite";

    if (isSelected) {
      // Ajoute un effet de pulse plus prononcé pour le marqueur sélectionné
      element.classList.add("animate-taxi-bounce");
    }

    // Crée le popup
    const newPopup = new Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 25,
      className: "taxi-popup",
    }).setHTML(`
      <div class="font-medium text-sm">${taxi.name}</div>
      <div class="text-xs text-muted">${taxi.id}</div>
    `);

    // Crée le marqueur
    const newMarker = new Marker({
      element,
      anchor: "center",
    })
      .setLngLat(taxi.position)
      .addTo(map);

    setMarker(newMarker);
    // Ajoute l'écouteur d'événement au marqueur
    element.addEventListener("click", () => {
      onClick(taxi);
    });

    // Ajoute les événements de survol pour afficher/masquer le popup
    element.addEventListener("mouseenter", () => {
      newMarker.setPopup(newPopup);
      newPopup.addTo(map);
    });

    element.addEventListener("mouseleave", () => {
      newPopup.remove();
    });

    setMarker(newMarker);
    setPopup(newPopup);

    // Nettoyage lors du démontage
    return () => {
      newMarker.remove();
      newPopup.remove();
    };
  }, [taxi, map, onClick, isSelected]);

  // Met à jour la position du marqueur lorsque les coordonnées du taxi changent
  useEffect(() => {
    if (marker) {
      marker.setLngLat(taxi.position);

      // Met à jour le style si le statut a changé
      const element = marker.getElement();
      element.style.backgroundColor = getTaxiColor(taxi.status);

      // Met à jour le contenu du popup si nécessaire
      if (popup) {
        popup.setHTML(`
          <div class="font-medium text-sm">${taxi.name}</div>
          <div class="text-xs text-muted">${taxi.id}</div>
        `);
      }
    }
  }, [taxi.position, taxi.status, marker, popup, taxi.name, taxi.id]);

  return null; // Ce composant ne renvoie pas de JSX, il manipule directement le DOM via mapbox-gl
};

export default TaxiMarker;
