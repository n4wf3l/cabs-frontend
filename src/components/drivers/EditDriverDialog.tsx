import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { updateChauffeur } from "@/api/chauffeurs"; // ✅ Import API function

interface EditDriverDialogProps {
  driver: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (updatedDriver: any) => void; // ✅ Callback to update list
}

export const EditDriverDialog = ({ driver, open, onOpenChange, onEdit }: EditDriverDialogProps) => {
  const form = useForm({ defaultValues: driver });

  useEffect(() => {
    if (driver) {
      form.reset(driver); // ✅ Pre-fill form fields
    }
  }, [driver, form]);

  const onSubmit = async (data: any) => {
    try {
      const updatedDriver = await updateChauffeur(driver.id, data);
      toast.success("Chauffeur mis à jour avec succès!");
      onEdit(updatedDriver); // ✅ Update list
      onOpenChange(false);
    } catch (error) {
      console.error("❌ Failed to update chauffeur:", error);
      toast.error("Erreur lors de la mise à jour du chauffeur.");
    }
  };

  if (!driver) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le chauffeur</DialogTitle>
          <DialogDescription>Mettez à jour les informations du chauffeur.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
<h3 className="text-lg font-semibold">Changer la carte d'identité</h3>
<FormField
  control={form.control}
  name="id_card"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Carte d'identité</FormLabel>
      <FormControl>
        <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
      </FormControl>
      {field.value && typeof field.value === "string" && (
        <img src={field.value} alt="ID Card" className="h-32 w-auto rounded border mt-2" />
      )}
      <FormMessage />
    </FormItem>
  )}
/>

            {/* Payment Preferences (Checkboxes) */}
            <h3 className="text-lg font-semibold">Moyens de paiement</h3>
            <FormField
              control={form.control}
              name="accepts_card_payment"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3">
                  <FormControl>
                    <Checkbox checked={field.value === true} onCheckedChange={(checked) => field.onChange(!!checked)} />
                  </FormControl>
                  <FormLabel>Carte bancaire</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accepts_cash_payment"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3">
                  <FormControl>
                    <Checkbox checked={field.value === true} onCheckedChange={(checked) => field.onChange(!!checked)} />
                  </FormControl>
                  <FormLabel>Espèces</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accepts_check_payment"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3">
                  <FormControl>
                    <Checkbox checked={field.value === true} onCheckedChange={(checked) => field.onChange(!!checked)} />
                  </FormControl>
                  <FormLabel>Chèque</FormLabel>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">Enregistrer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
