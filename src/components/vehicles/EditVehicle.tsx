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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Types
type DriverInfo = { id: string; name: string } | null;
type VehicleStatus = "available" | "maintenance" | "repair" | "outOfService";
type TransmissionType = "automatic" | "manual";
type FuelType = "gasoline" | "electric" | "hybrid";

interface Vehicle {
  id: string;
  plate: string;
  model: string;
  dayDriver: DriverInfo;
  nightDriver: DriverInfo;
  status: VehicleStatus;
  transmission: TransmissionType;
  fuelType: FuelType;
  lastService?: Date;
  notes?: string;
}

interface EditVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicle: Vehicle) => void;
  vehicle: Vehicle | null;
}

export default function EditVehicle({
  isOpen,
  onClose,
  onSave,
  vehicle,
}: EditVehicleProps) {
  const [editedVehicle, setEditedVehicle] = useState<Vehicle | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mettre à jour l'état local lorsque le véhicule change
  useEffect(() => {
    if (vehicle) {
      setEditedVehicle({ ...vehicle });
    }
  }, [vehicle]);

  if (!editedVehicle) return null;

  // Fonction pour valider le formulaire
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editedVehicle.plate) {
      newErrors.plate = "La plaque d'immatriculation est obligatoire";
    } else if (!/^T-\d{3}-[A-Z]{3}$/.test(editedVehicle.plate)) {
      newErrors.plate = "Format invalide (doit être T-XXX-YYY)";
    }

    if (!editedVehicle.model) {
      newErrors.model = "Le modèle est obligatoire";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fonction pour sauvegarder les modifications
  const handleSave = () => {
    if (validateForm()) {
      onSave(editedVehicle);
      toast.success("Modifications enregistrées");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium flex items-center gap-2">
            <Wrench className="text-yellow-400" size={18} />
            Modifier le véhicule
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="space-y-2">
            <Label htmlFor="plate">Plaque d'immatriculation</Label>
            <Input
              id="plate"
              className={`bg-gray-800 border-gray-700 ${
                errors.plate ? "border-red-400" : ""
              }`}
              value={editedVehicle.plate}
              onChange={(e) =>
                setEditedVehicle({ ...editedVehicle, plate: e.target.value })
              }
            />
            {errors.plate && (
              <p className="text-red-400 text-sm">{errors.plate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Modèle</Label>
            <Input
              id="model"
              className={`bg-gray-800 border-gray-700 ${
                errors.model ? "border-red-400" : ""
              }`}
              value={editedVehicle.model}
              onChange={(e) =>
                setEditedVehicle({ ...editedVehicle, model: e.target.value })
              }
            />
            {errors.model && (
              <p className="text-red-400 text-sm">{errors.model}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Select
                value={editedVehicle.transmission}
                onValueChange={(value: TransmissionType) =>
                  setEditedVehicle({ ...editedVehicle, transmission: value })
                }
              >
                <SelectTrigger
                  id="transmission"
                  className="bg-gray-800 border-gray-700"
                >
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="automatic">Automatique</SelectItem>
                  <SelectItem value="manual">Manuelle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelType">Carburant</Label>
              <Select
                value={editedVehicle.fuelType}
                onValueChange={(value: FuelType) =>
                  setEditedVehicle({ ...editedVehicle, fuelType: value })
                }
              >
                <SelectTrigger
                  id="fuelType"
                  className="bg-gray-800 border-gray-700"
                >
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="gasoline">Essence</SelectItem>
                  <SelectItem value="electric">Électrique</SelectItem>
                  <SelectItem value="hybrid">Hybride</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select
              value={editedVehicle.status}
              onValueChange={(value: VehicleStatus) =>
                setEditedVehicle({ ...editedVehicle, status: value })
              }
            >
              <SelectTrigger
                id="status"
                className="bg-gray-800 border-gray-700"
              >
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="available">Disponible</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="repair">Réparation</SelectItem>
                <SelectItem value="outOfService">Hors service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              className="bg-gray-800 border-gray-700"
              rows={3}
              value={editedVehicle.notes || ""}
              onChange={(e) =>
                setEditedVehicle({ ...editedVehicle, notes: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
