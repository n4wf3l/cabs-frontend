export interface RideResponseDTO {
  id: number;
  shiftId: number;
  startAddress: string;
  endAddress: string;
  duration: string;
  distanceKm: number;
  remarks?: string;
}

export interface RideRequestDTO {
  shiftId: number;
  startAddress: string;
  endAddress: string;
  duration: string;
  distanceKm: number;
  remarks?: string;
}