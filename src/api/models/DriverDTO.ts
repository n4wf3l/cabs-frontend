export interface DriverResponseDTO {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  phoneNumber: string;
  address: string;
  postalCode: string;
  cityOfBirth: string;
  dateOfBirth: string;
  paymentsEnabled: boolean;
  availableForReplacement: boolean;
  onLeave: boolean;
}

export interface DriverSignupRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  cityOfBirth: string;
  dateOfBirth: string;
  paymentsEnabled: boolean;
  availableForReplacement: boolean;
  onLeave: boolean;
}

export interface DriverUpdateDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  postalCode?: string;
  cityOfBirth?: string;
  dateOfBirth?: string;
  paymentsEnabled?: boolean;
  availableForReplacement?: boolean;
  onLeave?: boolean;
}