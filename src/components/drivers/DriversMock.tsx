// Mock data pour les chauffeurs
export const mockDrivers = [
  {
    id: "1",
    first_name: "Jean",
    last_name: "Dupont",
    email: "jean.dupont@example.com",
    phone: "+32 470 123 456",
    start_date: "2023-01-15",
    shift_type: "Day",
    created_at: "2023-01-10T10:00:00Z",
    // Autres champs nécessaires pour le formulaire d'édition
    works_monday: true,
    works_tuesday: true,
    works_wednesday: true,
    works_thursday: true,
    works_friday: true,
    works_saturday: false,
    works_sunday: false,
    work_formula: "50/50",
    address: "123 Rue de Bruxelles, Bruxelles",
    country: "Belgique",
    birth_date: "1980-05-15",
    birth_place: "Liège",
    nationality: "Belge",
    national_id: "80051512345",
    company_id: "TAXI-B-123",
    extra: false,
  },
  {
    id: "2",
    first_name: "Marie",
    last_name: "Lambert",
    email: "marie.lambert@example.com",
    phone: "+32 470 789 012",
    start_date: "2023-03-20",
    shift_type: "Night",
    created_at: "2023-03-15T14:30:00Z",
    works_monday: true,
    works_tuesday: true,
    works_wednesday: true,
    works_thursday: false,
    works_friday: false,
    works_saturday: true,
    works_sunday: true,
    work_formula: "Forfait",
    address: "45 Avenue Louise, Bruxelles",
    country: "Belgique",
    birth_date: "1985-11-22",
    birth_place: "Namur",
    nationality: "Belge",
    national_id: "85112287654",
    company_id: "TAXI-B-456",
    extra: true,
  },
  {
    id: "3",
    first_name: "Ahmed",
    last_name: "Benali",
    email: "ahmed.benali@example.com",
    phone: "+32 470 345 678",
    start_date: "2023-05-05",
    shift_type: "Long",
    created_at: "2023-04-30T09:15:00Z",
    works_monday: true,
    works_tuesday: false,
    works_wednesday: true,
    works_thursday: false,
    works_friday: true,
    works_saturday: false,
    works_sunday: false,
    work_formula: "50/50",
    address: "78 Rue de Flandre, Bruxelles",
    country: "Belgique",
    birth_date: "1979-03-18",
    birth_place: "Bruxelles",
    nationality: "Belge",
    national_id: "79031834567",
    company_id: "TAXI-B-789",
    extra: false,
  },
];

export const mockDeleteDriver = async (id: string): Promise<void> => {
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

export const mockFetchDriverById = async (id: string): Promise<any> => {
  // Simuler un délai réseau
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const driver = mockDrivers.find((d) => d.id === id);
      if (driver) {
        resolve({
          ...driver,
          accepts_card_payment: true,
          accepts_cash_payment: true,
          accepts_check_payment: false,
          driver_license_photo:
            "https://placehold.co/600x400?text=Permis+de+conduire",
          id_card: "https://placehold.co/600x400?text=Carte+d'identité",
          bank_card_photo: "https://placehold.co/600x400?text=Carte+bancaire",
          contract_photo: "https://placehold.co/600x400?text=Contrat",
        });
      } else {
        reject(new Error(`Driver with ID ${id} not found`));
      }
    }, 1000);
  });
};
