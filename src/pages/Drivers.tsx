import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "@/hooks/use-toast";
import { fetchChauffeurs, deleteChauffeur } from "@/api/chauffeurs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/dashboard/Sidebar";
import DriverList from "@/components/drivers/DriverList";
import { EditDriverDialog } from "@/components/drivers/EditDriverDialog";
import { DeleteDriverDialog } from "@/components/drivers/DeleteDriverDialog";
import { ShiftPagination } from "@/components/shifts/ShiftPagination";
import { Plus, Download } from "lucide-react";

export const Drivers = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDriver, setEditingDriver] = useState<any>(null);
  const [deletingDriver, setDeletingDriver] = useState<any>(null);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const loadDrivers = async () => {
      try {
        const data = await fetchChauffeurs();

        const sortedData = data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setDrivers(sortedData);
      } catch (error) {
        console.error("Erreur lors du chargement des chauffeurs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDrivers();
  }, []);

  const totalPages = Math.ceil(drivers.length / driversPerPage);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des Chauffeurs", 14, 20);
    autoTable(doc, {
      head: [["Nom", "Email", "Téléphone", "Statut"]],
      body: drivers.map((driver) => [
        `${driver.first_name} ${driver.last_name}`,
        driver.email,
        driver.phone,
        driver.employment_status === "Active" ? "Actif" : "Inactif",
      ]),
    });
    doc.save("chauffeurs.pdf");
  };

  const handleDeleteDriver = async (driverId: string) => {
    try {
      await deleteChauffeur(driverId);
      setDrivers((prevDrivers) =>
        prevDrivers.filter((driver) => driver.id !== driverId)
      );

      toast({
        title: "Succès",
        description: "Le chauffeur a été supprimé avec succès.",
        variant: "default",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du chauffeur:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full">
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
              onClick={() => navigate("/drivers/add")}
              className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm bg-primary text-white rounded-lg shadow-md hover:bg-primary/80"
            >
              <Plus size={14} className="mr-1" /> Ajouter
            </Button>
            <Button
              onClick={handleExportPDF}
              className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm bg-secondary text-white rounded-lg shadow-md hover:bg-secondary/80"
            >
              <Download size={14} className="mr-1" /> Exporter PDF
            </Button>
          </div>
        </motion.div>

        <hr className="hr-light-effect mt-10 mb-10" />

        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Input
            type="text"
            placeholder="Rechercher par nom ou téléphone"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </motion.div>

        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: -20, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mt-8"
        >
          <DriverList
            drivers={drivers}
            loading={loading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            driversPerPage={driversPerPage}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-8"
          >
            <ShiftPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </motion.div>
        </motion.div>

        {/* Dialogues pour l'édition et la suppression */}
        <EditDriverDialog
          driver={editingDriver}
          open={!!editingDriver}
          onOpenChange={(open) => !open && setEditingDriver(null)}
          onEdit={(updatedDriver) => {
            setDrivers((prevDrivers) =>
              prevDrivers.map((driver) =>
                driver.id === updatedDriver.id ? updatedDriver : driver
              )
            );
          }}
        />
        {deletingDriver !== null && deletingDriver !== undefined && (
          <DeleteDriverDialog
            driver={deletingDriver}
            open={!!deletingDriver}
            onOpenChange={(open) => {
              if (!open) {
                setTimeout(() => setDeletingDriver(null), 300);
              }
            }}
            onDelete={handleDeleteDriver}
          />
        )}
      </main>
    </div>
  );
};

export default Drivers;
