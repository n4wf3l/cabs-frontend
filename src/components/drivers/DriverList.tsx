import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditDriverDialog } from "./EditDriverDialog";
import { DeleteDriverDialog } from "./DeleteDriverDialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchChauffeurs, deleteChauffeur } from "@/api/chauffeurs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

export const DriverList = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDriver, setEditingDriver] = useState<any>(null);
  const [deletingDriver, setDeletingDriver] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadDrivers = async () => {
      try {
        const data = await fetchChauffeurs();
        setDrivers(data);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des chauffeurs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDrivers();
  }, []);

  // ✅ Handle delete driver
  const handleDeleteDriver = async (driverId: string) => {
    try {
      await deleteChauffeur(driverId);
      toast({
        title: "Succès",
        description: "Chauffeur supprimé avec succès!",
        variant: "default",
      });
      setDrivers((prev) => prev.filter((driver) => driver.id !== driverId)); // ✅ Remove deleted driver from state
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression du chauffeur.",
        variant: "destructive",
      });
    }
  };

  // ✅ Handle edit driver (updates state)
  const handleEditDriver = (updatedDriver: any) => {
    setDrivers((prev) =>
      prev.map((driver) => (driver.id === updatedDriver.id ? updatedDriver : driver))
    );
  };

  return (
    <>
      <div className="rounded-md border">
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
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell className="text-right space-x-2">
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>{driver.first_name} {driver.last_name}</TableCell>
                  <TableCell>{driver.email}</TableCell>
                  <TableCell>{driver.phone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={driver.employment_status === "Active" ? "default" : "secondary"}
                    >
                      {driver.employment_status === "Active" ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingDriver(driver)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingDriver(driver)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EditDriverDialog
        driver={editingDriver}
        open={!!editingDriver}
        onOpenChange={(open) => !open && setEditingDriver(null)}
        onEdit={handleEditDriver} // ✅ Pass edit function
      />
      <DeleteDriverDialog
        driver={deletingDriver}
        open={!!deletingDriver}
        onOpenChange={(open) => !open && setDeletingDriver(null)}
        onDelete={handleDeleteDriver} // ✅ Pass delete function
      />
    </>
  );
};
