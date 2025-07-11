export enum Transmission {
  MANUAL = "MANUAL",
  AUTOMATIC = "AUTOMATIC",
}

export interface VehicleDTO {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  transmission: Transmission;
  odometerKm: number;
  available: boolean;
  activeInShift: boolean;
  condition: string;
}

export interface VehicleRequestDTO {
  licensePlate: string;
  brand: string;
  model: string;
  transmission: Transmission;
  odometerKm: number;
  available: boolean;
  activeInShift: boolean;
  condition: string;
}

export interface VehicleUpdateDTO {
  licensePlate?: string;
  brand?: string;
  model?: string;
  transmission?: Transmission;
  odometerKm?: number;
  available?: boolean;
  activeInShift?: boolean;
  condition?: string;
}