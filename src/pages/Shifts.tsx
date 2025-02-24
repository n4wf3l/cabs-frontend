import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import Essence from "@/components/dashboard/Essence";
import InteractiveResults from "@/components/dashboard/InteractiveResults";
import { ShiftSearch } from "@/components/shifts/ShiftSearch";
import { ShiftGrid } from "@/components/shifts/ShiftGrid";
import { ShiftPagination } from "@/components/shifts/ShiftPagination";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

export interface Shift {
  id: string;
  driverName: string;
  date: string;
  startTime: string;
  endTime: string;
  distance: number;
  status: "en_cours" | "terminé" | "annulé";
}

const mockShifts: Shift[] = [
  {
    id: "1",
    driverName: "Jean Dupont",
    date: "2024-02-06",
    startTime: "08:00",
    endTime: "16:00",
    distance: 120,
    status: "terminé",
  },
  {
    id: "2",
    driverName: "Marie Martin",
    date: "2024-02-06",
    startTime: "09:00",
    endTime: "17:00",
    distance: 85,
    status: "en_cours",
  },
  {
    id: "3",
    driverName: "Paul Durand",
    date: "2024-02-07",
    startTime: "07:30",
    endTime: "15:30",
    distance: 95,
    status: "terminé",
  },
  {
    id: "4",
    driverName: "Sophie Bernard",
    date: "2024-02-07",
    startTime: "10:00",
    endTime: "18:00",
    distance: 110,
    status: "annulé",
  },
  {
    id: "5",
    driverName: "Luc Moreau",
    date: "2024-02-08",
    startTime: "06:00",
    endTime: "14:00",
    distance: 130,
    status: "terminé",
  },
  {
    id: "6",
    driverName: "Clara Lefevre",
    date: "2024-02-08",
    startTime: "11:00",
    endTime: "19:00",
    distance: 75,
    status: "en_cours",
  },
  {
    id: "7",
    driverName: "Thomas Petit",
    date: "2024-02-09",
    startTime: "08:30",
    endTime: "16:30",
    distance: 140,
    status: "terminé",
  },
  {
    id: "8",
    driverName: "Emma Laurent",
    date: "2024-02-09",
    startTime: "09:15",
    endTime: "17:15",
    distance: 90,
    status: "en_cours",
  },
  {
    id: "9",
    driverName: "Hugo Simon",
    date: "2024-02-10",
    startTime: "07:00",
    endTime: "15:00",
    distance: 100,
    status: "annulé",
  },
  {
    id: "10",
    driverName: "Julie Fontaine",
    date: "2024-02-10",
    startTime: "10:30",
    endTime: "18:30",
    distance: 115,
    status: "terminé",
  },
  {
    id: "11",
    driverName: "Ahmed Ben Ali",
    date: "2024-02-11",
    startTime: "08:00",
    endTime: "16:00",
    distance: 150,
    status: "en_cours",
  },
  {
    id: "12",
    driverName: "Fatima Zahra",
    date: "2024-02-12",
    startTime: "09:30",
    endTime: "17:30",
    distance: 95,
    status: "terminé",
  },
  {
    id: "13",
    driverName: "Mohamed Karim",
    date: "2024-02-13",
    startTime: "07:45",
    endTime: "15:45",
    distance: 120,
    status: "annulé",
  },
  {
    id: "14",
    driverName: "Leila Haddad",
    date: "2024-02-14",
    startTime: "10:15",
    endTime: "18:15",
    distance: 80,
    status: "terminé",
  },
  {
    id: "15",
    driverName: "Omar El Idrissi",
    date: "2024-02-15",
    startTime: "06:30",
    endTime: "14:30",
    distance: 140,
    status: "en_cours",
  },
];

const Shifts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const shiftsPerPage = 9;

  const filteredShifts = mockShifts.filter(
    (shift) =>
      shift.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.date.includes(searchTerm)
  );

  const indexOfLastShift = currentPage * shiftsPerPage;
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  const currentShifts = filteredShifts.slice(
    indexOfFirstShift,
    indexOfLastShift
  );
  const totalPages = Math.ceil(filteredShifts.length / shiftsPerPage);

  const exportToPDF = (shift: Shift) => {
    const doc = new jsPDF();
    doc.text(`Détails du Shift`, 20, 20);
    doc.text(`Chauffeur: ${shift.driverName}`, 20, 30);
    doc.text(`Date: ${shift.date}`, 20, 40);
    doc.text(`Heure de début: ${shift.startTime}`, 20, 50);
    doc.text(`Heure de fin: ${shift.endTime}`, 20, 60);
    doc.text(`Distance: ${shift.distance} km`, 20, 70);
    doc.text(`Statut: ${shift.status}`, 20, 80);
    doc.save(`Shift_${shift.id}.pdf`);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-center md:text-left">
            Gestion des Shifts
          </h1>
          <InteractiveResults />
        </motion.div>

        <hr className="hr-light-effect mb-10" />

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ShiftSearch onSearch={setSearchTerm} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6"
        >
          <ShiftGrid
            shifts={currentShifts.map((shift) => ({
              ...shift,
              actions: (
                <div className="flex justify-between items-center space-x-2 mt-2">
                  <button
                    onClick={() => exportToPDF(shift)}
                    className="flex-1 p-2 bg-green-500 text-white rounded"
                  >
                    Exporter en PDF
                  </button>
                  <button
                    onClick={() =>
                      alert(`Détails du shift de ${shift.driverName}`)
                    }
                    className="flex-1 p-2 bg-blue-500 text-white rounded"
                  >
                    Voir Détails
                  </button>
                </div>
              ),
            }))}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8"
        >
          <ShiftPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default Shifts;
