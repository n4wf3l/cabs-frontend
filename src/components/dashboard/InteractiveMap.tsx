import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const InteractiveMap: React.FC = () => {
  useEffect(() => {
    const map = L.map("map").setView([50.8503, 4.3517], 12); // Bruxelles par défaut

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; CartoDB",
      }
    ).addTo(map);

    const drivers = [
      { name: "Ahmed", lat: 50.8203, lng: 4.3017, speed: 0.0005 },
      { name: "Youssef", lat: 50.8803, lng: 4.3917, speed: 0.0004 },
      { name: "Fatima", lat: 50.835, lng: 4.25, speed: 0.0006 },
      { name: "Khadija", lat: 50.86, lng: 4.445, speed: 0.0003 },
      { name: "Mohamed", lat: 50.87, lng: 4.31, speed: 0.0005 },
      { name: "Omar", lat: 50.81, lng: 4.37, speed: 0.0004 },
      { name: "Salma", lat: 50.85, lng: 4.28, speed: 0.0005 },
      { name: "Ibrahim", lat: 50.89, lng: 4.42, speed: 0.0004 },
      { name: "Sara", lat: 50.825, lng: 4.315, speed: 0.0006 },
      { name: "Nadia", lat: 50.84, lng: 4.335, speed: 0.0003 },
      { name: "Hassan", lat: 50.855, lng: 4.355, speed: 0.0005 },
      { name: "Mounir", lat: 50.865, lng: 4.375, speed: 0.0004 },
      { name: "Layla", lat: 50.875, lng: 4.395, speed: 0.0006 },
      { name: "Soufiane", lat: 50.885, lng: 4.415, speed: 0.0005 },
      { name: "Rachid", lat: 50.895, lng: 4.435, speed: 0.0004 },
    ];

    const taxiIcon = L.icon({
      iconUrl: "taxi.png", // Icône taxi jaune visible
      iconSize: [35, 35],
      iconAnchor: [17, 35],
    });

    const markers = drivers.map((driver) => {
      return L.marker([driver.lat, driver.lng], { icon: taxiIcon })
        .addTo(map)
        .bindPopup(`${driver.name}`);
    });

    const updatePositions = () => {
      markers.forEach((marker, index) => {
        const driver = drivers[index];
        const directionLat = Math.random() > 0.5 ? 1 : -1;
        const directionLng = Math.random() > 0.5 ? 1 : -1;
        driver.lat += directionLat * driver.speed;
        driver.lng += directionLng * driver.speed;
        marker.setLatLng([driver.lat, driver.lng]);
      });
    };

    const interval = setInterval(updatePositions, 3000); // Mise à jour toutes les 3 secondes

    return () => {
      clearInterval(interval);
      map.remove();
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "red",
          color: "white",
          padding: "5px 15px",
          borderRadius: "5px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          zIndex: 1000,
          animation: "pulse 1.5s infinite",
        }}
      >
        <span
          style={{
            display: "inline-block",
            animation: "scaleAnim 1.5s infinite",
          }}
        >
          🔴
        </span>{" "}
        En direct
      </div>
      <div
        id="map"
        style={{
          width: "100%",
          height: "500px",
          position: "relative",
          zIndex: 0,
        }}
      ></div>
      <style>
        {`@keyframes scaleAnim {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }`}
      </style>
    </div>
  );
};

export default InteractiveMap;
