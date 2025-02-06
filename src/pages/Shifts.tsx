import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ShiftSearch } from "@/components/shifts/ShiftSearch";
import { ShiftGrid } from "@/components/shifts/ShiftGrid";
import { ShiftPagination } from "@/components/shifts/ShiftPagination";

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
  // Add more mock shifts as needed
];

const Shifts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const shiftsPerPage = 9;

  const filteredShifts = mockShifts.filter(
    (shift) =>
      shift.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.date.includes(searchTerm)
  );

  const indexOfLastShift = currentPage * shiftsPerPage;
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  const currentShifts = filteredShifts.slice(indexOfFirstShift, indexOfLastShift);
  const totalPages = Math.ceil(filteredShifts.length / shiftsPerPage);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-2xl font-bold mb-8">Gestion des Shifts</h1>
        <ShiftSearch onSearch={setSearchTerm} />
        <ShiftGrid shifts={currentShifts} />
        <ShiftPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Shifts;