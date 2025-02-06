import { Sidebar } from "@/components/dashboard/Sidebar";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Bell,
  UserPlus,
  Eye,
  X,
  Check,
  History,
} from "lucide-react";
import { format, addWeeks, startOfWeek, endOfWeek, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion"; // Importer Framer Motion

const daysOfWeek = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

interface Chauffeur {
  id: string;
  name: string;
  status?: "available" | "holiday" | "sick";
}

interface Shift {
  type: "Jour" | "Nuit";
  chauffeurs: Chauffeur[];
}

interface Request {
  id: string;
  chauffeurId: string;
  chauffeurName: string;
  type: "work" | "holiday" | "sick";
  date: Date;
  shift: "Jour" | "Nuit";
  status: "pending" | "approved" | "rejected";
}

const mockChauffeurs: Chauffeur[] = [
  { id: "1", name: "Jean Dupont" },
  { id: "2", name: "Marie Martin" },
  { id: "3", name: "Pierre Bernard" },
  { id: "4", name: "Sophie Dubois" },
  { id: "5", name: "Lucas Moreau" },
  { id: "6", name: "Emma Petit" },
  { id: "7", name: "Thomas Leroy" },
  { id: "8", name: "Julie Roux" },
  { id: "9", name: "Nicolas Girard" },
  { id: "10", name: "Camille Simon" },
];

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState<{
    day: string;
    type: "Jour" | "Nuit";
  } | null>(null);
  const [shifts, setShifts] = useState<
    Record<string, Record<"Jour" | "Nuit", Chauffeur[]>>
  >({});
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      chauffeurId: "1",
      chauffeurName: "Jean Dupont",
      type: "holiday",
      date: new Date(),
      shift: "Jour",
      status: "pending",
    },
    {
      id: "2",
      chauffeurId: "2",
      chauffeurName: "Marie Martin",
      type: "sick",
      date: new Date(),
      shift: "Nuit",
      status: "approved",
    },
    {
      id: "3",
      chauffeurId: "3",
      chauffeurName: "Pierre Bernard",
      type: "work",
      date: new Date(),
      shift: "Jour",
      status: "rejected",
    },
  ]);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

  const handlePreviousWeek = () => setCurrentDate(addWeeks(currentDate, -1));
  const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

  const handleAssignChauffeur = (chauffeur: Chauffeur) => {
    if (!selectedShift) return;

    setShifts((prev) => {
      const dayShifts = prev[selectedShift.day] || { Jour: [], Nuit: [] };
      const updatedShifts = {
        ...prev,
        [selectedShift.day]: {
          ...dayShifts,
          [selectedShift.type]: [
            ...(dayShifts[selectedShift.type] || []),
            chauffeur,
          ],
        },
      };
      return updatedShifts;
    });
  };

  const handleRemoveChauffeur = (
    day: string,
    type: "Jour" | "Nuit",
    chauffeurId: string
  ) => {
    setShifts((prev) => {
      const dayShifts = prev[day] || { Jour: [], Nuit: [] };
      return {
        ...prev,
        [day]: {
          ...dayShifts,
          [type]: dayShifts[type].filter((c) => c.id !== chauffeurId),
        },
      };
    });
  };

  const handleRequestAction = (requestId: string, approved: boolean) => {
    setRequests((prev) =>
      prev.map((request) => {
        if (request.id === requestId) {
          if (approved) {
            // If approved, update the shifts accordingly
            const dayKey = format(request.date, "EEEE", { locale: fr });
            if (request.type === "work") {
              handleAssignChauffeur({
                id: request.chauffeurId,
                name: request.chauffeurName,
              });
            } else {
              // For holiday or sick leave, mark the chauffeur's status
              setShifts((prev) => {
                const dayShifts = prev[dayKey] || { Jour: [], Nuit: [] };
                return {
                  ...prev,
                  [dayKey]: {
                    ...dayShifts,
                    [request.shift]: dayShifts[request.shift].map((c) =>
                      c.id === request.chauffeurId
                        ? {
                            ...c,
                            status:
                              request.type === "holiday" ? "holiday" : "sick",
                          }
                        : c
                    ),
                  },
                };
              });
            }
          }
          return { ...request, status: approved ? "approved" : "rejected" };
        }
        return request;
      })
    );
  };

  const ShiftCard = ({ type, day }: { type: "Jour" | "Nuit"; day: string }) => {
    const assignedChauffeurs = shifts[day]?.[type] || [];

    return (
      <div
        className={`p-4 rounded-lg ${
          type === "Jour" ? "bg-gray-800" : "bg-gray-900"
        } mb-2`}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300 font-medium">{type}</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedShift({ day, type });
                setShowAssignModal(true);
              }}
              className="p-1.5 rounded-full hover:bg-gray-700 text-blue-400"
            >
              <UserPlus size={16} />
            </button>
            <button className="p-1.5 rounded-full hover:bg-gray-700 text-blue-400">
              <Eye size={16} />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {assignedChauffeurs.length === 0 ? (
            <div className="text-sm text-gray-400">Non Assigné</div>
          ) : (
            assignedChauffeurs.map((chauffeur) => (
              <div
                key={chauffeur.id}
                className={`flex justify-between items-center p-2 rounded bg-gray-700/50 text-sm ${
                  chauffeur.status === "holiday"
                    ? "bg-blue-900/20"
                    : chauffeur.status === "sick"
                    ? "bg-red-900/20"
                    : ""
                }`}
              >
                <span className="flex items-center gap-2">
                  {chauffeur.name}
                  {chauffeur.status === "holiday" && (
                    <span className="text-xs text-blue-400">Congé</span>
                  )}
                  {chauffeur.status === "sick" && (
                    <span className="text-xs text-red-400">Malade</span>
                  )}
                </span>
                <button
                  onClick={() => handleRemoveChauffeur(day, type, chauffeur.id)}
                  className="p-1 hover:bg-gray-600 rounded"
                >
                  <X size={14} className="text-gray-400" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-2xl font-bold">Planning</h1>
        </motion.div>
        <hr className="hr-light-effect mt-10 mb-10" />
        {/* Week Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center gap-4">
            <Calendar className="text-blue-400" />
            <h2 className="text-xl font-medium">
              Semaine du {format(weekStart, "dd/MM/yyyy", { locale: fr })} au{" "}
              {format(weekEnd, "dd/MM/yyyy", { locale: fr })}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={handlePreviousWeek}
                className="p-2 rounded-lg hover:bg-gray-800"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextWeek}
                className="p-2 rounded-lg hover:bg-gray-800"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="flex items-center gap-2 pl-4 border-l border-gray-700">
              <button
                onClick={() => setShowHistoryModal(true)}
                className="p-2 rounded-lg hover:bg-gray-800"
              >
                <History size={20} />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-800 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-7 gap-4"
        >
          {daysOfWeek.map((day, index) => {
            const date = addDays(weekStart, index);
            return (
              <div key={day} className="space-y-2">
                <div className="text-center py-2 bg-gray-800 rounded-lg">
                  <div className="font-medium">{day}</div>
                  <div className="text-sm text-gray-400">
                    {format(date, "dd/MM", { locale: fr })}
                  </div>
                </div>
                <div className="space-y-2">
                  <ShiftCard type="Jour" day={day} />
                  <ShiftCard type="Nuit" day={day} />
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Requests Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-gray-900 rounded-lg p-4"
        >
          <h3 className="text-lg font-medium mb-4">Demandes</h3>
          <div className="space-y-3">
            {requests
              .filter((request) => request.status === "pending")
              .map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                >
                  <div>
                    <span className="block font-medium">
                      {request.chauffeurName}
                    </span>
                    <span className="text-sm text-gray-400">
                      {request.type === "work" && "Demande de Travail"}
                      {request.type === "holiday" && "Demande de Jour Libre"}
                      {request.type === "sick" && "Demande de Congé Maladie"}
                      {" - "}
                      {format(request.date, "dd/MM/yyyy")} ({request.shift})
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRequestAction(request.id, true)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => handleRequestAction(request.id, false)}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </main>

      {/* Assign Driver Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Assigner un Chauffeur - {selectedShift?.day} (
                {selectedShift?.type})
              </h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="p-1.5 hover:bg-gray-800 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto space-y-2 mb-4">
              {mockChauffeurs.map((driver) => (
                <button
                  key={driver.id}
                  onClick={() => {
                    handleAssignChauffeur(driver);
                    setShowAssignModal(false);
                  }}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {driver.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Historique des Demandes</h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1.5 hover:bg-gray-800 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex gap-4 mb-4">
              <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700">
                Demandes Approuvées
              </button>
              <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700">
                Demandes Refusées
              </button>
            </div>
            <div className="overflow-y-auto flex-1 space-y-3">
              {requests
                .filter((request) => request.status !== "pending")
                .map((request) => (
                  <div
                    key={request.id}
                    className={`p-3 rounded-lg ${
                      request.status === "approved"
                        ? "bg-green-900/20"
                        : "bg-red-900/20"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="block font-medium">
                          {request.chauffeurName}
                        </span>
                        <span className="text-sm text-gray-400">
                          {request.type === "work" && "Demande de Travail"}
                          {request.type === "holiday" &&
                            "Demande de Jour Libre"}
                          {request.type === "sick" &&
                            "Demande de Congé Maladie"}
                          {" - "}
                          {format(request.date, "dd/MM/yyyy")} ({request.shift})
                        </span>
                      </div>
                      <span
                        className={`text-sm px-2 py-1 rounded ${
                          request.status === "approved"
                            ? "bg-green-900/40 text-green-400"
                            : "bg-red-900/40 text-red-400"
                        }`}
                      >
                        {request.status === "approved" ? "Approuvé" : "Refusé"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
