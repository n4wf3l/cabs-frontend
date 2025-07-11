export interface RouteSheet {
  id: string;
  driverName: string;
  vehicleId: string;
  shiftType: "day" | "night";
  date: string;
  startTime: string;
  endTime: string;
  startLocation: string;
  endLocation: string;
  status: "completed" | "in-progress" | "planned";
  kilometers: number;
  revenue: number;
}

export type DateFilterType = "today" | "yesterday" | "week" | "month";
export type StatusFilterType = "all" | "completed" | "in-progress" | "planned";
export type SortField = "driverName" | "date" | "status" | "revenue" | "kilometers";
export type SortDirection = "asc" | "desc";

export const statusColors = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  planned: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
};

export const statusLabels = {
  completed: "Terminé",
  "in-progress": "En cours",
  planned: "Planifié",
};

export const shiftLabels = {
  day: "Jour",
  night: "Nuit",
};
