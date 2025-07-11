export enum MediaType {
  ID_CARD_FRONT = "ID_CARD_FRONT",
  ID_CARD_BACK = "ID_CARD_BACK",
  LICENSE_FRONT = "LICENSE_FRONT",
  LICENSE_BACK = "LICENSE_BACK",
  PROFILE_PHOTO = "PROFILE_PHOTO",
  ROUTE_PHOTO = "ROUTE_PHOTO",
  TICKET_START = "TICKET_START",
  TICKET_END = "TICKET_END",
  VEHICLE_PHOTO = "VEHICLE_PHOTO",
  OTHER = "OTHER",
}

export enum OwnerType {
  DRIVER = "DRIVER",
  SHIFT = "SHIFT",
  VEHICLE = "VEHICLE",
}

export interface MediaResponseDTO {
  id: number;
  type: MediaType;
  url: string;
  uploadedAt: string;
  ownerId: number;
  ownerType: OwnerType;
}

export interface MediaRequestDTO {
  type: MediaType;
  url: string;
  ownerId: number;
  ownerType: OwnerType;
}