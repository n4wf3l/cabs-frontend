import React from "react";
import { Info } from "lucide-react";

const SidebarFooter: React.FC = () => {
  return (
    <div className="mt-4 text-xs text-center text-muted-foreground">
      <div className="flex items-center justify-center gap-1">
        <Info size={12} />
        <span>Tableau de bord des taxis de votre société</span>
      </div>
    </div>
  );
};

export default SidebarFooter;
