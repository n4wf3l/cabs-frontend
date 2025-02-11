import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditDriverDialog } from "@/components/drivers/EditDriverDialog";
import { DeleteDriverDialog } from "@/components/drivers/DeleteDriverDialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, Download, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { deleteChauffeur, fetchChauffeurs } from "@/api/chauffeurs"; // Import API function
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "@/hooks/use-toast";

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

        // Trier les chauffeurs par date de création décroissante (plus récents en premier)
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

  const filteredDrivers = drivers
    .filter(
      (driver) =>
        driver.first_name.toLowerCase().includes(filter.toLowerCase()) ||
        driver.last_name.toLowerCase().includes(filter.toLowerCase()) ||
        driver.phone.includes(filter)
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ); // Trier après filtrage

  // Pagination
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = filteredDrivers.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );

  const handleDeleteDriver = async (driverId: string) => {
    console.log("🚀 handleDeleteDriver called with driverId:", driverId);

    try {
      console.log("🗑 Calling deleteChauffeur API...");
      await deleteChauffeur(driverId); // Ensure this API function is imported

      console.log("✅ Driver deleted successfully, updating state...");
      setDrivers((prevDrivers) => {
        const updatedDrivers = prevDrivers.filter(
          (driver) => driver.id !== driverId
        );
        console.log("🔄 Updated drivers list:", updatedDrivers);
        return [...updatedDrivers]; // Ensure React re-renders the list
      });

      toast({
        title: "Succès",
        description: "Le chauffeur a été supprimé avec succès.",
        variant: "default",
      });
    } catch (error) {
      console.error("❌ Error deleting driver:", error);
      toast({
        title: "Erreur",
        description:
          "Une erreur s'est produite lors de la suppression du chauffeur.",
        variant: "destructive",
      });
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          className="rounded-md border shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profil</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index} className="border-b border-gray-200">
                      <TableCell>
                        <Skeleton className="h-6 w-6" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16" />
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Skeleton className="h-6 w-16" />
                      </TableCell>
                    </TableRow>
                  ))
                : currentDrivers.map((driver) => (
                    <TableRow
                      key={driver.id}
                      className="border-b border-gray-200 hover:bg-gray-900"
                    >
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/drivers/${driver.id}`)}
                          className="bg-primary/10 hover:bg-primary/20 rounded-full"
                        >
                          <User className="h-4 w-4 text-primary" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        {driver.first_name} {driver.last_name}
                      </TableCell>
                      <TableCell>{driver.email}</TableCell>
                      <TableCell>{driver.phone}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            driver.employment_status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {driver.employment_status === "Active"
                            ? "Actif"
                            : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-primary/10 hover:bg-primary/20 rounded-full"
                          onClick={() => setEditingDriver(driver)}
                        >
                          <Pencil className="h-4 w-4 text-primary" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-red-500/10 hover:bg-red-500/20 rounded-full"
                          onClick={() => setDeletingDriver(driver)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {[...Array(Math.ceil(filteredDrivers.length / driversPerPage))].map(
            (_, index) => (
              <Button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 text-sm rounded-lg shadow-md ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {index + 1}
              </Button>
            )
          )}
        </div>

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
