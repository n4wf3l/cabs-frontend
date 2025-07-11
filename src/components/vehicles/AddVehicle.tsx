import { useState } from "react";
import { Car } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VehicleDTO, VehicleRequestDTO, Transmission, createVehicle } from "@/api/vehicle";

interface AddVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (vehicle: Partial<VehicleDTO>) => void;
}

export default function AddVehicle({ isOpen, onClose, onAdd }: AddVehicleProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<VehicleRequestDTO>({
    licensePlate: "",
    brand: "",
    model: "",
    transmission: Transmission.AUTOMATIC,
    odometerKm: 0,
    available: true,
    activeInShift: false,
    condition: "GOOD",
  });

  const addVehicleMutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Véhicule ajouté avec succès");
      onClose();
      // Reset form
      setFormData({
        licensePlate: "",
        brand: "",
        model: "",
        transmission: Transmission.AUTOMATIC,
        odometerKm: 0,
        available: true,
        activeInShift: false,
        condition: "GOOD",
      });
    },
    onError: (error) => {
      toast.error("Erreur lors de l'ajout du véhicule");
      console.error("Error adding vehicle:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVehicleMutation.mutate({
      ...formData,
      odometerKm: Number(formData.odometerKm) || 0,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="h-6 w-6" />
            Ajouter un nouveau véhicule
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="licensePlate">Plaque d'immatriculation</Label>
              <Input
                id="licensePlate"
                value={formData.licensePlate}
                onChange={(e) =>
                  setFormData({ ...formData, licensePlate: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="brand">Marque</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="model">Modèle</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Select
                value={formData.transmission}
                onValueChange={(value: Transmission) =>
                  setFormData({ ...formData, transmission: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Transmission.AUTOMATIC}>Automatique</SelectItem>
                  <SelectItem value={Transmission.MANUAL}>Manuelle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="odometerKm">Kilométrage</Label>
              <Input
                id="odometerKm"
                type="number"
                min="0"
                step="1"
                value={formData.odometerKm}
                onChange={(e) =>
                  setFormData({ ...formData, odometerKm: Number(e.target.value) || 0 })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="condition">État</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) =>
                  setFormData({ ...formData, condition: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GOOD">Bon état</SelectItem>
                  <SelectItem value="MAINTENANCE">En maintenance</SelectItem>
                  <SelectItem value="REPAIR">En réparation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="available">Disponibilité</Label>
              <Select
                value={formData.available ? "yes" : "no"}
                onValueChange={(value) =>
                  setFormData({ ...formData, available: value === "yes" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Disponible</SelectItem>
                  <SelectItem value="no">Indisponible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={addVehicleMutation.isPending}
            >
              {addVehicleMutation.isPending ? "Ajout en cours..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
