import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DriverList } from "@/components/drivers/DriverList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion"; // 👉 Ajout de Framer Motion pour une animation fluide

const Drivers = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar responsive */}
      <div className="fixed z-50 md:relative md:translate-x-0 transition-transform duration-300">
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <main className="flex-1 p-4 md:p-8 transition-all duration-300 md:ml-64">
        <motion.div
          className="flex flex-col items-center justify-center pr-60 md:pr-0 md:flex-row md:justify-between mt-10 md:mt-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Titre centré en mobile, à gauche en desktop */}
          <h1 className="text-2xl font-bold mb-2 md:mb-0 text-center md:text-left">
            Chauffeurs
          </h1>

          {/* Bouton centré en mobile, aligné à droite en desktop */}
          <Button
            onClick={() => navigate("/drivers/add")}
            className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm mt-2 md:mt-0"
          >
            <Plus size={14} className="mr-1" />
            Ajouter
          </Button>
        </motion.div>

        <hr className="hr-light-effect mt-10 mb-10" />

        {/* Liste des chauffeurs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <DriverList />
        </motion.div>
      </main>
    </div>
  );
};

export default Drivers;
