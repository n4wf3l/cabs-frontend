import api from "./api";
import {
  VehicleDTO,
  VehicleRequestDTO,
  VehicleUpdateDTO,
  Transmission,
} from "./models/VehicleDTO";

// Récupérer la liste des véhicules
export const fetchVehicles = async (): Promise<VehicleDTO[]> => {
  try {
    const response = await api.get("/get-vehicles");
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
};

// Récupérer un véhicule par ID
export const fetchVehicleById = async (id: number): Promise<VehicleDTO> => {
  try {
    const response = await api.get(`/get-vehicle/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    throw error;
  }
};

// Créer un nouveau véhicule
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

// Mettre à jour un véhicule existant
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

// Supprimer un véhicule
export const deleteVehicle = async (id: number): Promise<void> => {
  try {
    await api.delete(`/delete-vehicle/${id}`);
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};
