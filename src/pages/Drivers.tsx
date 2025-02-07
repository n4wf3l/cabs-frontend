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
import { Pencil, Trash2, Plus, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchChauffeurs } from "@/api/chauffeurs"; // Import API function
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const Drivers = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDriver, setEditingDriver] = useState<any>(null);
  const [deletingDriver, setDeletingDriver] = useState<any>(null);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadDrivers = async () => {
      try {
        const data = await fetchChauffeurs();
        setDrivers(data);
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

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.first_name.toLowerCase().includes(filter.toLowerCase()) ||
      driver.last_name.toLowerCase().includes(filter.toLowerCase()) ||
      driver.phone.includes(filter)
  );

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

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            type="text"
            placeholder="Rechercher par nom ou téléphone"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <motion.div
          className="rounded-md border shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Table>
            <TableHeader>
              <TableRow>
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
                : filteredDrivers.map((driver) => (
                    <TableRow
                      key={driver.id}
                      className="border-b border-gray-200 hover:bg-gray-900"
                    >
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

        <EditDriverDialog
          driver={editingDriver}
          open={!!editingDriver}
          onOpenChange={(open) => !open && setEditingDriver(null)}
        />
        <DeleteDriverDialog
          driver={deletingDriver}
          open={!!deletingDriver}
          onOpenChange={(open) => !open && setDeletingDriver(null)}
        />
      </main>
    </div>
  );
};

export default Drivers;
