import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DriversHeaderProps {
  onAddClick: () => void;
}

export const DriversHeader = ({ onAddClick }: DriversHeaderProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleExportPDF = async () => {
    setLoading(true);
    try {
      // TODO: Implémenter l'export PDF réel avec l'API
      toast({
        title: "Fonctionnalité à venir",
        description: "L'export PDF sera bientôt disponible.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center md:text-left">
        Chauffeurs
      </h1>
      <div className="flex gap-4">
        <Button
          onClick={onAddClick}
          className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm bg-primary text-white rounded-lg shadow-md hover:bg-primary/80"
        >
          <Plus size={14} className="mr-1" /> Ajouter
        </Button>
        <div>
          <Button
            onClick={handleExportPDF}
            className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm bg-secondary text-white rounded-lg shadow-md hover:bg-secondary/80"
            disabled={loading}
          >
            <Download size={14} className="mr-1" />{" "}
            {loading ? "Génération..." : "Exporter PDF"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DriversHeader;
