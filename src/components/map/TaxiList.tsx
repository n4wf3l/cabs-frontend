import React from "react";
import { Car, MapPin } from "lucide-react";
import { Commune, Taxi } from "../../utils/mapData";

interface TaxiListProps {
  filteredTaxis: Taxi[];
  communes: Commune[];
  selectedTaxi: Taxi | null;
  onSelectTaxi: (taxi: Taxi | null) => void;
  onFlyToTaxi: (taxi: Taxi) => void;
  activeView: "map" | "list" | "stats"; // Ajout ici
  setActiveView: React.Dispatch<React.SetStateAction<"map" | "list" | "stats">>;
}

const TaxiList: React.FC<TaxiListProps> = ({
  filteredTaxis,
  communes,
  selectedTaxi,
  activeView,
  setActiveView,
  onSelectTaxi,
  onFlyToTaxi,
}) => {
  const getStatusColor = (status: "disponible") => {
    return "bg-[#4ade80]";
  };

  const getStatusLabel = (status: "disponible") => {
    return "Disponible";
  };

  return (
    <div className="space-y-3 animate-fade-in overflow-y-auto h-full pr-2">
      <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
        <Car size={16} />
        Liste des taxis ({filteredTaxis.length})
      </h3>

      {filteredTaxis.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <div className="mb-2">Aucun taxi trouvé</div>
          <div className="text-xs">
            Ajustez vos filtres pour voir plus de résultats
          </div>
        </div>
      ) : (
        filteredTaxis.map((taxi) => (
          <div
            key={taxi.id}
            onClick={() => {
              onSelectTaxi(taxi);
              onFlyToTaxi(taxi);
            }}
            className={`glassmorphism p-3 rounded-lg cursor-pointer transition-all ${
              selectedTaxi?.id === taxi.id
                ? "ring-1 ring-primary"
                : "hover:bg-sidebar-accent/30"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium">{taxi.name}</div>
              <div
                className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(
                  taxi.status
                )} bg-opacity-20`}
              >
                {getStatusLabel(taxi.status)}
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin size={12} className="mr-1" />
              {communes.find((c) => c.id === taxi.commune)?.name ||
                taxi.commune}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaxiList;
