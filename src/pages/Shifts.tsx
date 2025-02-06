import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ShiftSearch } from "@/components/shifts/ShiftSearch";
import { ShiftGrid } from "@/components/shifts/ShiftGrid";
import { ShiftPagination } from "@/components/shifts/ShiftPagination";
import { Menu } from "lucide-react";
import { motion } from "framer-motion"; // 👉 Import Framer Motion

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

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar responsive */}
      <div
        className={`fixed z-50 md:relative md:translate-x-0 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 mt-10 p-4 md:p-8 md:ml-64">
        {/* Titre animé */}
        <motion.h1
          className="text-2xl font-bold mb-8 text-center md:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Gestion des Shifts
        </motion.h1>

        <hr className="hr-light-effect mb-10" />

        {/* Composant de recherche avec animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ShiftSearch onSearch={setSearchTerm} />
        </motion.div>

        {/* Grille des shifts animée */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6"
        >
          <ShiftGrid shifts={currentShifts} />
        </motion.div>

        {/* Pagination animée */}
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
      </div>
    </div>
  );
};

export default Shifts;
