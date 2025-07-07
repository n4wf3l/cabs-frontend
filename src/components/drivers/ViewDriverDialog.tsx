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
  Flag,
  CreditCard,
  FileText,
  Car,
  Clock,
  Briefcase,
  Eye,
  CreditCard as PaymentIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ViewDriverDialogProps {
  driver: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ViewDriverDialog = ({
  driver,
  open,
  onOpenChange,
}: ViewDriverDialogProps) => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState("");

  // Si pas de chauffeur, ne rien rendre
  if (!driver) return null;

  const openModal = (imageUrl: string, title: string) => {
    setModalImage(imageUrl);
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalImage(null);
    setModalTitle("");
  };

  const handleExportPDF = () => {
    // Logique d'export PDF pourrait être ajoutée ici
    console.log("Exporting PDF for driver:", driver.id);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Car className="text-blue-400" />
              Profil de {driver.first_name} {driver.last_name}
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-[80vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonne gauche - Info personnelle */}
              <div className="space-y-6">
                {/* Profil de base */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex flex-col items-center mb-4">
                    <div className="bg-gray-700 rounded-lg p-4 flex flex-col items-center mb-3">
                      {driver.driver_license_photo ? (
                        <img
                          src={
                            driver.photo_chauffeur ||
                            driver.driver_license_photo
                          }
                          alt="Chauffeur"
                          className="w-32 h-20 object-cover rounded-md border border-gray-500"
                        />
                      ) : (
                        <span className="text-gray-400">
                          Aucune photo disponible
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-semibold">
                      {driver.first_name} {driver.last_name}
                    </h2>
                    <p className="text-blue-400 text-sm">
                      Chauffeur Professionnel
                    </p>
                    <Badge className="mt-1">
                      {driver.shift_type === "Day"
                        ? "Shift de jour"
                        : driver.shift_type === "Night"
                        ? "Shift de nuit"
                        : "Shift long"}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      <span>{driver.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" />
                      <span>{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>
                        Né le{" "}
                        {driver.birth_date &&
                          format(new Date(driver.birth_date), "d MMMM yyyy", {
                            locale: fr,
                          })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>Lieu de naissance: {driver.birth_place}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>
                        Travaille depuis le{" "}
                        {format(new Date(driver.start_date), "d MMMM yyyy", {
                          locale: fr,
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <FileText size={16} className="text-blue-400" />
                    Documents & Licences
                  </h3>

                  <div className="space-y-3">
                    {Object.entries({
                      id_card: "Carte d'identité",
                      driver_license_photo: "Permis de conduire",
                      bank_card_photo: "Carte bancaire",
                      contract_photo: "Contrat",
                    }).map(([key, name]) => (
                      <div
                        key={key}
                        className="bg-gray-700 p-3 rounded flex justify-between items-center"
                      >
                        <span className="text-sm">{name}</span>
                        {driver[key] ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-400 hover:text-blue-300"
                            onClick={() => openModal(driver[key], name)}
                          >
                            <Eye size={16} className="mr-1" /> Voir
                          </Button>
                        ) : (
                          <span className="text-xs text-gray-400">
                            Non disponible
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date de création */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Clock size={16} className="text-blue-400" />
                    Date de création
                  </h3>
                  <p className="text-sm">
                    Profil créé le{" "}
                    {driver.created_at &&
                      format(
                        new Date(driver.created_at),
                        "d MMMM yyyy à HH:mm",
                        { locale: fr }
                      )}
                  </p>
                </div>
              </div>

              {/* Colonne droite - Détails */}
              <div className="lg:col-span-2 space-y-6">
                {/* Informations personnelles */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <FileText size={16} className="text-blue-400" />
                    Informations Personnelles
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400">Adresse</label>
                      <div className="flex items-center mt-1">
                        <MapPin size={14} className="text-gray-500 mr-1" />
                        <p>{driver.address}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Pays</label>
                      <div className="flex items-center mt-1">
                        <Flag size={14} className="text-gray-500 mr-1" />
                        <p>{driver.country}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">
                        Numéro National
                      </label>
                      <div className="flex items-center mt-1">
                        <CreditCard size={14} className="text-gray-500 mr-1" />
                        <p>{driver.national_id}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">
                        Nationalité
                      </label>
                      <p className="mt-1">{driver.nationality}</p>
                    </div>
                  </div>
                </div>

                {/* Horaires de travail */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Briefcase size={16} className="text-blue-400" />
                    Horaires de Travail
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400">
                        Jours de travail
                      </label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries({
                          works_monday: "Lundi",
                          works_tuesday: "Mardi",
                          works_wednesday: "Mercredi",
                          works_thursday: "Jeudi",
                          works_friday: "Vendredi",
                          works_saturday: "Samedi",
                          works_sunday: "Dimanche",
                        }).map(([key, label]) => (
                          <div
                            key={key}
                            className={`px-3 py-1 rounded-lg flex items-center gap-1 
                            ${
                              driver[key]
                                ? "bg-blue-900/30 text-blue-300"
                                : "bg-gray-700/50 text-gray-400"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={driver[key]}
                              readOnly
                              className="form-checkbox text-blue-500"
                            />
                            <span>{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400">
                          Type de shift
                        </label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {["Day", "Night", "Long"].map((shift) => {
                            const shiftLabel = {
                              Day: "Jour",
                              Night: "Nuit",
                              Long: "Long",
                            };
                            return (
                              <label
                                key={shift}
                                className={`flex items-center gap-2 px-3 py-1 rounded-lg
                                ${
                                  driver.shift_type === shift
                                    ? "bg-blue-900/30 text-blue-300"
                                    : "bg-gray-700/50 text-gray-400"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="shift"
                                  checked={driver.shift_type === shift}
                                  readOnly
                                  className="form-radio text-blue-500"
                                />
                                <span>
                                  {shiftLabel[shift as keyof typeof shiftLabel]}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-gray-400">
                          Type de formule
                        </label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {["50/50", "Forfait"].map((formula) => (
                            <label
                              key={formula}
                              className={`flex items-center gap-2 px-3 py-1 rounded-lg
                              ${
                                driver.work_formula === formula
                                  ? "bg-blue-900/30 text-blue-300"
                                  : "bg-gray-700/50 text-gray-400"
                              }`}
                            >
                              <input
                                type="radio"
                                name="formula"
                                checked={driver.work_formula === formula}
                                readOnly
                                className="form-radio text-blue-500"
                              />
                              <span>{formula}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400">
                        Statut du chauffeur
                      </label>
                      <div className="mt-2">
                        <label
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg inline-block
                          ${
                            driver.extra
                              ? "bg-purple-900/30 text-purple-300"
                              : "bg-gray-700/50 text-gray-400"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={driver.extra}
                            readOnly
                            className="form-checkbox text-purple-500"
                          />
                          <span>Flex Worker</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Préférences de paiement */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <PaymentIcon size={16} className="text-blue-400" />
                    Préférences de Paiement
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    {["Bolt", "Heetch", "Uber", "Taxi Vert"].map((service) => (
                      <div key={service} className="space-y-1">
                        <h4 className="text-sm font-medium">{service}</h4>
                        <div className="space-y-1">
                          {["app", "cash", "card"].map((method) => {
                            const key = `accepts_${service
                              .toLowerCase()
                              .replace(" ", "_")}_${method}`;
                            return (
                              <div
                                key={method}
                                className="flex items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  checked={driver[key]}
                                  readOnly
                                  className="form-checkbox text-blue-500"
                                />
                                <span className="text-sm">
                                  {method === "app"
                                    ? "Application"
                                    : method === "cash"
                                    ? "Espèces"
                                    : "Carte"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <div className="md:col-span-2">
                      <h4 className="text-sm font-medium mt-2">
                        Options de paiement générales
                      </h4>
                      <div className="flex flex-wrap gap-3 mt-1">
                        {Object.entries({
                          accepts_card_payment: "Carte",
                          accepts_cash_payment: "Espèces",
                          accepts_check_payment: "Chèque",
                        }).map(([key, label]) => (
                          <Badge
                            key={key}
                            variant={driver[key] ? "default" : "outline"}
                            className={driver[key] ? "" : "text-gray-400"}
                          >
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Période du contrat */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Clock size={16} className="text-blue-400" />
                    Période du Contrat
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400">
                        Date de début
                      </label>
                      <p className="mt-1">
                        {format(new Date(driver.start_date), "d MMMM yyyy", {
                          locale: fr,
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">
                        Date de fin
                      </label>
                      <p className="mt-1">
                        {driver.end_date
                          ? format(new Date(driver.end_date), "d MMMM yyyy", {
                              locale: fr,
                            })
                          : "Pas de date de fin définie"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
            <Button
              onClick={handleExportPDF}
              className="bg-secondary text-white"
            >
              <Download size={14} className="mr-2" /> Exporter PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal pour afficher les images */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">{modalTitle}</h3>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                ×
              </Button>
            </div>
            <div className="overflow-auto max-h-[70vh] flex items-center justify-center">
              <img
                src={modalImage}
                alt={modalTitle}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
