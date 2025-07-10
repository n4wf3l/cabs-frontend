import api from "./api";

// Interface correspondant exactement au DriverResponseDTO du backend
export interface DriverResponse {
  // User fields
  firstName: string;
  lastName: string;
  email: string;
  
  // Driver fields
  id: number;
  phoneNumber: string;
  address: string;
  postalCode: string;
  cityOfBirth: string;
  dateOfBirth: string; // LocalDate sera sérialisé en string ISO
  paymentsEnabled: boolean;
  availableForReplacement: boolean;
  onLeave: boolean;
}

// Interface pour la création d'un conducteur selon DriverSignupRequestDTO
export interface CreateDriverRequest {
  // User-related fields
  firstName: string;
  lastName: string;
  email: string;
  password: string;  // Requis pour la création
  
  // Driver-related fields
  phoneNumber: string;
  address: string;
  postalCode: string;
  cityOfBirth: string;
  dateOfBirth: string;  // sera converti en LocalDate côté backend
  
  // Status fields (optionnels lors de la création)
  paymentsEnabled?: boolean;
  availableForReplacement?: boolean;
  onLeave?: boolean;
}

// Interface pour la mise à jour d'un conducteur
export interface UpdateDriverRequest extends CreateDriverRequest {
  id: number;
}

// ✅ Récupérer tous les conducteurs
export const fetchDrivers = async (): Promise<DriverResponse[]> => {
  try {
    const response = await api.get("/get-drivers");  // Endpoint exact du contrôleur
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching drivers:", error);
    throw error;
  }
};

// ✅ Récupérer un conducteur par ID
export const fetchDriverById = async (id: number): Promise<DriverResponse> => {
  try {
    const response = await api.get(`/get-driver/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching driver:", error);
    throw error;
  }
};

// ✅ Créer un nouveau conducteur
export const createDriver = async (driverData: CreateDriverRequest): Promise<string> => {
  try {
    const response = await api.post("/create-driver", driverData);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating driver:", error);
    throw error;
  }
};

// ✅ Mettre à jour un conducteur
export const updateDriver = async (id: number, driverData: UpdateDriverRequest): Promise<DriverResponse> => {
  try {
    const response = await api.put(`/edit-driver/${id}`, driverData);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating driver:", error);
    throw error;
  }
};

// ✅ Supprimer un conducteur
export const deleteDriver = async (id: number): Promise<void> => {
  try {
    await api.delete(`/delete-driver/${id}`);
  } catch (error) {
    console.error("❌ Error deleting driver:", error);
    throw error;
  }
};
