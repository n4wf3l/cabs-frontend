import React from "react";
import { Taxi } from "../../utils/mapData";

interface SidebarStatsProps {
  filteredTaxis: Taxi[];
}

const SidebarStats: React.FC<SidebarStatsProps> = ({ filteredTaxis }) => {
  const totalTaxis = filteredTaxis.length;
  const availableTaxis = filteredTaxis.filter(
    (t) => t.status === "disponible"
  ).length;

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="glassmorphism rounded-lg p-2 text-center">
        <div className="text-lg font-semibold">{totalTaxis}</div>
        <div className="text-xs text-muted-foreground">Total</div>
      </div>
      <div className="glassmorphism rounded-lg p-2 text-center">
        <div className="text-lg font-semibold text-[#4ade80]">
          {availableTaxis}
        </div>
        <div className="text-xs text-muted-foreground">Disponibles</div>
      </div>
    </div>
  );
};

export default SidebarStats;
