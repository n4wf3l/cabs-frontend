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
import { Loader2 } from "lucide-react"; // Icône de chargement

interface DeleteDriverDialogProps {
  driver: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (driverId: string) => Promise<void>; // Modification pour gérer une promesse
}

export const DeleteDriverDialog = ({
  driver,
  open,
  onOpenChange,
  onDelete,
}: DeleteDriverDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!driver) {
    console.error("Driver is undefined or null"); // Debug log
    return null;
  }

  const handleDelete = async () => {
    setIsLoading(true);
    console.log("Delete button clicked, calling onDelete..."); // Debug log
    console.log("Driver ID to delete:", driver.id); // Debug log

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
              {driver.first_name} {driver.last_name}
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
