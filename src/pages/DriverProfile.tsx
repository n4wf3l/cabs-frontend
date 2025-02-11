import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchChauffeurById } from "@/api/chauffeurs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Download,
  Pencil,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Flag,
  CreditCardIcon,
  CreditCard,
  FileText,
  Car,
  Clock,
  Briefcase,
  Plus,
  CreditCard as PaymentIcon,
} from "lucide-react";
import { updateChauffeur } from "@/api/chauffeurs";
const DriverProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    const loadDriver = async () => {
      try {
        const data = await fetchChauffeurById(id);
        setDriver(data);
      } catch (error) {
        console.error("Erreur lors du chargement du chauffeur:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDriver();
  }, [id]);

  const openModal = (imageUrl, title) => {
    setModalImage(imageUrl);
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalImage(null);
    setModalTitle("");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Profil de ${driver.first_name} ${driver.last_name}`, 14, 20);
    autoTable(doc, {
      head: [["Champ", "Valeur"]],
      body: Object.entries(driver).map(([key, value]) => [key, value]),
    });
    doc.save(`Profil_${driver.first_name}_${driver.last_name}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="ml-64 p-8 w-full">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
        </main>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="ml-64 p-8 w-full">
          <h1 className="text-2xl font-bold">Chauffeur introuvable</h1>
          <Button onClick={() => navigate("/drivers")} className="mt-4">
            Retour
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-center md:text-left">
            Profil de {driver.first_name} {driver.last_name}
          </h1>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/drivers")}
              className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm bg-primary text-white rounded-lg shadow-md hover:bg-primary/80"
            >
              Retour
            </Button>

            <Button
              onClick={handleExportPDF}
              className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm bg-secondary text-white rounded-lg shadow-md hover:bg-secondary/80"
            >
              <Download size={14} className="mr-1" /> Exporter PDF
            </Button>
          </div>
        </motion.div>

        <hr className="hr-light-effect mt-10 mb-10" />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex flex-col">
              {/* Profile Section */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img
                        src="/taxidriver.png"
                        alt="Photo du chauffeur"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-white">
                      {driver.first_name} {driver.last_name}
                    </h2>
                    <p className="text-blue-400">Chauffeur Professionnel</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Mail className="w-5 h-5" />
                      <span>{driver.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Phone className="w-5 h-5" />
                      <span>{driver.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Calendar className="w-5 h-5" />
                      <span>Né le: {driver.birth_date}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <MapPin className="w-5 h-5" />
                      <span>Lieu de naissance: {driver.birth_place}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Documents */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <Car className="w-5 h-5 mr-2" />
                  Documents & Licences
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Carte d'Identité
                    </label>
                    {driver?.id_card ? (
                      <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                        <span>Carte_ID.jpg</span>
                        <button
                          className="text-blue-400 hover:text-blue-300"
                          onClick={() =>
                            openModal(driver.id_card, "Carte d'identité")
                          }
                        >
                          Voir
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-400">Aucun document disponible</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Permis de Conduire
                    </label>
                    {driver?.driver_license_photo ? (
                      <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                        <span>Permis.jpg</span>
                        <button
                          className="text-blue-400 hover:text-blue-300"
                          onClick={() =>
                            openModal(
                              driver.driver_license_photo,
                              "Permis de conduire"
                            )
                          }
                        >
                          Voir
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-400">Aucun document disponible</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Carte Bancaire
                    </label>
                    {driver?.bank_card_photo ? (
                      <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                        <CreditCard className="w-5 h-5 text-gray-500" />
                        <button
                          className="text-blue-400 hover:text-blue-300"
                          onClick={() =>
                            openModal(driver.bank_card_photo, "Carte bancaire")
                          }
                        >
                          Voir
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-400">Aucun document disponible</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Contrat
                    </label>
                    {driver?.contract_photo ? (
                      <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                        <span>Contrat.pdf</span>
                        <button
                          className="text-blue-400 hover:text-blue-300"
                          onClick={() =>
                            openModal(driver.contract_photo, "Contrat")
                          }
                        >
                          Voir
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-400">Aucun document disponible</p>
                    )}
                  </div>
                </div>
              </div>
              {/* Created at */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg mt-6">
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Date de création
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Profil crée le{" "}
                      {new Date(driver.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Information */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              {/* Personal Details */}
              <motion.div
                className="bg-gray-800 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Informations Personnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Adresse
                    </label>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{driver.address}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Pays
                    </label>
                    <div className="flex items-center mt-1">
                      <Flag className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{driver.country}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Numéro National
                    </label>
                    <div className="flex items-center mt-1">
                      <CreditCardIcon className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{driver.national_id}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Nationalité
                    </label>
                    <span>{driver.nationality}</span>
                  </div>
                </div>
              </motion.div>

              {/* Work Schedule */}
              <motion.div
                className="bg-gray-800 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Horaires de Travail
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Jours de Travail
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "Lundi", key: "works_monday" },
                        { label: "Mardi", key: "works_tuesday" },
                        { label: "Mercredi", key: "works_wednesday" },
                        { label: "Jeudi", key: "works_thursday" },
                        { label: "Vendredi", key: "works_friday" },
                        { label: "Samedi", key: "works_saturday" },
                        { label: "Dimanche", key: "works_sunday" },
                      ].map(({ label, key }) => (
                        <label
                          key={key}
                          className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-lg"
                        >
                          <input
                            type="checkbox"
                            checked={driver[key]}
                            readOnly
                            className="form-checkbox text-blue-500"
                          />
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Type de Service
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Day", "Night", "Long"].map((shift) => (
                        <label
                          key={shift}
                          className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-lg"
                        >
                          <input
                            type="radio"
                            name="shift"
                            checked={driver.shift_type === shift}
                            readOnly
                            className="form-radio text-blue-500"
                          />
                          <span>{shift}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Type de Formule
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["50/50", "Forfait"].map((formula) => (
                        <label
                          key={formula}
                          className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-lg"
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
              </motion.div>

              {/* Modal */}
              <AnimatePresence>
                {modalImage && (
                  <motion.div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={closeModal}
                  >
                    <motion.div
                      className="bg-white rounded-lg overflow-hidden shadow-lg max-w-4xl w-full relative"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-semibold">{modalTitle}</h3>
                        <button
                          onClick={closeModal}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          &times;
                        </button>
                      </div>
                      <img
                        src={modalImage}
                        alt={modalTitle}
                        className="w-full h-auto object-contain p-4"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Payment Preferences */}
              <motion.div
                className="bg-gray-800 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <PaymentIcon className="w-5 h-5 mr-2" />
                  Préférences de Paiement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["Bolt", "Heetch", "Uber", "Taxi Vert"].map((service) => (
                    <div key={service}>
                      <h4 className="text-lg font-medium text-white mb-2">
                        {service}
                      </h4>
                      <div className="space-y-2">
                        {["app", "cash", "card"].map((method) => (
                          <label
                            key={method}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              checked={
                                driver[
                                  `accepts_${service
                                    .toLowerCase()
                                    .replace(" ", "_")}_${method}`
                                ]
                              }
                              readOnly
                              className="form-checkbox text-blue-500"
                            />
                            <span>
                              Accepte {service} {method}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">
                      Options de Paiement Générales
                    </h4>
                    <div className="space-y-2">
                      {["card", "check", "cash"].map((method) => (
                        <label
                          key={method}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={driver[`accepts_${method}_payment`]}
                            readOnly
                            className="form-checkbox text-blue-500"
                          />
                          <span>
                            Accepte{" "}
                            {method === "card"
                              ? "Carte"
                              : method === "check"
                              ? "Chèque"
                              : "Espèces"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contract Dates */}
              <motion.div
                className="bg-gray-800 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Période du Contrat
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Date de Début
                    </label>
                    <span>{driver.start_date}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">
                      Date de Fin
                    </label>
                    <span>{driver.end_date}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverProfile;
