import { useState, useEffect } from "react";
import { Car, Wrench } from "lucide-react";
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
import { VehicleDTO, VehicleUpdateDTO, Transmission, updateVehicle } from "@/api/vehicle";

interface EditVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicle: VehicleDTO) => void;
  vehicle: VehicleDTO | null;
}

export default function EditVehicle({
  isOpen,
  onClose,
  onSave,
  vehicle,
}: EditVehicleProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<VehicleUpdateDTO>({
    licensePlate: "",
    brand: "",
    model: "",
    transmission: Transmission.AUTOMATIC,
    odometerKm: 0,
    available: true,
    activeInShift: false,
    condition: "GOOD",
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        licensePlate: vehicle.licensePlate,
        brand: vehicle.brand,
        model: vehicle.model,
        transmission: vehicle.transmission,
        odometerKm: vehicle.odometerKm,
        available: vehicle.available,
        activeInShift: vehicle.activeInShift,
        condition: vehicle.condition,
      });
    }
  }, [vehicle]);

  const updateVehicleMutation = useMutation({
    mutationFn: (data: VehicleUpdateDTO) => {
      if (!vehicle) throw new Error("No vehicle selected");
      return updateVehicle(vehicle.id, data);
    },
    onSuccess: (updatedVehicle) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Véhicule modifié avec succès");
      onSave(updatedVehicle);
      onClose();
    },
    onError: (error) => {
      toast.error("Erreur lors de la modification du véhicule");
      console.error("Error updating vehicle:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateVehicleMutation.mutate(formData);
  };

  if (!vehicle) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium flex items-center gap-2">
            <Wrench className="text-yellow-400" size={18} />
            Modifier le véhicule
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 my-2">
            <div className="space-y-2">
              <Label htmlFor="licensePlate">Plaque d'immatriculation</Label>
              <Input
                id="licensePlate"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.licensePlate}
                onChange={(e) =>
                  setFormData({ ...formData, licensePlate: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Marque</Label>
              <Input
                id="brand"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Modèle</Label>
              <Input
                id="model"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(value: Transmission) =>
                    setFormData({ ...formData, transmission: value })
                  }
                >
                  <SelectTrigger
                    id="transmission"
                    className="bg-gray-800 border-gray-700 text-white"
                  >
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value={Transmission.AUTOMATIC}>Automatique</SelectItem>
                    <SelectItem value={Transmission.MANUAL}>Manuelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="odometerKm">Kilométrage</Label>
                <Input
                  id="odometerKm"
                  type="number"
                  className="bg-gray-800 border-gray-700 text-white"
                  min="0"
                  value={formData.odometerKm}
                  onChange={(e) =>
                    setFormData({ ...formData, odometerKm: Number(e.target.value) || 0 })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">État</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) =>
                  setFormData({ ...formData, condition: value })
                }
              >
                <SelectTrigger
                  id="condition"
                  className="bg-gray-800 border-gray-700 text-white"
                >
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="GOOD">Bon état</SelectItem>
                  <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                  <SelectItem value="REPAIR">Réparation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="available">Disponibilité</Label>
              <Select
                value={formData.available ? "yes" : "no"}
                onValueChange={(value) =>
                  setFormData({ ...formData, available: value === "yes" })
                }
              >
                <SelectTrigger
                  id="available"
                  className="bg-gray-800 border-gray-700 text-white"
                >
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="yes">Disponible</SelectItem>
                  <SelectItem value="no">Indisponible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={updateVehicleMutation.isPending}
            >
              {updateVehicleMutation.isPending ? "Modification en cours..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
