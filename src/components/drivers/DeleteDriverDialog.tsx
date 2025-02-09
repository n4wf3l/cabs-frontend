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
  onDelete: (driverId: string) => void; // ✅ Added onDelete prop
}

export const DeleteDriverDialog = ({
  driver,
  open,
  onOpenChange,
  onDelete,
}: DeleteDriverDialogProps) => {
  if (!driver) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le chauffeur</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer <b>{driver.first_name} {driver.last_name}</b> ?
            Cette action est irréversible.
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
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              onDelete(driver.id); // ✅ Call delete function
              onOpenChange(false); // ✅ Close modal
            }}
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
