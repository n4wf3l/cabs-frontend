import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const InteractiveMap: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const map = L.map("map", {
      zoomControl: true, // Active les boutons + et -
      scrollWheelZoom: false, // Désactive le zoom avec la molette
      doubleClickZoom: false, // Désactive le zoom au double-clic
      touchZoom: false, // Désactive le zoom tactile
      dragging: true, // Permet le déplacement
    }).setView([50.8503, 4.3517], 12);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "Taxi Time",
      }
    )
      .addTo(map)
      .on("load", () => setLoading(false)); // Cache le loader une fois la carte chargée

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
      iconUrl: "taxi.png",
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

    const interval = setInterval(updatePositions, 3000);

    return () => {
      clearInterval(interval);
      map.remove();
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Loader animé */}
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "6px solid rgba(255, 255, 255, 0.3)",
              borderTop: "6px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
      )}

      {/* Carte interactive */}
      <div
        id="map"
        style={{
          width: "100%",
          height: "500px",
          position: "relative",
          zIndex: 0,
          opacity: loading ? 0 : 1, // Transition fluide
          transition: "opacity 0.5s ease-in-out",
        }}
      ></div>

      {/* Animation du loader */}
      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        `}
      </style>
    </div>
  );
};

export default InteractiveMap;
