import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface DeleteDriverDialogProps {
  driver: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteDriverDialog = ({
  driver,
  open,
  onOpenChange,
}: DeleteDriverDialogProps) => {
  const { toast } = useToast();

  const handleDelete = () => {
    // Delete driver logic here
    toast({
      title: "Chauffeur supprimé",
      description: "Le chauffeur a été supprimé avec succès.",
    });
    onOpenChange(false);
  };

  if (!driver) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le chauffeur</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer le chauffeur {driver.name} ? Cette
            action est irréversible.
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
            onClick={handleDelete}
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};