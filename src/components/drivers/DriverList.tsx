import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { EditDriverDialog } from "./EditDriverDialog";
import { DeleteDriverDialog } from "./DeleteDriverDialog";
import { ViewDriverDialog } from "./ViewDriverDialog"; // On va créer ce composant

// Importer les données mockées au lieu des fonctions API
import { mockDrivers, mockDeleteDriver } from "./DriversMock";

// Interface pour les props
interface DriverListProps {
  filter: string;
}

export const DriverList = ({ filter }: DriverListProps) => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDriver, setEditingDriver] = useState<any>(null);
  const [deletingDriver, setDeletingDriver] = useState<any>(null);
  const [viewingDriver, setViewingDriver] = useState<any>(null); // Nouvel état pour la visualisation
  const { toast } = useToast();

  useEffect(() => {
    // Simuler le chargement des données
    const loadDrivers = async () => {
      try {
        // Simuler un délai réseau
        setTimeout(() => {
          setDrivers(mockDrivers);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des chauffeurs:", error);
        setLoading(false);
      }
    };
    loadDrivers();
  }, []);

  // Filtrage basé sur la prop filter
  const filteredDrivers = drivers.filter(
    (driver) =>
      filter === "" ||
      driver.first_name.toLowerCase().includes(filter.toLowerCase()) ||
      driver.last_name.toLowerCase().includes(filter.toLowerCase()) ||
      driver.email.toLowerCase().includes(filter.toLowerCase()) ||
      driver.phone.includes(filter)
  );

  // Fonction de suppression utilisant mockDeleteDriver
  const handleDeleteDriver = async (driverId: string) => {
    try {
      await mockDeleteDriver(driverId);
      toast({
        title: "Succès",
        description: "Chauffeur supprimé avec succès!",
        variant: "default",
      });
      setDrivers((prev) => prev.filter((driver) => driver.id !== driverId));
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression du chauffeur.",
        variant: "destructive",
      });
    }
  };

  // Fonction de mise à jour simulée
  const handleEditDriver = async (updatedDriver: any) => {
    try {
      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Succès",
        description: "Chauffeur mis à jour avec succès!",
        variant: "default",
      });

      // Mettre à jour l'état local
      setDrivers((prev) =>
        prev.map((driver) =>
          driver.id === updatedDriver.id ? updatedDriver : driver
        )
      );
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du chauffeur.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="rounded-md border shadow-lg p-4 bg-gray-900"
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
            <TableHead>Date de début</TableHead> {/* Nouvelle colonne */}
            <TableHead>Type de shift</TableHead> {/* Nouvelle colonne */}
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
                    <Skeleton className="h-6 w-24" />
                  </TableCell>{" "}
                  {/* Skeleton pour la date de début */}
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>{" "}
                  {/* Skeleton pour le type de shift */}
                  <TableCell className="text-right space-x-2">
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                </TableRow>
              ))
            : filteredDrivers.map((driver) => (
                <TableRow
                  key={driver.id}
                  className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <TableCell>
                    {driver.first_name} {driver.last_name}
                  </TableCell>
                  <TableCell>{driver.email}</TableCell>
                  <TableCell>{driver.phone}</TableCell>
                  <TableCell>
                    {new Date(driver.start_date).toLocaleDateString()}{" "}
                    {/* Affiche la date de début */}
                  </TableCell>
                  <TableCell>
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
                  <TableCell className="text-right space-x-2">
                    {/* Bouton pour voir les détails du chauffeur */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-blue-500/10 hover:bg-blue-500/20 rounded-full"
                      onClick={() => setViewingDriver(driver)}
                    >
                      <Eye className="h-4 w-4 text-blue-500" />
                    </Button>
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

      {/* Message si aucun résultat après filtrage */}
      {!loading && filteredDrivers.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Aucun chauffeur ne correspond à votre recherche
        </div>
      )}

      {/* ✅ Edit Driver Dialog */}
      <EditDriverDialog
        driver={editingDriver}
        open={!!editingDriver}
        onOpenChange={(open) => !open && setEditingDriver(null)}
        onEdit={handleEditDriver} // ✅ Pass edit function
      />

      {/* ✅ Delete Driver Dialog */}
      <DeleteDriverDialog
        driver={deletingDriver}
        open={!!deletingDriver}
        onOpenChange={(open) => !open && setDeletingDriver(null)}
        onDelete={handleDeleteDriver} // ✅ Pass delete function
      />

      {/* View Driver Dialog */}
      <ViewDriverDialog
        driver={viewingDriver}
        open={!!viewingDriver}
        onOpenChange={(open) => !open && setViewingDriver(null)}
      />
    </motion.div>
  );
};

export default DriverList;
