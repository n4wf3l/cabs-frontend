import api from "./api";

export enum ShiftType {
  DAY = "DAY",
  NIGHT = "NIGHT",
}

export enum Status {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface ShiftResponseDTO {
  id: number;
  date: string;
  vehicleId: number;
  licensePlate: string;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  status: Status;
  createdAt: string;
}

export interface ShiftRequestDTO {
  date: string;
  vehicleId: number;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  status: Status;
}

// Fetch all shifts
export const fetchShifts = async (): Promise<ShiftResponseDTO[]> => {
  try {
    const response = await api.get("/get-shifts");
    return response.data;
  } catch (error) {
    console.error("Error fetching shifts:", error);
    throw error;
  }
};

// Fetch a single shift by ID
export const fetchShiftById = async (id: number): Promise<ShiftResponseDTO> => {
  try {
    const response = await api.get(`/get-shift/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching shift:", error);
    throw error;
  }
};

// Create a new shift
export const createShift = async (
  shiftData: ShiftRequestDTO
): Promise<string> => {
  try {
    const response = await api.post("/create-shift", shiftData);
    return response.data;
  } catch (error) {
    console.error("Error creating shift:", error);
    throw error;
  }
};

// Update an existing shift
export const updateShift = async (
  id: number,
  shiftData: ShiftRequestDTO
): Promise<string> => {
  try {
    const response = await api.put(`/edit-shift/${id}`, shiftData);
    return response.data;
  } catch (error) {
    console.error("Error updating shift:", error);
    throw error;
  }
};

// Delete a shift
export const deleteShift = async (id: number): Promise<void> => {
  try {
    await api.delete(`/delete-shift/${id}`);
  } catch (error) {
    console.error("Error deleting shift:", error);
    throw error;
  }
};

// Helper function to format date for API
export const formatDateForApi = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// Helper function to format time for API
export const formatTimeForApi = (date: Date): string => {
  return date.toTimeString().split(" ")[0];
};

// Helper function to parse API date
export const parseApiDate = (dateString: string): Date => {
  return new Date(dateString);
};

// Helper function to combine date and time strings
export const combineDateAndTime = (
  dateString: string,
  timeString: string
): Date => {
  return new Date(`${dateString}T${timeString}`);
};
