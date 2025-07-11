import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Download,
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DriverResponseDTO } from "@/api/driver";

interface ViewDriverDialogProps {
  driver: DriverResponseDTO | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ViewDriverDialog = ({
  driver,
  open,
  onOpenChange,
}: ViewDriverDialogProps) => {
  // Si pas de chauffeur, ne rien rendre
  if (!driver) return null;

  const handleExportPDF = () => {
    console.log("Exporting PDF for driver:", driver.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <User className="text-blue-400" />
            Profil de {driver.firstName} {driver.lastName}
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Colonne gauche - Info personnelle */}
            <div className="space-y-6">
              {/* Profil de base */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-blue-600 rounded-full w-20 h-20 flex items-center justify-center mb-3">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold">
                    {driver.firstName} {driver.lastName}
                  </h2>
                  <p className="text-blue-400 text-sm">
                    Chauffeur Professionnel
                  </p>
                  <Badge className="mt-1">
                    {driver.onLeave ? "En congé" : "Actif"}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <span>{driver.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <span>{driver.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>
                      Né le{" "}
                      {format(new Date(driver.dateOfBirth), "d MMMM yyyy", {
                        locale: fr,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>Lieu de naissance: {driver.cityOfBirth}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>Adresse: {driver.address}, {driver.postalCode}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite - Statuts et paramètres */}
            <div className="space-y-6">
              {/* Statuts du chauffeur */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-green-400" />
                  Statuts & Paramètres
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Paiements activés</span>
                    <Badge variant={driver.paymentsEnabled ? "default" : "secondary"}>
                      {driver.paymentsEnabled ? "Oui" : "Non"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Disponible pour remplacement</span>
                    <Badge variant={driver.availableForReplacement ? "default" : "secondary"}>
                      {driver.availableForReplacement ? "Oui" : "Non"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">En congé</span>
                    <Badge variant={driver.onLeave ? "destructive" : "default"}>
                      {driver.onLeave ? "Oui" : "Non"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4 border-t border-gray-800">
          <Button
            variant="outline"
            onClick={handleExportPDF}
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter PDF
          </Button>
          <Button onClick={() => onOpenChange(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDriverDialog;
