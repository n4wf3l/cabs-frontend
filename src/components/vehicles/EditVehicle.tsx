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
import { updateVehicle } from "@/api/vehicle";
import { VehicleDTO, VehicleUpdateDTO, Transmission } from "@/api/models/VehicleDTO";
import { useQueryClient } from "@tanstack/react-query";

interface EditVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: VehicleDTO | null;
}

export default function EditVehicle({
  isOpen,
  onClose,
  vehicle,
}: EditVehicleProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<VehicleUpdateDTO | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (vehicle) {
      setFormData({
        licensePlate: vehicle.licensePlate,
        brand: vehicle.brand,
        model: vehicle.model,
        transmission: vehicle.transmission,
        odometerKm: vehicle.odometerKm,
        condition: vehicle.condition,
        available: vehicle.available,
        activeInShift: vehicle.activeInShift,
      });
    }
  }, [vehicle]);

  if (!formData || !vehicle) return null;

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};

    if (!formData.licensePlate) {
      newErrors.licensePlate = "La plaque d'immatriculation est obligatoire";
    }

    if (!formData.brand) {
      newErrors.brand = "La marque est obligatoire";
    }

    if (!formData.model) {
      newErrors.model = "Le modèle est obligatoire";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await updateVehicle(vehicle.id, formData);
        await queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        toast.success("Véhicule modifié avec succès");
        onClose();
      } catch (error) {
        console.error("Error updating vehicle:", error);
        toast.error("Erreur lors de la modification du véhicule");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1f2c] border-[#2a2f3c] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium flex items-center gap-2">
            <Wrench className="text-yellow-400" size={18} />
            Modifier le véhicule
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="space-y-2">
            <Label htmlFor="licensePlate">Plaque d'immatriculation</Label>
            <Input
              id="licensePlate"
              className={`bg-[#151a27] border-[#2a2f3c] ${
                errors.licensePlate ? "border-red-400" : ""
              }`}
              value={formData.licensePlate}
              onChange={(e) =>
                setFormData({ ...formData, licensePlate: e.target.value })
              }
            />
            {errors.licensePlate && (
              <p className="text-red-400 text-sm">{errors.licensePlate}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Marque</Label>
              <Input
                id="brand"
                className={`bg-[#151a27] border-[#2a2f3c] ${
                  errors.brand ? "border-red-400" : ""
                }`}
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
              {errors.brand && (
                <p className="text-red-400 text-sm">{errors.brand}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Modèle</Label>
              <Input
                id="model"
                className={`bg-[#151a27] border-[#2a2f3c] ${
                  errors.model ? "border-red-400" : ""
                }`}
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
              />
              {errors.model && (
                <p className="text-red-400 text-sm">{errors.model}</p>
              )}
            </div>
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
                  className="bg-[#151a27] border-[#2a2f3c]"
                >
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent className="bg-[#151a27] border-[#2a2f3c]">
                  <SelectItem value="AUTOMATIC">Automatique</SelectItem>
                  <SelectItem value="MANUAL">Manuelle</SelectItem>
                </SelectContent>
              </Select>
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
                  className="bg-[#151a27] border-[#2a2f3c]"
                >
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent className="bg-[#151a27] border-[#2a2f3c]">
                  <SelectItem value="GOOD">Bon état</SelectItem>
                  <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                  <SelectItem value="REPAIR">Réparation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="odometerKm">Kilométrage</Label>
            <Input
              id="odometerKm"
              type="number"
              className="bg-[#151a27] border-[#2a2f3c]"
              value={formData.odometerKm}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  odometerKm: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="available">Disponibilité</Label>
            <Select
              value={formData.available ? "yes" : "no"}
              onValueChange={(value) =>
                setFormData({ ...formData, available: value === "yes" })
              }
            >
              <SelectTrigger id="available" className="bg-[#151a27] border-[#2a2f3c]">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent className="bg-[#151a27] border-[#2a2f3c]">
                <SelectItem value="yes">Disponible</SelectItem>
                <SelectItem value="no">Indisponible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#2a2f3c] hover:bg-[#151a27]"
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
