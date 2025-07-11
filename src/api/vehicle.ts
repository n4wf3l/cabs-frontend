import api from "./api";

export enum Transmission {
  MANUAL = "MANUAL",
  AUTOMATIC = "AUTOMATIC",
}

export interface VehicleDTO {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  transmission: Transmission;
  odometerKm: number;
  available: boolean;
  activeInShift: boolean;
  condition: string;
}

export interface VehicleRequestDTO {
  licensePlate: string;
  brand: string;
  model: string;
  transmission: Transmission;
  odometerKm: number;
  available: boolean;
  activeInShift: boolean;
  condition: string;
}

export interface VehicleUpdateDTO {
  licensePlate?: string;
  brand?: string;
  model?: string;
  transmission?: Transmission;
  odometerKm?: number;
  available?: boolean;
  activeInShift?: boolean;
  condition?: string;
}

export const fetchVehicles = async (): Promise<VehicleDTO[]> => {
  try {
    const response = await api.get("/get-vehicles");
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
};

// Fetch a single vehicle by ID
export const fetchVehicleById = async (id: number): Promise<VehicleDTO> => {
  try {
    const response = await api.get(`/get-vehicle/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    throw error;
  }
};

// Create a new vehicle
export const createVehicle = async (
  vehicleData: VehicleRequestDTO
): Promise<string> => {
  try {
    const response = await api.post("/create-vehicle", vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }
};

// Update an existing vehicle
export const updateVehicle = async (
  id: number,
  vehicleData: VehicleUpdateDTO
): Promise<VehicleDTO> => {
  try {
    const response = await api.put(`/update-vehicle/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }
};

// Delete a vehicle
export const deleteVehicle = async (id: number): Promise<void> => {
  try {
    await api.delete(`/delete-vehicle/${id}`);
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};
