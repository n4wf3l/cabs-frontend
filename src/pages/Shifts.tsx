import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import Essence from "@/components/header/Essence";
import ThreeBoxes from "@/components/header/ThreeBoxes";
import { ShiftSearch } from "@/components/shifts/ShiftSearch";
import { ShiftPagination } from "@/components/shifts/ShiftPagination";
import { Menu, Search, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import ShiftPreviewCard from "@/components/shifts/ShiftPreviewCard";
import ShiftCard from "@/components/shifts/ShiftCard";

export interface Shift {
  id: string;
  driverName: string;
  driverFirstName: string;
  date: string;
  startTime: string;
  endTime: string;
  distance: number;
  status: "en_cours" | "terminé" | "annulé";
  totalKm?: number;
  initialKm?: number;
  vehiclePhotos?: string[];
  entryTicket?: string;
  exitTicket?: string;
}

// Liste des shifts avec détails
const shiftsData: Shift[] = [
  {
    id: "1",
    driverName: "Jean",
    driverFirstName: "Dupont",
    date: "15-03-2024",
    startTime: "08:30",
    endTime: "16:30",
    distance: 245,
    status: "terminé",
    totalKm: 245,
    initialKm: 78920,
    vehiclePhotos: [
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
    ],
    entryTicket: "ticket.jpg",
    exitTicket: "ticket.jpg",
  },
  {
    id: "2",
    driverName: "Sophie",
    driverFirstName: "Martin",
    date: "15-03-2024",
    startTime: "09:00",
    endTime: "17:00",
    distance: 198,
    status: "terminé",
    totalKm: 198,
    initialKm: 45670,
    vehiclePhotos: [
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
    ],
    entryTicket: "ticket.jpg",
    exitTicket: "ticket.jpg",
  },
  {
    id: "3",
    driverName: "Sophie",
    driverFirstName: "Martin",
    date: "15-03-2024",
    startTime: "09:00",
    endTime: "17:00",
    distance: 198,
    status: "terminé",
    totalKm: 198,
    initialKm: 45670,
    vehiclePhotos: [
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
    ],
    entryTicket: "ticket.jpg",
    exitTicket: "ticket.jpg",
  },
  {
    id: "4",
    driverName: "Sophie",
    driverFirstName: "Martin",
    date: "15-03-2024",
    startTime: "09:00",
    endTime: "17:00",
    distance: 198,
    status: "terminé",
    totalKm: 198,
    initialKm: 45670,
    vehiclePhotos: [
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
    ],
    entryTicket: "ticket.jpg",
    exitTicket: "ticket.jpg",
  },
  {
    id: "5",
    driverName: "Sophie",
    driverFirstName: "Martin",
    date: "15-03-2024",
    startTime: "09:00",
    endTime: "17:00",
    distance: 198,
    status: "terminé",
    totalKm: 198,
    initialKm: 45670,
    vehiclePhotos: [
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
    ],
    entryTicket: "ticket.jpg",
    exitTicket: "ticket.jpg",
  },
  {
    id: "6",
    driverName: "Sophie",
    driverFirstName: "Martin",
    date: "15-03-2024",
    startTime: "09:00",
    endTime: "17:00",
    distance: 198,
    status: "terminé",
    totalKm: 198,
    initialKm: 45670,
    vehiclePhotos: [
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
    ],
    entryTicket: "ticket.jpg",
    exitTicket: "ticket.jpg",
  },
  {
    id: "7",
    driverName: "Sophie",
    driverFirstName: "Martin",
    date: "15-03-2024",
    startTime: "09:00",
    endTime: "17:00",
    distance: 198,
    status: "terminé",
    totalKm: 198,
    initialKm: 45670,
    vehiclePhotos: [
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
    ],
    entryTicket: "ticket.jpg",
    exitTicket: "ticket.jpg",
  },
  {
    id: "8",
    driverName: "Sophie",
    driverFirstName: "Martin",
    date: "15-03-2024",
    startTime: "09:00",
    endTime: "17:00",
    distance: 198,
    status: "terminé",
    totalKm: 198,
    initialKm: 45670,
    vehiclePhotos: [
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
    ],
    entryTicket: "ticket.jpg",
    exitTicket: "ticket.jpg",
  },
  {
    id: "9",
    driverName: "Sophie",
    driverFirstName: "Martin",
    date: "15-03-2024",
    startTime: "09:00",
    endTime: "17:00",
    distance: 198,
    status: "terminé",
    totalKm: 198,
    initialKm: 45670,
    vehiclePhotos: [
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
    ],
    entryTicket: "ticket.jpg",
    exitTicket: "ticket.jpg",
  },
  {
    id: "10",
    driverName: "Sophie",
    driverFirstName: "Martin",
    date: "15-03-2024",
    startTime: "09:00",
    endTime: "17:00",
    distance: 198,
    status: "terminé",
    totalKm: 198,
    initialKm: 45670,
    vehiclePhotos: [
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
      "taxiavant.jpg",
    ],
    entryTicket: "ticket.jpg",
    exitTicket: "ticket.jpg",
  },
];

const Shifts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

  const shiftsPerPage = 9;

  // Filtrer les shifts selon la recherche et la date sélectionnée
  const filteredShifts = shiftsData.filter((shift) => {
    const searchLower = searchQuery.toLowerCase();
    const nameMatch =
      shift.driverName.toLowerCase().includes(searchLower) ||
      shift.driverFirstName.toLowerCase().includes(searchLower);

    if (selectedDate) {
      const formattedSelectedDate = format(selectedDate, "dd-MM-yyyy");
      return nameMatch && shift.date === formattedSelectedDate;
    }
    return nameMatch;
  });

  // Calculer les indices pour la pagination
  const indexOfLastShift = currentPage * shiftsPerPage;
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  const currentShifts = filteredShifts.slice(
    indexOfFirstShift,
    indexOfLastShift
  );
  const totalPages = Math.ceil(filteredShifts.length / shiftsPerPage);

  // Exportation d’un shift en PDF
  const exportToPDF = (shift: Shift) => {
    const doc = new jsPDF();
    doc.text(`Détails du Shift`, 20, 20);
    doc.text(`Chauffeur: ${shift.driverName} ${shift.driverFirstName}`, 20, 30);
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

      <main className="flex-1 p-4 md:p-8">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-center md:text-left">
            Gestion des Shifts
          </h1>
          <ThreeBoxes />
        </motion.div>

        <hr className="hr-light-effect mb-10" />

        <div className="max-w-2xl mx-auto flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Rechercher par nom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 border-white/10"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-[240px] justify-start text-left font-normal ${
                  !selectedDate && "text-muted-foreground"
                }`}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {selectedDate
                  ? format(selectedDate, "dd MMMM yyyy", { locale: fr })
                  : "Sélectionner une date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card" align="start">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                locale={fr}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {currentShifts.map((shift) => (
            <ShiftPreviewCard
              key={shift.id}
              {...shift}
              onViewDetails={() => setSelectedShift(shift)}
            />
          ))}
        </div>

        <ShiftPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <Dialog
          open={!!selectedShift}
          onOpenChange={() => setSelectedShift(null)}
        >
          <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-sm border-white/10">
            {selectedShift && <ShiftCard {...selectedShift} />}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Shifts;
