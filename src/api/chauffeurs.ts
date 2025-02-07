import api from "./api";

// ✅ Fetch all chauffeurs
export const fetchChauffeurs = async () => {
  try {
    const response = await api.get("/chauffeurs");
    return response.data;
  } catch (error) {
    console.error("Error fetching chauffeurs:", error);
    throw error;
  }
};

// ✅ Create a new chauffeur
export const createChauffeur = async (formData: FormData) => {
  try {
    const response = await api.post("/chauffeurs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating chauffeur:", error);
    throw error;
  }
};

// ✅ Fetch single chauffeur by ID
export const fetchChauffeurById = async (id: string) => {
  try {
    const response = await api.get(`/chauffeurs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chauffeur:", error);
    throw error;
  }
};
