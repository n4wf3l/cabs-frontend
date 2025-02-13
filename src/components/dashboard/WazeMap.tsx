import { useState } from "react";
import { FiLoader } from "react-icons/fi"; // Import du spinner react-icons

const WazeMap = () => {
  // 📍 Coordonnées de Bruxelles
  const latitude = 50.8503;
  const longitude = 4.3517;
  const wazeUrl = `https://embed.waze.com/iframe?zoom=12&lat=${latitude}&lon=${longitude}`;

  // 🔄 État pour gérer le chargement
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full h-[700px] rounded-lg shadow-lg overflow-hidden relative">
      {/* Loader (spinner qui tourne) */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
          <FiLoader className="text-white text-4xl animate-spin" />{" "}
          {/* Spinner animé */}
          <p className="text-white text-lg mt-2">Chargement de la carte...</p>
        </div>
      )}

      {/* Carte Waze */}
      <iframe
        src={wazeUrl}
        width="100%"
        height="100%"
        allowFullScreen
        title="Carte Waze - Bruxelles"
        onLoad={() => setLoading(false)} // Désactiver le loading une fois chargé
        className={`${
          loading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
      ></iframe>
    </div>
  );
};

export default WazeMap;
