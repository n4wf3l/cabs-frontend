import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VehicleDTO } from "@/api/vehicle";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface ViewVehicleDialogProps {
  vehicle: VehicleDTO | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewVehicleDialog({
  vehicle,
  open,
  onOpenChange,
}: ViewVehicleDialogProps) {
  if (!vehicle) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Détails du véhicule</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Immatriculation</TableCell>
                <TableCell>{vehicle.licensePlate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Marque</TableCell>
                <TableCell>{vehicle.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Modèle</TableCell>
                <TableCell>{vehicle.model}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Transmission</TableCell>
                <TableCell>
                  {vehicle.transmission === "MANUAL" ? "Manuelle" : "Automatique"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Kilométrage</TableCell>
                <TableCell>{vehicle.odometerKm} km</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Disponible</TableCell>
                <TableCell>{vehicle.available ? "Oui" : "Non"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">État</TableCell>
                <TableCell>
                  {vehicle.condition === "GOOD" && "Bon"}
                  {vehicle.condition === "FAIR" && "Moyen"}
                  {vehicle.condition === "POOR" && "Mauvais"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end mt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
