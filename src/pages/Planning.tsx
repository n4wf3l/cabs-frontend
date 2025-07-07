import { Sidebar } from "@/components/Sidebar";
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
import { PlanningHeader } from "@/components/planning/PlanningHeader";
import { PlanningSchema } from "@/components/planning/PlanningSchema";
import { PlanningRequests } from "@/components/planning/PlanningRequests";
import { PlanningAssignDriverModal } from "@/components/planning/PlanningAssignDriverModal";
import { PlanningHistoryModal } from "@/components/planning/PlanningHistoryModal";

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
          type === "Jour" ? "bg-yellow-800" : "bg-purple-900"
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
      <main className="flex-1 p-4 md:p-8">
        <PlanningHeader weekStart={weekStart} weekEnd={weekEnd} />
        <hr className="hr-light-effect mt-10 mb-10" />
        {/* Week Navigation - supprimé car déplacé dans PlanningSchema */}
        {/* Calendar Grid */}
        <PlanningSchema
          weekStart={weekStart}
          weekEnd={weekEnd}
          daysOfWeek={daysOfWeek}
          ShiftCard={ShiftCard}
          handlePreviousWeek={handlePreviousWeek}
          handleNextWeek={handleNextWeek}
          setShowHistoryModal={setShowHistoryModal}
          setShowAssignModal={setShowAssignModal}
          setSelectedShift={setSelectedShift}
        />

        {/* Requests Section */}
        <PlanningRequests
          requests={requests}
          handleRequestAction={handleRequestAction}
        />
      </main>
      <PlanningAssignDriverModal
        show={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        selectedShift={selectedShift}
        chauffeurs={mockChauffeurs}
        onAssign={handleAssignChauffeur}
      />
      <PlanningHistoryModal
        show={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        requests={requests}
      />
    </div>
  );
}

export default App;
