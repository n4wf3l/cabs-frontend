import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

interface RouteSheetHeaderProps {
  onCreateNew: () => void;
  onExport: () => void;
}

export const RouteSheetHeader = ({ onCreateNew, onExport }: RouteSheetHeaderProps) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Feuilles de Route</h1>
        <p className="text-muted-foreground mt-1">
          Consultez et gérez les feuilles de route de vos chauffeurs
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="default" 
          className="gap-2"
          onClick={onCreateNew}
        >
          <Plus size={16} />
          Nouvelle feuille
        </Button>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={onExport}
        >
          <Download size={16} />
          Exporter
        </Button>
      </div>
    </div>
  );
};
