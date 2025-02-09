import { useState, useEffect } from "react";
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
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { deleteChauffeur, fetchChauffeurs } from "@/api/chauffeurs";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export const DriverList = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDriver, setEditingDriver] = useState<any>(null);
  const [deletingDriver, setDeletingDriver] = useState<any>(null);

  useEffect(() => {
    const loadDrivers = async () => {
      try {
        const data = await fetchChauffeurs();
        // Trier les chauffeurs par date de création décroissante (plus récent en premier)
        const sortedData = data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setDrivers(sortedData);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des chauffeurs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDrivers();
  }, []);

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
            : drivers
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((driver) => (
                  <motion.tr
                    key={driver.id}
                    initial={
                      highlightedDriverId === driver.id
                        ? { backgroundColor: "#D1FAE5", scale: 1.02 }
                        : {}
                    }
                    animate={{
                      backgroundColor:
                        highlightedDriverId === driver.id ? "#D1FAE5" : "#FFF",
                      scale: 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="border-b border-gray-200 hover:bg-gray-50"
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
                  </motion.tr>
                ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default DriverList;
