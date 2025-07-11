import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { VehicleDTO } from "@/api/models/VehicleDTO";


interface DeleteVehicleDialogProps {
  vehicle: VehicleDTO | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (vehicleId: number) => Promise<void>;
}

export function DeleteVehicleDialog({
  vehicle,
  open,
  onOpenChange,
  onDelete,
}: DeleteVehicleDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!open || !vehicle) {
    return null;
  }

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(vehicle.id);
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le véhicule</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer le véhicule {vehicle.brand} {vehicle.model} ({vehicle.licensePlate}) ?
            Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                "Supprimer"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
