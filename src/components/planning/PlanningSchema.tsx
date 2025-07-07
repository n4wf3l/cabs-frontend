import { motion } from "framer-motion";
import { addDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Bell,
  History,
  UserPlus,
  UserCog,
} from "lucide-react";

// Exemples de chauffeurs (prénom + initiale)
const chauffeursList = [
  "Jean D.",
  "Marie M.",
  "Pierre B.",
  "Sophie D.",
  "Lucas M.",
  "Emma P.",
  "Thomas L.",
  "Julie R.",
  "Nicolas G.",
  "Camille S.",
];

export function PlanningSchema({
  weekStart,
  weekEnd,
  daysOfWeek,
  ShiftCard,
  handlePreviousWeek,
  handleNextWeek,
  setShowHistoryModal,
  setShowAssignModal,
  setSelectedShift,
}) {
  // 10 plaques d'immatriculation belges différentes
  const plates = [
    "T-445-DSC",
    "T-123-ABC",
    "T-987-XYZ",
    "T-654-QWE",
    "T-321-RTY",
    "T-852-POI",
    "T-963-LKM",
    "T-741-UIO",
    "T-159-DFG",
    "T-258-HJK",
  ];

  // Pour simuler des places libres, on laisse 3 places libres aléatoirement
  function getAssignments() {
    // On mélange les chauffeurs et on laisse 3 places libres
    const shuffled = [...chauffeursList].sort(() => 0.5 - Math.random());
    const assignments = [];
    let chauffeurIdx = 0;
    for (let i = 0; i < plates.length; i++) {
      if ([2, 5, 8].includes(i)) {
        assignments.push(null); // Place libre
      } else {
        assignments.push(shuffled[chauffeurIdx]);
        chauffeurIdx++;
      }
    }
    return assignments;
  }

  const LocalShiftCard = ({ type, day }) => {
    const assignments = getAssignments();
    return (
      <div
        className={`p-4 rounded-lg ${
          type === "Jour" ? "bg-yellow-800" : "bg-purple-900"
        } mb-2`}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300 font-medium flex items-center gap-2">
            {type}
          </span>
        </div>
        <div className="space-y-1">
          {plates.map((plate, idx) => (
            <div
              key={plate + idx}
              className="flex items-center text-sm text-white bg-gray-700/50 rounded px-2 py-1 gap-2"
              style={{ minHeight: 32 }}
            >
              <span className="whitespace-nowrap">{plate}</span>
              {assignments[idx] ? (
                <>
                  <span className="ml-2 max-w-[90px] truncate whitespace-nowrap">
                    {assignments[idx]}
                  </span>
                  <button
                    className="ml-2 p-1 rounded-full hover:bg-gray-600"
                    title="Réassigner un chauffeur"
                    onClick={() => {
                      setSelectedShift({ day, type, plate });
                      setShowAssignModal(true);
                    }}
                  >
                    <UserCog size={16} />
                  </button>
                </>
              ) : (
                <>
                  <span className="ml-2 text-gray-300 max-w-[60px] truncate whitespace-nowrap">
                    Libre
                  </span>
                  <button
                    className="ml-2 p-1 rounded-full hover:bg-gray-600"
                    title="Assigner un chauffeur"
                    onClick={() => {
                      setSelectedShift({ day, type, plate });
                      setShowAssignModal(true);
                    }}
                  >
                    <UserPlus size={16} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
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
                <LocalShiftCard type="Jour" day={day} />
                <LocalShiftCard type="Nuit" day={day} />
              </div>
            </div>
          );
        })}
      </motion.div>
    </>
  );
}
