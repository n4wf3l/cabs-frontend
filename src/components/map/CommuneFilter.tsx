import React from "react";
import { Commune } from "../../utils/mapData";
import { Check, Filter } from "lucide-react";

interface CommuneFilterProps {
  communes: Commune[];
  selectedCommunes: string[];
  onToggleCommune: (communeId: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

const CommuneFilter: React.FC<CommuneFilterProps> = ({
  communes,
  selectedCommunes,
  onToggleCommune,
  onSelectAll,
  onClearAll,
}) => {
  // Trie les communes par nombre de taxis (décroissant)
  const sortedCommunes = [...communes].sort(
    (a, b) => b.taxiCount - a.taxiCount
  );

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Filter size={16} />
          <h3 className="text-sm font-medium">Filtrer par commune</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSelectAll}
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Tout
          </button>
          <span className="text-xs text-muted-foreground">|</span>
          <button
            onClick={onClearAll}
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Aucun
          </button>
        </div>
      </div>

      <div className="space-y-1 max-h-[380px] overflow-y-auto pr-2">
        {sortedCommunes.map((commune) => (
          <div
            key={commune.id}
            onClick={() => onToggleCommune(commune.id)}
            className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
              selectedCommunes.includes(commune.id)
                ? "bg-sidebar-accent text-foreground"
                : "hover:bg-sidebar-accent/50 text-muted-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                  selectedCommunes.includes(commune.id)
                    ? "bg-primary text-primary-foreground"
                    : "border border-muted-foreground"
                }`}
              >
                {selectedCommunes.includes(commune.id) && <Check size={12} />}
              </div>
              <span className="text-sm">{commune.name}</span>
            </div>
            <span className="badge">{commune.taxiCount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommuneFilter;
