import api from "./api";

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

// Fetch media by owner and type
export const fetchMedia = async (
  ownerId: number,
  mediaType: MediaType
): Promise<MediaResponseDTO> => {
  try {
    const response = await api.get("/get-media", {
      params: { ownerId, mediaType },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching media:", error);
    throw error;
  }
};

// Fetch all media for an owner
export const fetchMedias = async (
  ownerId: number
): Promise<MediaResponseDTO[]> => {
  try {
    const response = await api.get(`/get-medias/${ownerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching medias:", error);
    throw error;
  }
};

// Create new media
export const createMedia = async (
  mediaData: MediaRequestDTO
): Promise<string> => {
  try {
    const response = await api.post("/create-media", mediaData);
    return response.data;
  } catch (error) {
    console.error("Error creating media:", error);
    throw error;
  }
};

// Update existing media
export const updateMedia = async (
  id: number,
  mediaData: MediaRequestDTO
): Promise<string> => {
  try {
    const response = await api.put(`/edit-media/${id}`, mediaData);
    return response.data;
  } catch (error) {
    console.error("Error updating media:", error);
    throw error;
  }
};

// Delete media
export const deleteMedia = async (id: number): Promise<void> => {
  try {
    await api.delete(`/delete-media/${id}`);
  } catch (error) {
    console.error("Error deleting media:", error);
    throw error;
  }
};

// Helper function to validate media data
export const validateMediaData = (data: MediaRequestDTO): boolean => {
  return !!(data.type && data.url && data.ownerId && data.ownerType);
};

// Helper function to format upload date for display
export const formatUploadDate = (uploadedAt: string): string => {
  return new Date(uploadedAt).toLocaleString();
};

export const getMediaTypeLabel = (type: MediaType): string => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Helper function to get file type from URL
export const getFileTypeFromUrl = (url: string): string => {
  const extension = url.split(".").pop()?.toLowerCase() || "";
  return extension;
};
