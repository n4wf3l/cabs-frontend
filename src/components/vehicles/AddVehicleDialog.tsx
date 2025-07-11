import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createVehicle } from "@/api/vehicle";
import { VehicleRequestDTO, Transmission } from "@/api/models/VehicleDTO";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface AddVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddVehicleDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddVehicleDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<VehicleRequestDTO>({
    defaultValues: {
      licensePlate: "T-",
      brand: "",
      model: "",
      transmission: Transmission.MANUAL,
      odometerKm: 0,
      available: true,
      activeInShift: false,
      condition: "GOOD",
    },
  });

  const onSubmit = async (data: VehicleRequestDTO) => {
    setIsLoading(true);
    try {
      await createVehicle(data);
      toast.success("Véhicule ajouté avec succès!");
      form.reset();
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erreur lors de l'ajout du véhicule");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un véhicule</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Plaque d'immatriculation */}
            <FormField
              control={form.control}
              name="licensePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-400">Plaque d'immatriculation</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="T-ABC-123"
                      maxLength={10}
                      {...field}
                      className="rounded-lg"
                      onChange={e => {
                        let value = e.target.value.toUpperCase();
                        if (!value.startsWith("T-")) value = "T-";
                        value = value.replace(/^T-/, "");
                        const letters = value.replace(/[^A-Z]/g, "").slice(0, 3);
                        const numbers = value.replace(/[^0-9]/g, "").slice(0, 3);
                        let formatted = "T-";
                        formatted += letters;
                        if (letters.length === 3) formatted += "-";
                        formatted += numbers;
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Marque */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-400">Marque</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Skoda"
                      className="rounded-lg"
                      {...field}
                      onChange={e => {
                        const val = e.target.value;
                        const formatted =
                          val.length > 0
                            ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
                            : "";
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Modèle */}
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-400">Modèle</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Octavia"
                      className="rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Transmission */}
            <FormField
              control={form.control}
              name="transmission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-400">Transmission</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Transmission.MANUAL}>Manuelle</SelectItem>
                      <SelectItem value={Transmission.AUTOMATIC}>Automatique</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Kilométrage */}
            <FormField
              control={form.control}
              name="odometerKm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-400">Kilométrage</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      required
                      placeholder="30000"
                      min={0}
                      className="rounded-lg"
                      value={field.value === 0 ? "" : field.value}
                      onFocus={e => {
                        if (e.target.value === "0") e.target.value = "";
                      }}
                      onBlur={e => {
                        if (e.target.value === "") field.onChange(0);
                      }}
                      onChange={e => {
                        const val = e.target.value.replace(/^0+/, "");
                        field.onChange(val === "" ? 0 : Number(val));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Disponible */}
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm text-gray-400">Disponible</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* État */}
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-400">État</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Sélectionnez l'état" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GOOD">Bon état</SelectItem>
                      <SelectItem value="MAINTENANCE">En maintenance</SelectItem>
                      <SelectItem value="REPAIR">En réparation</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Ajout en cours..." : "Ajouter"}
              </Button>
            </div>
          </motion.form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
