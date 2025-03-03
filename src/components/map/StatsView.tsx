import React from "react";
import { LayoutGrid } from "lucide-react";
import { Commune } from "../../utils/mapData";

interface StatsViewProps {
  communes: Commune[];
}

const StatsView: React.FC<StatsViewProps> = ({ communes }) => {
  return (
    <div className="space-y-4 animate-fade-in overflow-y-auto h-full pr-2">
      <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
        <LayoutGrid size={16} />
        Statistiques par commune
      </h3>

      {communes
        .filter((c) => c.taxiCount > 0)
        .sort((a, b) => b.taxiCount - a.taxiCount)
        .map((commune) => (
          <div key={commune.id} className="glassmorphism p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{commune.name}</div>
              <div className="badge">{commune.taxiCount}</div>
            </div>
            <div className="w-full bg-sidebar-accent h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full"
                style={{
                  width: `${
                    (commune.taxiCount /
                      Math.max(...communes.map((c) => c.taxiCount))) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default StatsView;
