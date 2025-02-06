import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface AddDriverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddDriverDialog = ({ open, onOpenChange }: AddDriverDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "chauffeur",
    employer: "",
    birthPlace: "",
    birthDate: "",
    address: "",
    country: "",
    nationalId: "",
    nationality: "",
    idCardImage: null as File | null,
    licenseImage: null as File | null,
    bankCardImage: null as File | null,
    contractImage: null as File | null,
    startDate: "",
    description: "",
    workDays: {
      monday: { selected: false, shift: "", formula: "" },
      tuesday: { selected: false, shift: "", formula: "" },
      wednesday: { selected: false, shift: "", formula: "" },
      thursday: { selected: false, shift: "", formula: "" },
      friday: { selected: false, shift: "", formula: "" },
      saturday: { selected: false, shift: "", formula: "" },
      sunday: { selected: false, shift: "", formula: "" },
    },
    vehiclePlate: "",
    paymentRates: {
      bankCard: 2.5,
      paperCheck: 2.5,
      cash: 0,
      boltApp: 20,
      boltCash: 20,
      boltCard: 22.5,
      heetchApp: 18,
      heetchCash: 18,
      heetchCard: 20.5,
      uberApp: 27.5,
      uberCash: 25,
      uberCard: 18,
      taxiVertCash: 0,
      taxiVertApp: 2.5,
      taxiVertCard: 2.5,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add driver logic here
    toast({
      title: "Chauffeur ajouté",
      description: "Le chauffeur a été ajouté avec succès.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un chauffeur</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Rôle</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chauffeur" id="chauffeur" />
                <Label htmlFor="chauffeur">Chauffeur de Taxi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin">Admin</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gestionnaire" id="gestionnaire" />
                <Label htmlFor="gestionnaire">Gestionnaire</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employer">Employeur</Label>
            <Input
              id="employer"
              value={formData.employer}
              onChange={(e) =>
                setFormData({ ...formData, employer: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthPlace">Lieu de naissance</Label>
              <Input
                id="birthPlace"
                value={formData.birthPlace}
                onChange={(e) =>
                  setFormData({ ...formData, birthPlace: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Date de naissance</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Pays</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationalité</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) =>
                  setFormData({ ...formData, nationality: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationalId">N° identification national</Label>
            <Input
              id="nationalId"
              value={formData.nationalId}
              onChange={(e) =>
                setFormData({ ...formData, nationalId: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idCardImage">Photo de la carte d'identité</Label>
              <Input
                id="idCardImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "idCardImage")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseImage">Photo du permis</Label>
              <Input
                id="licenseImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "licenseImage")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bankCardImage">Photo de la carte bancaire</Label>
              <Input
                id="bankCardImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "bankCardImage")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractImage">Photo du contrat</Label>
              <Input
                id="contractImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "contractImage")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Date d'entrée dans la société</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Information importante"
            />
          </div>

          <div className="space-y-4">
            <Label>Jours de travail</Label>
            {Object.entries(formData.workDays).map(([day, value]) => (
              <div key={day} className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id={day}
                  checked={value.selected}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      workDays: {
                        ...formData.workDays,
                        [day]: { ...value, selected: e.target.checked },
                      },
                    })
                  }
                />
                <Label htmlFor={day} className="capitalize">
                  {day}
                </Label>
                {value.selected && (
                  <>
                    <select
                      value={value.shift}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          workDays: {
                            ...formData.workDays,
                            [day]: { ...value, shift: e.target.value },
                          },
                        })
                      }
                      className="bg-background border rounded px-2 py-1"
                    >
                      <option value="">Sélectionner un shift</option>
                      <option value="jour">Jour</option>
                      <option value="nuit">Nuit</option>
                      <option value="longue">Longue</option>
                    </select>
                    <select
                      value={value.formula}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          workDays: {
                            ...formData.workDays,
                            [day]: { ...value, formula: e.target.value },
                          },
                        })
                      }
                      className="bg-background border rounded px-2 py-1"
                    >
                      <option value="">Sélectionner une formule</option>
                      <option value="50/50">50/50</option>
                      <option value="forfait">Forfait</option>
                    </select>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehiclePlate">Plaque d'immatriculation</Label>
            <Input
              id="vehiclePlate"
              value={formData.vehiclePlate}
              onChange={(e) =>
                setFormData({ ...formData, vehiclePlate: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Types de paiements</Label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData.paymentRates).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()} ({value}%)
                  </Label>
                  <Input
                    id={key}
                    type="number"
                    step="0.1"
                    value={value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentRates: {
                          ...formData.paymentRates,
                          [key]: parseFloat(e.target.value),
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
