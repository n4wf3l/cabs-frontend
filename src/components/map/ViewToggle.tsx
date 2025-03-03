import React from "react";
import { Compass, List, LayoutGrid } from "lucide-react";

interface ViewToggleProps {
  activeView: "map" | "list" | "stats";
  setActiveView: (view: "map" | "list" | "stats") => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  activeView,
  setActiveView,
}) => {
  return (
    <div className="flex items-center justify-between bg-sidebar-accent rounded-lg mb-4">
      <button
        onClick={() => setActiveView("map")}
        className={`flex-1 py-2 text-center text-sm font-medium rounded-lg transition-colors ${
          activeView === "map"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-sidebar-accent/60"
        }`}
      >
        <Compass size={16} className="inline mr-1" />
        Carte
      </button>
      <button
        onClick={() => setActiveView("list")}
        className={`flex-1 py-2 text-center text-sm font-medium rounded-lg transition-colors ${
          activeView === "list"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-sidebar-accent/60"
        }`}
      >
        <List size={16} className="inline mr-1" />
        Liste
      </button>
      <button
        onClick={() => setActiveView("stats")}
        className={`flex-1 py-2 text-center text-sm font-medium rounded-lg transition-colors ${
          activeView === "stats"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-sidebar-accent/60"
        }`}
      >
        <LayoutGrid size={16} className="inline mr-1" />
        Stats
      </button>
    </div>
  );
};

export default ViewToggle;
