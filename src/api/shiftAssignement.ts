import api from "./api";

export interface ShiftAssignmentResponseDTO {
  id: number;
  shiftId: number;
  driverId: number;
  assignedAt: string;
}

export interface ShiftAssignmentRequestDTO {
  shiftId: number;
  driverId: number;
}

// Fetch all shift assignments
export const fetchShiftAssignments = async (): Promise<
  ShiftAssignmentResponseDTO[]
> => {
  try {
    const response = await api.get("/get-shift-assignments");
    return response.data;
  } catch (error) {
    console.error("Error fetching shift assignments:", error);
    throw error;
  }
};

// Fetch a single shift assignment by ID
export const fetchShiftAssignmentById = async (
  id: number
): Promise<ShiftAssignmentResponseDTO> => {
  try {
    const response = await api.get(`/get-shift-assignment/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching shift assignment:", error);
    throw error;
  }
};

// Create a new shift assignment
export const createShiftAssignment = async (
  assignmentData: ShiftAssignmentRequestDTO
): Promise<string> => {
  try {
    const response = await api.post("/create-shift-assignment", assignmentData);
    return response.data;
  } catch (error) {
    console.error("Error creating shift assignment:", error);
    throw error;
  }
};

// Update an existing shift assignment
export const updateShiftAssignment = async (
  id: number,
  assignmentData: ShiftAssignmentRequestDTO
): Promise<string> => {
  try {
    const response = await api.put(
      `/edit-shift-assignment/${id}`,
      assignmentData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating shift assignment:", error);
    throw error;
  }
};

// Delete a shift assignment
export const deleteShiftAssignment = async (id: number): Promise<void> => {
  try {
    await api.delete(`/delete-shift-assignment/${id}`);
  } catch (error) {
    console.error("Error deleting shift assignment:", error);
    throw error;
  }
};

// Helper function to format the assigned date for display
export const formatAssignedDate = (assignedAt: string): string => {
  return new Date(assignedAt).toLocaleString();
};

// Helper function to validate assignment request
export const validateAssignmentRequest = (
  data: ShiftAssignmentRequestDTO
): boolean => {
  return !!(data.shiftId && data.driverId);
};
