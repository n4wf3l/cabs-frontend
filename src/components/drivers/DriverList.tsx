import { useState } from "react";
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

// Mock data - replace with real data later
const mockDrivers = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    status: "active",
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie.martin@example.com",
    phone: "+33 6 98 76 54 32",
    status: "inactive",
  },
];

export const DriverList = () => {
  const [editingDriver, setEditingDriver] = useState<any>(null);
  const [deletingDriver, setDeletingDriver] = useState<any>(null);

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
            {mockDrivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>{driver.name}</TableCell>
                <TableCell>{driver.email}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>
                  <Badge
                    variant={driver.status === "active" ? "default" : "secondary"}
                  >
                    {driver.status === "active" ? "Actif" : "Inactif"}
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
            ))}
          </TableBody>
        </Table>
      </div>

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
    </>
  );
};