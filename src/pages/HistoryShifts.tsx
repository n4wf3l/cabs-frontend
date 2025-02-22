import React from "react";
import {
  Clock,
  Car,
  User,
  Route,
  CreditCard,
  CarFront,
  MapPin,
  Calendar,
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import Essence from "@/components/dashboard/Essence";
import { ShiftPagination } from "@/components/shifts/ShiftPagination";

interface ShiftHistory {
  id: number;
  date: string;
  driverName: string;
  kilometers: number;
  startTime: string;
  endTime: string;
  revenue: number;
  licensePlate: string;
  previousDriver: string;
  nextDriver: string;
  startLocation: string;
  endLocation: string;
}

const shiftHistory: ShiftHistory[] = [
  {
    id: 1,
    date: "2024-03-15",
    driverName: "Thomas Dubois",
    kilometers: 245,
    startTime: "06:00",
    endTime: "14:00",
    revenue: 320.5,
    licensePlate: "AB-123-CD",
    previousDriver: "Marie Laurent",
    nextDriver: "Lucas Martin",
    startLocation: "Gare de Lyon, Paris",
    endLocation: "Aéroport Charles de Gaulle",
  },
  {
    id: 2,
    date: "2024-03-14",
    driverName: "Thomas Dubois",
    kilometers: 198,
    startTime: "07:00",
    endTime: "15:00",
    revenue: 275.8,
    licensePlate: "AB-123-CD",
    previousDriver: "Sophie Bernard",
    nextDriver: "Pierre Durand",
    startLocation: "Place de la République",
    endLocation: "La Défense",
  },
  {
    id: 3,
    date: "2024-03-13",
    driverName: "Thomas Dubois",
    kilometers: 312,
    startTime: "14:00",
    endTime: "22:00",
    revenue: 425.3,
    licensePlate: "EF-456-GH",
    previousDriver: "Jean Petit",
    nextDriver: "Claire Moreau",
    startLocation: "Gare du Nord",
    endLocation: "Orly Aéroport",
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function HistoryShifts() {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="fixed z-50 md:relative md:translate-x-0 transition-transform duration-300">
        <Sidebar />
      </div>

      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-center md:text-left">
            Historique des shifts
          </h1>
          <Essence />
        </motion.div>

        <hr className="hr-light-effect mt-10 mb-10" />

        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6">
            {shiftHistory.map((shift) => (
              <div
                key={shift.id}
                className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-blue-900/20 transition-all duration-300 border border-gray-700"
              >
                <div className="flex items-center gap-2 text-blue-400 mb-4">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">{formatDate(shift.date)}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-400">
                      <User className="w-5 h-5" />
                      <h2 className="font-semibold">{shift.driverName}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Route className="w-5 h-5" />
                      <span>{shift.kilometers} km parcourus</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <CarFront className="w-5 h-5" />
                      <span>Plaque: {shift.licensePlate}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-5 h-5" />
                      <span>
                        Début: {shift.startTime} - Fin: {shift.endTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <CreditCard className="w-5 h-5" />
                      <span>{shift.revenue.toFixed(2)} €</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-500">Départ:</p>
                          <p className="text-gray-300">{shift.startLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-sm text-gray-500">Arrivée:</p>
                          <p className="text-gray-300">{shift.endLocation}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-sm text-gray-500">
                      <p>
                        Chauffeur précédent:{" "}
                        <span className="text-gray-400">
                          {shift.previousDriver}
                        </span>
                      </p>
                      <p>
                        Chauffeur suivant:{" "}
                        <span className="text-gray-400">
                          {shift.nextDriver}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HistoryShifts;
