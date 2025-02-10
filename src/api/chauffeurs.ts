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

// ✅ Delete a chauffeur by ID
export const deleteChauffeur = async (id: string) => {
  try {
    console.log("Deleting chauffeur with ID:", id); // Debug log
    await api.delete(`/chauffeurs/${id}`);
    console.log("Chauffeur deleted successfully"); // Debug log
  } catch (error) {
    console.error("Error deleting chauffeur:", error); // Debug log
    throw error;
  }
};

// ✅ Update a chauffeur
export const updateChauffeur = async (id: string, formData: FormData) => {
  try {
    const response = await api.put(`/chauffeurs/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating chauffeur:", error);
    throw error;
  }
};


