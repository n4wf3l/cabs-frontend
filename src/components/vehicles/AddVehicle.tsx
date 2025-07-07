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

interface AddVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (vehicle: Partial<Vehicle>) => void;
}

export default function AddVehicle({
  isOpen,
  onClose,
  onAdd,
}: AddVehicleProps) {
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    plate: "",
    model: "",
    status: "available",
    transmission: "automatic",
    fuelType: "gasoline",
    dayDriver: null,
    nightDriver: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fonction pour formater automatiquement la plaque d'immatriculation
  const formatLicensePlate = (input: string) => {
    // Enlever tous les tirets et espaces existants
    let cleanInput = input.replace(/[-\s]/g, "").toUpperCase();

    if (cleanInput.length > 0) {
      // Assurer que ça commence par T
      if (!/^T/.test(cleanInput)) {
        cleanInput = "T" + cleanInput;
      }

      // Ajouter les tirets automatiquement
      let formatted = cleanInput.substring(0, 1); // Le T initial

      // Ajouter le premier tiret après T
      if (cleanInput.length > 1) {
        formatted += "-";
      }

      // Ajouter les chiffres (position 2 à 4)
      if (cleanInput.length > 1) {
        const digits = cleanInput.substring(1, Math.min(4, cleanInput.length));
        formatted += digits;
      }

      // Ajouter le deuxième tiret après les chiffres
      if (cleanInput.length > 4) {
        formatted += "-";
      }

      // Ajouter les lettres (position 5 et plus)
      if (cleanInput.length > 4) {
        formatted += cleanInput.substring(4);
      }

      return formatted;
    }

    return cleanInput;
  };

  // Fonction pour valider le formulaire
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!newVehicle.plate) {
      newErrors.plate = "La plaque d'immatriculation est obligatoire";
    } else if (!/^T-\d{3}-[A-Z]{3}$/.test(newVehicle.plate)) {
      newErrors.plate = "Format invalide (doit être T-XXX-YYY)";
    }

    if (!newVehicle.model) {
      newErrors.model = "Le modèle est obligatoire";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fonction pour ajouter un véhicule
  const handleAddVehicle = () => {
    if (validateForm()) {
      onAdd(newVehicle);
      toast.success("Véhicule ajouté avec succès");

      // Reset form
      setNewVehicle({
        plate: "",
        model: "",
        status: "available",
        transmission: "automatic",
        fuelType: "gasoline",
        dayDriver: null,
        nightDriver: null,
      });

      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium flex items-center gap-2">
            <Car className="text-blue-400" size={18} />
            Ajouter un nouveau véhicule
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="space-y-2">
            <Label htmlFor="plate">Plaque d'immatriculation</Label>
            <Input
              id="plate"
              placeholder="T123ABC"
              className={`bg-gray-800 border-gray-700 ${
                errors.plate ? "border-red-400" : ""
              }`}
              value={newVehicle.plate}
              onChange={(e) => {
                // Formater automatiquement la plaque lors de la saisie
                const formattedPlate = formatLicensePlate(e.target.value);
                setNewVehicle({ ...newVehicle, plate: formattedPlate });
              }}
              maxLength={9} // T-123-ABC = 9 caractères
            />
            {errors.plate && (
              <p className="text-red-400 text-sm">{errors.plate}</p>
            )}
            <p className="text-xs text-gray-400">
              Format: T-123-ABC (les tirets sont ajoutés automatiquement)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Modèle</Label>
            <Input
              id="model"
              placeholder="Toyota Prius"
              className={`bg-gray-800 border-gray-700 ${
                errors.model ? "border-red-400" : ""
              }`}
              value={newVehicle.model}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, model: e.target.value })
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
                value={newVehicle.transmission}
                onValueChange={(value: TransmissionType) =>
                  setNewVehicle({ ...newVehicle, transmission: value })
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
                value={newVehicle.fuelType}
                onValueChange={(value: FuelType) =>
                  setNewVehicle({ ...newVehicle, fuelType: value })
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
            <Label htmlFor="status">Statut initial</Label>
            <Select
              value={newVehicle.status}
              onValueChange={(value: VehicleStatus) =>
                setNewVehicle({ ...newVehicle, status: value })
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
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Textarea
              id="notes"
              placeholder="Informations supplémentaires sur le véhicule..."
              className="bg-gray-800 border-gray-700"
              rows={3}
              value={newVehicle.notes || ""}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, notes: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleAddVehicle}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
