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
import { DriverResponseDTO } from "@/api/driver";

interface DeleteDriverDialogProps {
  driver: DriverResponseDTO | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (driverId: number) => Promise<void>;
}

export const DeleteDriverDialog = ({
  driver,
  open,
  onOpenChange,
  onDelete,
}: DeleteDriverDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!open || !driver) {
    return null;
  }

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await onDelete(driver.id); // Attend que la suppression soit terminée
      onOpenChange(false); // Fermer le modal après la suppression
    } catch (error) {
      console.error("Error deleting driver:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le chauffeur</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer{" "}
            <b>
              {driver.firstName} {driver.lastName}
            </b>{" "}
            ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
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
                <Loader2 className="animate-spin w-4 h-4 mr-2" /> Suppression...
              </>
            ) : (
              "Supprimer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDriverDialog;
