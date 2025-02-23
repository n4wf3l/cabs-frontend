import api from "./api"; // Import the configured Axios instance

// ✅ Function to create a new Admin
export const createAdmin = async (adminData: { first_name: string; last_name: string; email: string; company_id: string, password: string}) => {
  try {
    const response = await api.post("/admins", adminData);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    throw error;
  }
};


// ✅ Fetch single chauffeur by ID
export const fetchAdminById = async (id: string) => {
  try {
    const response = await api.get(`/admins/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chauffeur:", error);
    throw error;
  }
};

const fetchAdminByAuthUserId = async (authUserId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/admins/auth/${authUserId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

