import React from "react";
import { X } from "lucide-react";
import { Commune, Taxi } from "../../utils/mapData";

interface TaxiDetailProps {
  selectedTaxi: Taxi;
  communes: Commune[];
  onSelectTaxi: (taxi: Taxi | null) => void;
}

const TaxiDetail: React.FC<TaxiDetailProps> = ({
  selectedTaxi,
  communes,
  onSelectTaxi,
}) => {
  const getStatusColor = (status: "disponible") => {
    return "bg-[#4ade80]";
  };

  const getStatusLabel = (status: "disponible") => {
    return "Disponible";
  };

  return (
    <div className="mt-4 p-3 glassmorphism rounded-lg animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{selectedTaxi.name}</h3>
        <button
          onClick={() => onSelectTaxi(null)}
          className="text-muted-foreground hover:text-foreground"
        >
          <X size={16} />
        </button>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">ID:</span>
          <span className="text-xs">{selectedTaxi.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Statut:</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(
              selectedTaxi.status
            )} bg-opacity-20`}
          >
            {getStatusLabel(selectedTaxi.status)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Commune:</span>
          <span>
            {communes.find((c) => c.id === selectedTaxi.commune)?.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Position:</span>
          <span className="text-xs">
            {selectedTaxi.position[1].toFixed(4)},{" "}
            {selectedTaxi.position[0].toFixed(4)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Dernière mise à jour:</span>
          <span className="text-xs">
            {new Date(selectedTaxi.lastUpdated).toLocaleTimeString("fr-FR")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaxiDetail;
