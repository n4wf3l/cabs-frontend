import { useState } from "react";
import { motion } from "framer-motion";
import { format, subDays, addDays, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { CashReportHeader } from "@/components/cashReport/cashReportHeader";
import { CashReportStats } from "@/components/cashReport/cashReportStats";
import { CashReportGraphic } from "@/components/cashReport/cashReportGraphic";
import { CashReportRanking } from "@/components/cashReport/cashReportRanking";
import { CashReportFinancials } from "@/components/cashReport/cashReportFinancials";
import { CashReportDetails } from "@/components/cashReport/cashReportDetails";
import { CashReportFooter } from "@/components/cashReport/cashReportFooter";
import {
  mockFinancials,
  mockDayDetails,
  mockDriverPerformance,
  mockVehicles,
  mockAnomalies,
  mockComparison,
} from "@/components/cashReport/mockData";

// Données mockées pour le développement
const mockDrivers = [
  { id: 1, name: "Jean Dupont" },
  { id: 2, name: "Marie Martin" },
  { id: 3, name: "Pierre Bernard" },
  { id: 4, name: "Sophie Dubois" },
];

const generateWeekData = (startDate: Date, drivers: typeof mockDrivers) => {
  const data = [];
  let currentDate = startDate;
  
  for (let i = 0; i < 7; i++) {
    const dayData = {
      date: format(currentDate, 'yyyy-MM-dd'),
      displayDate: format(currentDate, 'EEE dd/MM', { locale: fr }),
      total: 0,
    };
    
    drivers.forEach(driver => {
      // Génère un montant aléatoire entre 300 et 800
      const amount = Math.floor(Math.random() * 500) + 300;
      dayData[`driver${driver.id}`] = amount;
      dayData.total += amount;
    });
    
    data.push(dayData);
    currentDate = addDays(currentDate, 1);
  }
  
  return data;
};

const generateDriverStats = (weekData: any[]) => {
  const stats = mockDrivers.map(driver => {
    const totalAmount = weekData.reduce((sum, day) => sum + day[`driver${driver.id}`], 0);
    const avgAmount = totalAmount / weekData.length;
    const maxDay = weekData.reduce((max, day) => 
      day[`driver${driver.id}`] > (max.amount || 0) 
        ? { date: day.displayDate, amount: day[`driver${driver.id}`] }
        : max
    , {});

    return {
      id: driver.id,
      name: driver.name,
      totalAmount,
      avgAmount,
      bestDay: maxDay,
    };
  }).sort((a, b) => b.totalAmount - a.totalAmount);

  return stats;
};

const CashReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("thisWeek");
  const [selectedView, setSelectedView] = useState("daily");
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedDriver, setSelectedDriver] = useState("all");

  // Génère les données pour la semaine courante
  const weekData = generateWeekData(currentWeekStart, mockDrivers);
  const driverStats = generateDriverStats(weekData);
  const topDriver = driverStats[0];

  // Navigation temporelle
  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart(date => 
      direction === 'prev' 
        ? subDays(date, 7) 
        : addDays(date, 7)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 space-y-6"
    >
      <CashReportHeader
        currentWeekStart={currentWeekStart}
        selectedDriver={selectedDriver}
        selectedView={selectedView}
        onDriverChange={setSelectedDriver}
        onViewChange={setSelectedView}
        onNavigateWeek={navigateWeek}
        drivers={mockDrivers}
      />

      <CashReportStats
        weekTotal={weekData.reduce((sum, day) => sum + day.total, 0)}
        averagePerDriver={weekData.reduce((sum, day) => sum + day.total, 0) / mockDrivers.length}
        topDriver={topDriver}
      />

      <CashReportGraphic
        selectedView={selectedView}
        selectedDriver={selectedDriver}
        weekData={weekData}
        driverStats={driverStats}
        drivers={mockDrivers}
      />

      <CashReportRanking
        driverStats={driverStats}
      />

      <CashReportFinancials
        stats={mockFinancials}
      />

      <CashReportDetails
        dayDetails={mockDayDetails}
        driverPerformance={mockDriverPerformance}
        vehicles={mockVehicles}
      />

      <CashReportFooter
        anomalies={mockAnomalies}
        comparison={mockComparison}
      />
    </motion.div>
  );
};

export default CashReport;
