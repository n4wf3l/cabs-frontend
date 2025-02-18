import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast, useToast } from "@/hooks/use-toast";
import { fetchChauffeurs, deleteChauffeur } from "@/api/chauffeurs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EditDriverDialog } from "@/components/drivers/EditDriverDialog";
import { DeleteDriverDialog } from "@/components/drivers/DeleteDriverDialog";
import { ShiftPagination } from "@/components/shifts/ShiftPagination";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "@/components/drivers/PDFDocument";
import {
  Pencil,
  Trash2,
  Eye,
  Plus,
  Download,
  User,
  Phone,
  Mail,
  Clock,
  Calendar,
  ArrowUpDown,
} from "lucide-react";

export const Drivers = () => {
  const { toast } = useToast();
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDriver, setEditingDriver] = useState<any>(null);
  const [deletingDriver, setDeletingDriver] = useState<any>(null);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 10;
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<"name" | "date" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  const handleExportPDF = async () => {
    setLoading(true);

    try {
      // Générer le document PDF
      const blob = await pdf(<PDFDocument drivers={drivers} />).toBlob();

      // Créer un lien de téléchargement
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "chauffeurs.pdf";
      document.body.appendChild(a);
      a.click();

      // Nettoyer après téléchargement
      URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // 🔔 Afficher le message de succès
      toast({
        title: "PDF généré avec succès !",
        description: "Votre fichier chauffeurs.pdf a bien été téléchargé.",
        duration: 3000, // Affiché pendant 3 secondes
      });
    } catch (error) {
      console.error("Erreur lors de la génération du PDF :", error);

      // Afficher un message d'erreur
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(drivers.length / driversPerPage);

  const handleSortByName = () => {
    if (sortBy === "name") {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy("name");
      setSortOrder("asc");
    }
  };

  const handleSortByDate = () => {
    if (sortBy === "date") {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy("date");
      setSortOrder("asc");
    }
  };

  const sortDrivers = (driversList: any[]) => {
    if (!sortBy) return driversList;

    return [...driversList].sort((a, b) => {
      let comparison = 0;

      if (sortBy === "name") {
        comparison = a.first_name.localeCompare(b.first_name);
      } else if (sortBy === "date") {
        comparison =
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.first_name.toLowerCase().includes(filter.toLowerCase()) ||
      driver.last_name.toLowerCase().includes(filter.toLowerCase()) ||
      driver.phone.includes(filter)
  );

  const sortedAndFilteredDrivers = sortDrivers(filteredDrivers);

  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = sortedAndFilteredDrivers.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );

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
          <Table className="w-full text-center">
            <TableHeader>
              <TableRow>
                {/* Nouvelle colonne pour l'icône 👁️ */}
                <TableHead className="w-12">
                  {" "}
                  {/* Réduit la largeur pour un meilleur alignement */}
                  <div className="flex items-center justify-center">
                    <Eye className="h-4 w-4 text-gray-500" />
                  </div>
                </TableHead>

                <TableHead
                  onClick={handleSortByName}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>Nom</span>
                    <ArrowUpDown className="h-4 w-4 text-gray-500" />
                  </div>
                </TableHead>

                <TableHead>
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>Email</span>
                  </div>
                </TableHead>

                <TableHead>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>Téléphone</span>
                  </div>
                </TableHead>

                <TableHead
                  onClick={handleSortByDate}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Date de début</span>
                    <ArrowUpDown className="h-4 w-4 text-gray-500" />
                  </div>
                </TableHead>

                <TableHead>
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Type de shift</span>
                  </div>
                </TableHead>

                <TableHead>
                  <div className="text-center">Actions</div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                Array.from({ length: driversPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-6 w-6 mx-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 mx-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-32 mx-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-24 mx-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-24 mx-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 mx-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16 mx-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : currentDrivers.length > 0 ? (
                currentDrivers.map((driver) => (
                  <TableRow
                    key={driver.id}
                    className="hover:bg-gray-900 text-white transition duration-300"
                  >
                    <TableCell className="text-center">
                      <button
                        onClick={() => navigate(`/drivers/${driver.id}`)}
                        className="text-blue-500 hover:text-blue-300"
                      >
                        <Eye className="h-8 w-8 bg-primary/10 hover:bg-primary/20 rounded-full p-1" />
                      </button>
                    </TableCell>
                    <TableCell className="text-center font-semibold text-lg text-white">
                      {driver.first_name.charAt(0).toUpperCase() +
                        driver.first_name.slice(1).toLowerCase()}{" "}
                      {driver.last_name.charAt(0).toUpperCase() +
                        driver.last_name.slice(1).toLowerCase()}
                    </TableCell>
                    <TableCell className="text-center">
                      {driver.email}
                    </TableCell>
                    <TableCell className="text-center">
                      {driver.phone}
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(driver.start_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          driver.shift_type === "Day"
                            ? "default"
                            : driver.shift_type === "Night"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {driver.shift_type === "Day"
                          ? "Jour"
                          : driver.shift_type === "Night"
                          ? "Nuit"
                          : "Long"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center space-x-2">
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
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-4 text-gray-400"
                  >
                    Aucun donnée n'est disponible dans la base de données.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>

        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.2 }}
          className="mt-8"
        >
          <ShiftPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </motion.div>

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
