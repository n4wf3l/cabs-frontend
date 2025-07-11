import api from "./api";
import {
  DriverResponseDTO,
  DriverSignupRequestDTO,
  DriverUpdateDTO,
} from "./models/DriverDTO";

// Récupérer la liste des chauffeurs
export const fetchDrivers = async (): Promise<DriverResponseDTO[]> => {
  try {
    const response = await api.get("/get-drivers");
    return response.data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    throw error;
  }
};

// Récupérer un chauffeur par son ID
export const fetchDriverById = async (id: number): Promise<DriverResponseDTO> => {
  try {
    const response = await api.get(`/get-driver/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching driver:", error);
    throw error;
  }
};

// Créer un nouveau chauffeur
export const createDriver = async (driverData: DriverSignupRequestDTO): Promise<string> => {
  try {
    const response = await api.post("/create-driver", driverData);
    return response.data;
  } catch (error) {
    console.error("Error creating driver:", error);
    throw error;
  }
};

// Mettre à jour un chauffeur existant
export const updateDriver = async (id: number, driverData: DriverUpdateDTO): Promise<DriverResponseDTO> => {
  try {
    const response = await api.put(`/edit-driver/${id}`, driverData);
    return response.data;
  } catch (error) {
    console.error("Error updating driver:", error);
    throw error;
  }
};

// Supprimer un chauffeur
export const deleteDriver = async (id: number): Promise<void> => {
  try {
    await api.delete(`/delete-driver/${id}`);
  } catch (error) {
    console.error("Error deleting driver:", error);
    throw error;
  }
};
