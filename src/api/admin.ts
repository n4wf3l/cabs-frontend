import api from "./api"; // Import the configured Axios instance

// ✅ Function to create a new Admin
export const createAdmin = async (adminData: { first_name: string; last_name: string; email: string; company_id: string }) => {
  try {
    const response = await api.post("/admins", adminData);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    throw error;
  }
};
