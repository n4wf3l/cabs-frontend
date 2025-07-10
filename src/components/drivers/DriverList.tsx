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
import { ViewDriverDialog } from "./ViewDriverDialog";
import { DriverResponse, fetchDrivers, deleteDriver, updateDriver } from "@/api/driver";
import FullScreenLoader from "./FullScreenLoader";

// Interface pour les props
interface DriverListProps {
  filter: string;
}

export const DriverList = ({ filter }: DriverListProps) => {
  const [drivers, setDrivers] = useState<DriverResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDriver, setEditingDriver] = useState<DriverResponse | null>(null);
  const [deletingDriver, setDeletingDriver] = useState<DriverResponse | null>(null);
  const [viewingDriver, setViewingDriver] = useState<DriverResponse | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadDrivers = async () => {
      try {
        setLoading(true);
        const data = await fetchDrivers();
        setDrivers(data);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des chauffeurs:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger la liste des chauffeurs.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    loadDrivers();
  }, [toast]);

  // Filtrage basé sur la prop filter
  const filteredDrivers = drivers.filter(
    (driver) =>
      filter === "" ||
      driver.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      driver.lastName.toLowerCase().includes(filter.toLowerCase()) ||
      driver.email.toLowerCase().includes(filter.toLowerCase()) ||
      driver.phoneNumber.includes(filter)
  );

  // Fonction de suppression utilisant mockDeleteDriver
  const handleDeleteDriver = async (driverId: number) => {
    try {
      await deleteDriver(driverId);
      toast({
        title: "Succès",
        description: "Chauffeur supprimé avec succès!",
        variant: "default",
      });
      setDrivers((prev) => prev.filter((driver) => driver.id !== driverId));
    } catch (error: any) {
      console.error("❌ Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: error.response?.data?.message || "Erreur lors de la suppression du chauffeur.",
        variant: "destructive",
      });
    }
  };

  // Fonction pour recharger la liste des chauffeurs
  const reloadDrivers = async () => {
    try {
      const data = await fetchDrivers();
      setDrivers(data);
    } catch (error) {
      console.error("❌ Erreur lors du rechargement des chauffeurs:", error);
    }
  };

  // Fonction de mise à jour
  const handleEditDriver = async (updatedDriver: DriverResponse & { password?: string }) => {
    try {
      // On crée un objet UpdateDriverRequest en ajoutant un mot de passe temporaire si nécessaire
      const updateData = {
        ...updatedDriver,
        password: updatedDriver.password || 'defaultPassword123' // Le backend devrait ignorer ce champ si non modifié
      };
      
      await updateDriver(updatedDriver.id, updateData);
      toast({
        title: "Succès",
        description: "Chauffeur mis à jour avec succès!",
        variant: "default",
      });

      // Recharger la liste complète pour avoir les données à jour
      await reloadDrivers();
    } catch (error: any) {
      console.error("❌ Erreur lors de la mise à jour:", error);
      toast({
        title: "Erreur",
        description: error.response?.data?.message || "Erreur lors de la mise à jour du chauffeur.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative">
      {loading && <FullScreenLoader isLoading={loading} />}
      
      <motion.div
        className="rounded-xl border border-gray-800 shadow-2xl bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* En-tête avec statistiques */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">Gestion des Chauffeurs</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-sm text-gray-400">Total Chauffeurs</div>
              <div className="text-2xl font-bold text-white">{drivers.length}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-sm text-gray-400">Chauffeurs Actifs</div>
              <div className="text-2xl font-bold text-green-500">
                {drivers.filter(d => !d.onLeave).length}
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-sm text-gray-400">En Congé</div>
              <div className="text-2xl font-bold text-yellow-500">
                {drivers.filter(d => d.onLeave).length}
              </div>
            </div>
          </div>
        </div>

        {/* Table avec design amélioré */}
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Nom</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Téléphone</TableHead>
                <TableHead className="text-gray-400">Adresse</TableHead>
                <TableHead className="text-gray-400">Paiements</TableHead>
                <TableHead className="text-gray-400">Statut</TableHead>
                <TableHead className="text-right text-gray-400">Actions</TableHead>
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
                    <Skeleton className="h-6 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                </TableRow>
              ))
            : filteredDrivers.map((driver) => (
                <TableRow
                  key={driver.id}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition-all duration-200"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-lg font-semibold text-white">
                          {driver.firstName[0]}{driver.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-white">{driver.firstName} {driver.lastName}</div>
                        <div className="text-sm text-gray-400">{driver.cityOfBirth}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-white">{driver.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-white">{driver.phoneNumber}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-white">{driver.address}</div>
                    <div className="text-sm text-gray-400">{driver.postalCode}</div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={driver.paymentsEnabled ? "default" : "secondary"}
                      className={driver.paymentsEnabled ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : ""}
                    >
                      {driver.paymentsEnabled ? "Activés" : "Désactivés"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={driver.onLeave ? "destructive" : driver.availableForReplacement ? "default" : "secondary"}
                      className={`
                        ${driver.onLeave ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : ""}
                        ${driver.availableForReplacement ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : ""}
                      `}
                    >
                      {driver.onLeave ? "En congé" : driver.availableForReplacement ? "Disponible" : "Occupé"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-blue-500/10 hover:bg-blue-500/20 rounded-full hover:scale-105 transition-transform"
                        onClick={() => setViewingDriver(driver)}
                      >
                        <Eye className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-primary/10 hover:bg-primary/20 rounded-full hover:scale-105 transition-transform"
                        onClick={() => setEditingDriver(driver)}
                      >
                        <Pencil className="h-4 w-4 text-primary" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-red-500/10 hover:bg-red-500/20 rounded-full hover:scale-105 transition-transform"
                        onClick={() => setDeletingDriver(driver)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Message si aucun résultat après filtrage */}
        {!loading && filteredDrivers.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Aucun chauffeur ne correspond à votre recherche
          </div>
        )}
      </motion.div>

      {/* Dialogs */}
      <EditDriverDialog
        driver={editingDriver}
        open={!!editingDriver}
        onOpenChange={(open) => !open && setEditingDriver(null)}
        onEdit={handleEditDriver}
      />

      <DeleteDriverDialog
        driver={deletingDriver}
        open={!!deletingDriver}
        onOpenChange={(open) => !open && setDeletingDriver(null)}
        onDelete={handleDeleteDriver}
      />

      <ViewDriverDialog
        driver={viewingDriver}
        open={!!viewingDriver}
        onOpenChange={(open) => !open && setViewingDriver(null)}
      />
    </div>
  );
};

export default DriverList;
