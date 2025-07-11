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
import {
  DriverResponseDTO,
  fetchDrivers,
  deleteDriver,
  updateDriver,
} from "@/api/driver";

// Interface pour les props
interface DriverListProps {
  filter: string;
}

export const DriverList = ({ filter }: DriverListProps) => {
  const [drivers, setDrivers] = useState<DriverResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [editingDriver, setEditingDriver] = useState<DriverResponseDTO | null>(
    null
  );
  const [deletingDriver, setDeletingDriver] =
    useState<DriverResponseDTO | null>(null);
  const [viewingDriver, setViewingDriver] = useState<DriverResponseDTO | null>(
    null
  );
  const { toast } = useToast();

  // Fonction pour charger les chauffeurs
  const loadDrivers = async () => {
    if (!initialized) {
      setInitialized(true);
    }

    try {
      setLoading(true);
      const data = await fetchDrivers();
      setDrivers(data);
      setError(null);
    } catch (error) {
      console.error("❌ Erreur lors du chargement des chauffeurs:", error);
      setError("Impossible de charger les chauffeurs.");
      setDrivers([]); // En cas d'erreur, initialiser avec un tableau vide
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ne pas afficher le loader lors du chargement initial
    if (!initialized) {
      loadDrivers();
    }
  }, [initialized]);

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
        description:
          error.response?.data?.message ||
          "Erreur lors de la suppression du chauffeur.",
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
  const handleEditDriver = async (
    updatedDriver: DriverResponseDTO & { password?: string }
  ) => {
    try {
      // On crée un objet UpdateDriverRequest en ajoutant un mot de passe temporaire si nécessaire
      const updateData = {
        ...updatedDriver,
        password: updatedDriver.password || "defaultPassword123", // Le backend devrait ignorer ce champ si non modifié
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
        description:
          error.response?.data?.message ||
          "Erreur lors de la mise à jour du chauffeur.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative">
      {/* N'afficher le FullScreenLoader que si on est déjà initialisé */}

      <motion.div
        className="rounded-xl border border-gray-800 shadow-2xl bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* En-tête avec statistiques */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">
            Gestion des Chauffeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Box 1: Total Chauffeurs */}
            <motion.div
              className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg border border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-6 -mt-6"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500/10 rounded-full -ml-4 -mb-4"></div>

              <div className="p-6 flex items-start space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-slate-400">
                    Total Chauffeurs
                  </h3>
                  <div className="flex items-baseline mt-1">
                    <motion.p
                      className="text-3xl font-bold text-white"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {drivers.length}
                    </motion.p>
                    <span className="ml-2 text-xs text-slate-400">
                      chauffeurs
                    </span>
                  </div>
                  <div className="h-1 w-full bg-slate-700 rounded-full mt-3">
                    <div
                      className="h-1 bg-blue-500 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Box 2: Chauffeurs Actifs */}
            <motion.div
              className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg border border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-6 -mt-6"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-500/10 rounded-full -ml-4 -mb-4"></div>

              <div className="p-6 flex items-start space-x-4">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-slate-400">
                    Chauffeurs Actifs
                  </h3>
                  <div className="flex items-baseline mt-1">
                    <motion.p
                      className="text-3xl font-bold text-green-400"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.4,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {drivers.filter((d) => !d.onLeave).length}
                    </motion.p>
                    <span className="ml-2 text-xs text-slate-400">
                      chauffeurs
                    </span>
                  </div>
                  <div className="h-1 w-full bg-slate-700 rounded-full mt-3">
                    <div
                      className="h-1 bg-green-500 rounded-full"
                      style={{
                        width:
                          drivers.length > 0
                            ? `${
                                (drivers.filter((d) => !d.onLeave).length /
                                  drivers.length) *
                                100
                              }%`
                            : "0%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Box 3: Chauffeurs en Congé */}
            <motion.div
              className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg border border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full -mr-6 -mt-6"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-full -ml-4 -mb-4"></div>

              <div className="p-6 flex items-start space-x-4">
                <div className="bg-amber-500/20 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-slate-400">
                    En Congé
                  </h3>
                  <div className="flex items-baseline mt-1">
                    <motion.p
                      className="text-3xl font-bold text-amber-400"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {drivers.filter((d) => d.onLeave).length}
                    </motion.p>
                    <span className="ml-2 text-xs text-slate-400">
                      chauffeurs
                    </span>
                  </div>
                  <div className="h-1 w-full bg-slate-700 rounded-full mt-3">
                    <div
                      className="h-1 bg-amber-500 rounded-full"
                      style={{
                        width:
                          drivers.length > 0
                            ? `${
                                (drivers.filter((d) => d.onLeave).length /
                                  drivers.length) *
                                100
                              }%`
                            : "0%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
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
                <TableHead className="text-right text-gray-400">
                  Actions
                </TableHead>
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
                              {driver.firstName[0]}
                              {driver.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {driver.firstName} {driver.lastName}
                            </div>
                            <div className="text-sm text-gray-400">
                              {driver.cityOfBirth}
                            </div>
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
                        <div className="text-sm text-gray-400">
                          {driver.postalCode}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            driver.paymentsEnabled ? "default" : "secondary"
                          }
                          className={
                            driver.paymentsEnabled
                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                              : ""
                          }
                        >
                          {driver.paymentsEnabled ? "Activés" : "Désactivés"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            driver.onLeave
                              ? "destructive"
                              : driver.availableForReplacement
                              ? "default"
                              : "secondary"
                          }
                          className={`
                        ${
                          driver.onLeave
                            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                            : ""
                        }
                        ${
                          driver.availableForReplacement
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            : ""
                        }
                      `}
                        >
                          {driver.onLeave
                            ? "En congé"
                            : driver.availableForReplacement
                            ? "Disponible"
                            : "Occupé"}
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
