import React from "react";
import { Filter } from "lucide-react";

interface StatusFilterProps {
  statusFilter: "disponible"[];
  onToggleStatusFilter: (status: "disponible") => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  statusFilter,
  onToggleStatusFilter,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <Filter size={16} className="mr-2" />
        <h3 className="text-sm font-medium">Filtrer par statut</h3>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onToggleStatusFilter("disponible")}
          className={`flex items-center gap-1 py-1 px-2 rounded-md text-xs transition-colors ${
            statusFilter.includes("disponible")
              ? "bg-sidebar-accent text-foreground"
              : "bg-sidebar-accent/40 text-muted-foreground"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#4ade80]"></span>
          Disponible
        </button>
      </div>
    </div>
  );
};

export default StatusFilter;
