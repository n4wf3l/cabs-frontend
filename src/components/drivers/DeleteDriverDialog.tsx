import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDriverDialogProps {
  driver: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (driverId: string) => void;
}

export const DeleteDriverDialog = ({
  driver,
  open,
  onOpenChange,
  onDelete,
}: DeleteDriverDialogProps) => {
  if (!driver) {
    console.error("Driver is undefined or null"); // Debug log
    return null;
  }

  const handleDelete = () => {
    console.log("Delete button clicked, calling onDelete..."); // Debug log
    console.log("Driver ID to delete:", driver.id); // Debug log
    onDelete(driver.id);
    onOpenChange(false);
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
          >
            Annuler
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDriverDialog;