import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface RouteSheetHeaderProps {
  onCreateNew: () => void;
  onExport: () => void;
}

export const RouteSheetHeader = ({ onCreateNew, onExport }: RouteSheetHeaderProps) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-bold">Feuilles de Route</h1>
        <p className="text-muted-foreground mt-1">
          Consultez et gérez les feuilles de route de vos chauffeurs
        </p>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
     
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={onExport}
        >
          <Download size={16} />
          Exporter
        </Button>
      </div>
    </motion.div>
  );
};
