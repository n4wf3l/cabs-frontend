export interface Taxi {
  id: string;
  name: string; // Ajout du nom du chauffeur
  position: [number, number]; // [longitude, latitude]
  commune: string;
  status: "disponible"; // Simplifié pour n'avoir que "disponible"
  lastUpdated: Date;
}

export interface Commune {
  id: string;
  name: string;
  center: [number, number]; // [longitude, latitude]
  taxiCount: number;
}

// Centre de Bruxelles
export const BRUSSELS_CENTER: [number, number] = [4.3517, 50.8503];

// Liste des communes de Bruxelles
export const communes: Commune[] = [
  {
    id: "bruxelles",
    name: "Bruxelles-Ville",
    center: [4.3517, 50.8503],
    taxiCount: 0,
  },
  {
    id: "schaerbeek",
    name: "Schaerbeek",
    center: [4.3821, 50.8625],
    taxiCount: 0,
  },
  { id: "ixelles", name: "Ixelles", center: [4.367, 50.8333], taxiCount: 0 },
  {
    id: "etterbeek",
    name: "Etterbeek",
    center: [4.3887, 50.8385],
    taxiCount: 0,
  },
  {
    id: "molenbeek",
    name: "Molenbeek-Saint-Jean",
    center: [4.3307, 50.8556],
    taxiCount: 0,
  },
  {
    id: "saint-gilles",
    name: "Saint-Gilles",
    center: [4.345, 50.8301],
    taxiCount: 0,
  },
  {
    id: "anderlecht",
    name: "Anderlecht",
    center: [4.3077, 50.8365],
    taxiCount: 0,
  },
  { id: "uccle", name: "Uccle", center: [4.3361, 50.8013], taxiCount: 0 },
  { id: "forest", name: "Forest", center: [4.3166, 50.8118], taxiCount: 0 },
  {
    id: "woluwe-saint-lambert",
    name: "Woluwe-Saint-Lambert",
    center: [4.4217, 50.8409],
    taxiCount: 0,
  },
  {
    id: "woluwe-saint-pierre",
    name: "Woluwe-Saint-Pierre",
    center: [4.4311, 50.8309],
    taxiCount: 0,
  },
  {
    id: "auderghem",
    name: "Auderghem",
    center: [4.4311, 50.8151],
    taxiCount: 0,
  },
  {
    id: "watermael-boitsfort",
    name: "Watermael-Boitsfort",
    center: [4.4028, 50.8118],
    taxiCount: 0,
  },
  { id: "jette", name: "Jette", center: [4.3233, 50.8709], taxiCount: 0 },
  {
    id: "koekelberg",
    name: "Koekelberg",
    center: [4.3288, 50.8642],
    taxiCount: 0,
  },
  {
    id: "ganshoren",
    name: "Ganshoren",
    center: [4.3166, 50.8701],
    taxiCount: 0,
  },
  {
    id: "berchem-sainte-agathe",
    name: "Berchem-Sainte-Agathe",
    center: [4.2982, 50.8656],
    taxiCount: 0,
  },
  { id: "evere", name: "Evere", center: [4.4028, 50.8676], taxiCount: 0 },
  { id: "haren", name: "Haren", center: [4.4123, 50.8852], taxiCount: 0 },
];

// Liste des prénoms belges populaires
const firstNames = [
  "Luc",
  "Jean",
  "Pierre",
  "Michel",
  "Marc",
  "Philippe",
  "Thomas",
  "Nicolas",
  "Julien",
  "François",
  "Mathieu",
  "David",
  "Bernard",
  "Patrick",
  "Thierry",
  "Vincent",
  "Claude",
  "Alain",
  "Christophe",
  "Bruno",
  "Laurent",
  "Grégoire",
  "Maxime",
  "Antoine",
  "Kevin",
  "Sophie",
  "Emma",
  "Julie",
  "Marie",
  "Anne",
  "Sarah",
  "Isabelle",
  "Nathalie",
  "Céline",
  "Ahmed",
  "Mohammed",
  "Youssef",
  "Ali",
  "Hassan",
  "Karim",
  "Mehdi",
  "Omar",
  "Rachid",
  "Samir",
];

// Liste des noms de famille belges populaires
const lastNames = [
  "Dubois",
  "Janssens",
  "Maes",
  "Jacobs",
  "Mertens",
  "Willems",
  "Claes",
  "Wouters",
  "Peeters",
  "Goossens",
  "De Smet",
  "Vermeulen",
  "Dupont",
  "Lambert",
  "Martin",
  "Dumont",
  "Leroy",
  "Simon",
  "Laurent",
  "Lefebvre",
  "Leclercq",
  "Petit",
  "Legrand",
  "Martens",
  "Jansen",
  "De Jong",
  "Van den Berg",
  "El Amrani",
  "Benali",
  "Benhaddou",
  "Özdemir",
  "Wang",
  "Li",
  "Chen",
  "Nguyen",
  "Pham",
  "Diallo",
  "Sy",
];

// Génère un nom complet aléatoire
const generateRandomName = (): string => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

// Génère des taxis aléatoires pour la démo
export const generateFakeTaxis = (count: number = 50): Taxi[] => {
  const taxis: Taxi[] = [];

  for (let i = 0; i < count; i++) {
    // Choisit une commune aléatoire
    const commune = communes[Math.floor(Math.random() * communes.length)];

    // Génère une position aléatoire près du centre de la commune
    const longitude = commune.center[0] + (Math.random() - 0.5) * 0.03;
    const latitude = commune.center[1] + (Math.random() - 0.5) * 0.03;

    taxis.push({
      id: `taxi-${i}`,
      name: generateRandomName(), // Ajout d'un nom de chauffeur
      position: [longitude, latitude],
      commune: commune.id,
      status: "disponible", // Tous les taxis sont disponibles
      lastUpdated: new Date(),
    });
  }

  // Met à jour le nombre de taxis par commune
  updateCommuneTaxiCount(taxis);

  return taxis;
};

// Met à jour le compteur de taxis par commune
export const updateCommuneTaxiCount = (taxis: Taxi[]): void => {
  // Réinitialise les compteurs
  communes.forEach((commune) => {
    commune.taxiCount = 0;
  });

  // Compte les taxis par commune
  taxis.forEach((taxi) => {
    const commune = communes.find((c) => c.id === taxi.commune);
    if (commune) {
      commune.taxiCount += 1;
    }
  });
};

// Simule le mouvement des taxis en temps réel
export const updateTaxiPositions = (taxis: Taxi[]): Taxi[] => {
  return taxis.map((taxi) => {
    // 20% de chance de bouger le taxi
    if (Math.random() < 0.2) {
      // Déplace le taxi légèrement
      const longitude = taxi.position[0] + (Math.random() - 0.5) * 0.005;
      const latitude = taxi.position[1] + (Math.random() - 0.5) * 0.005;

      return {
        ...taxi,
        position: [longitude, latitude],
        status: "disponible", // Tous les taxis restent disponibles
        lastUpdated: new Date(),
      };
    }

    return taxi;
  });
};

// Couleurs pour les différents statuts de taxi
export const getTaxiColor = (status: "disponible"): string => {
  return "#4ade80"; // vert pour disponible
};
