import { DriverResponseDTO } from "@/api/driver";

// Mock data pour les chauffeurs - Correspond exactement au backend DriverResponseDTO
export const mockDrivers: DriverResponseDTO[] = [
  {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phoneNumber: "+32 470 123 456",
    address: "123 Rue de Bruxelles, Bruxelles",
    postalCode: "1000",
    cityOfBirth: "Liège",
    dateOfBirth: "1980-05-15",
    paymentsEnabled: true,
    availableForReplacement: false,
    onLeave: false,
  },
  {
    id: 2,
    firstName: "Marie",
    lastName: "Lambert",
    email: "marie.lambert@example.com",
    phoneNumber: "+32 470 789 012",
    address: "45 Avenue Louise, Bruxelles",
    postalCode: "1050",
    cityOfBirth: "Namur",
    dateOfBirth: "1985-11-22",
    paymentsEnabled: true,
    availableForReplacement: true,
    onLeave: false,
  },
  {
    id: 3,
    firstName: "Ahmed",
    lastName: "Benali",
    email: "ahmed.benali@example.com",
    phoneNumber: "+32 470 345 678",
    address: "78 Rue de Flandre, Bruxelles",
    postalCode: "1000",
    cityOfBirth: "Bruxelles",
    dateOfBirth: "1979-03-18",
    paymentsEnabled: false,
    availableForReplacement: false,
    onLeave: true,
  },
];

export const mockDeleteDriver = async (id: number): Promise<void> => {
  // Simuler un délai réseau
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Driver with ID ${id} deleted`);
      resolve();
    }, 1000);
  });
};

export const mockExportPDF = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate PDF export
      const fakeBlob = new Blob(["PDF content"], { type: "application/pdf" });
      const url = URL.createObjectURL(fakeBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "chauffeurs.pdf";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);

      resolve();
    }, 2000);
  });
};

export const mockFetchDriverById = async (id: number): Promise<DriverResponseDTO> => {
  // Simuler un délai réseau
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const driver = mockDrivers.find((d) => d.id === id);
      if (driver) {
        resolve(driver);
      } else {
        reject(new Error(`Driver with ID ${id} not found`));
      }
    }, 1000);
  });
};
