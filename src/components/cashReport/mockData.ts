// Données mockées additionnelles
export const mockFinancials = {
  cashPayments: 7540,
  cardPayments: 8000,
  tips: 1000,
  refunds: -500,
  netRevenue: 16040,
};

export const mockDayDetails = [
  {
    date: "Lundi 10/07",
    total: 2750,
    activeDrivers: 4,
    weather: "☀️ Ensoleillé",
    specialEvents: ["Match de foot - Anderlecht", "Concert Forest National"],
  },
  {
    date: "Mardi 11/07",
    total: 2200,
    activeDrivers: 3,
    weather: "🌧️ Pluvieux",
    specialEvents: ["Grève STIB"],
  },
  // ... autres jours
];

export const mockDriverPerformance = [
  {
    id: 1,
    name: "Jean Dupont",
    rides: 84,
    revenue: 3200,
    hoursWorked: 45,
    revenuePerHour: 71.11,
    revenuePerRide: 38.10,
    attendance: 100,
  },
  {
    id: 2,
    name: "Marie Martin",
    rides: 76,
    revenue: 2800,
    hoursWorked: 40,
    revenuePerHour: 70,
    revenuePerRide: 36.84,
    attendance: 90,
  },
  // ... autres conducteurs
];

export const mockVehicles = [
  {
    id: "TX-001",
    averageRevenue: 850,
    mileage: 125000,
    alerts: ["Entretien prévu dans 500km", "Pneu avant droit à vérifier"],
  },
  {
    id: "TX-002",
    averageRevenue: 780,
    mileage: 98000,
  },
  // ... autres véhicules
];

import { type Anomaly } from "./cashReportFooter";

export const mockAnomalies: Anomaly[] = [
  {
    type: "absence",
    description: "Absence non prévenue",
    date: "11/07/2025",
    driverName: "Pierre Bernard",
    status: "pending",
  },
  {
    type: "dispute",
    description: "Litige client - Tarification",
    date: "10/07/2025",
    driverName: "Marie Martin",
    status: "resolved",
  },
  {
    type: "payment",
    description: "Retard de remise d'argent",
    date: "09/07/2025",
    driverName: "Jean Dupont",
    status: "pending",
  },
  {
    type: "complaint",
    description: "Réclamation client - Retard",
    date: "08/07/2025",
    driverName: "Sophie Dubois",
    status: "resolved",
  },
];

export const mockComparison = {
  previousWeek: {
    total: 14800,
    percentage: 8.3,
  },
  lastFourWeeks: {
    average: 15200,
    trend: "up" as const,
    percentage: 5.5,
  },
};
