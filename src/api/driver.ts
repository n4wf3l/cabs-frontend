import api from "./api";

export interface DriverResponseDTO {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  phoneNumber: string;
  address: string;
  postalCode: string;
  cityOfBirth: string;
  dateOfBirth: string;
  paymentsEnabled: boolean;
  availableForReplacement: boolean;
  onLeave: boolean;
}

export interface DriverSignupRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  cityOfBirth: string;
  dateOfBirth: string;
  paymentsEnabled: boolean;
  availableForReplacement: boolean;
  onLeave: boolean;
}

export interface DriverUpdateDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  postalCode?: string;
  cityOfBirth?: string;
  dateOfBirth?: string;
  paymentsEnabled?: boolean;
  availableForReplacement?: boolean;
  onLeave?: boolean;
}

export const fetchDrivers = async (): Promise<DriverResponseDTO[]> => {
  try {
    const response = await api.get("/get-drivers");
    return response.data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    throw error;
  }
};

export const fetchDriverById = async (id: number): Promise<DriverResponseDTO> => {
  try {
    const response = await api.get(`/get-driver/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching driver:", error);
    throw error;
  }
};

export const createDriver = async (driverData: DriverSignupRequestDTO): Promise<string> => {
  try {
    const response = await api.post("/create-driver", driverData);
    return response.data;
  } catch (error) {
    console.error("Error creating driver:", error);
    throw error;
  }
};

export const updateDriver = async (id: number, driverData: DriverUpdateDTO): Promise<DriverResponseDTO> => {
  try {
    const response = await api.put(`/edit-driver/${id}`, driverData);
    return response.data;
  } catch (error) {
    console.error("Error updating driver:", error);
    throw error;
  }
};

export const deleteDriver = async (id: number): Promise<void> => {
  try {
    await api.delete(`/delete-driver/${id}`);
  } catch (error) {
    console.error("Error deleting driver:", error);
    throw error;
  }
};
