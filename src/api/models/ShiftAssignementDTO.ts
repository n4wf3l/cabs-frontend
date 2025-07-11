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