export enum ShiftType {
  DAY = "DAY",
  NIGHT = "NIGHT",
}

export enum Status {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface ShiftResponseDTO {
  id: number;
  date: string;
  vehicleId: number;
  licensePlate: string;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  status: Status;
  createdAt: string;
}

export interface ShiftRequestDTO {
  date: string;
  vehicleId: number;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  status: Status;
}