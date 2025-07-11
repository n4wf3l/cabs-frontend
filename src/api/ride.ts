import api from "./api";

export interface RideResponseDTO {
  id: number;
  shiftId: number;
  startAddress: string;
  endAddress: string;
  duration: string;
  distanceKm: number;
  remarks?: string;
}

export interface RideRequestDTO {
  shiftId: number;
  startAddress: string;
  endAddress: string;
  duration: string;
  distanceKm: number;
  remarks?: string;
}

// Helper function to convert minutes to ISO 8601 duration
export const minutesToDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `PT${hours}H${remainingMinutes}M`;
};

// Helper function to convert ISO 8601 duration to minutes
export const durationToMinutes = (duration: string): number => {
  const match = duration.match(/PT(\d+)H(\d+)M/);
  if (!match) return 0;
  return parseInt(match[1]) * 60 + parseInt(match[2]);
};

// Fetch all rides
export const fetchRides = async (): Promise<RideResponseDTO[]> => {
  try {
    const response = await api.get("/get-rides");
    return response.data;
  } catch (error) {
    console.error("Error fetching rides:", error);
    throw error;
  }
};

// Fetch a single ride by ID
export const fetchRideById = async (id: number): Promise<RideResponseDTO> => {
  try {
    const response = await api.get(`/get-ride/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ride:", error);
    throw error;
  }
};

// Create a new ride
export const createRide = async (rideData: RideRequestDTO): Promise<string> => {
  try {
    const response = await api.post("/create-ride", rideData);
    return response.data;
  } catch (error) {
    console.error("Error creating ride:", error);
    throw error;
  }
};

// Update an existing ride
export const updateRide = async (
  id: number,
  rideData: RideRequestDTO
): Promise<string> => {
  try {
    const response = await api.put(`/edit-ride/${id}`, rideData);
    return response.data;
  } catch (error) {
    console.error("Error updating ride:", error);
    throw error;
  }
};

// Delete a ride
export const deleteRide = async (id: number): Promise<void> => {
  try {
    await api.delete(`/delete-ride/${id}`);
  } catch (error) {
    console.error("Error deleting ride:", error);
    throw error;
  }
};

// Validate ride data
export const validateRideData = (data: RideRequestDTO): boolean => {
  return !!(
    data.shiftId &&
    data.startAddress &&
    data.endAddress &&
    data.duration &&
    typeof data.distanceKm === "number"
  );
};

// Format duration for display
export const formatDurationForDisplay = (duration: string): string => {
  const minutes = durationToMinutes(duration);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

// Format distance for display
export const formatDistanceForDisplay = (distanceKm: number): string => {
  return `${distanceKm.toFixed(1)} km`;
};
