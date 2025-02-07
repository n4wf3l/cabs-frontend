import { useEffect, useState } from "react";
import { Fuel, Car } from "lucide-react";

const Essence = () => {
  const [gasPrices, setGasPrices] = useState(null);

  useEffect(() => {
    const cachedData = localStorage.getItem("gasPrices");
    const cacheTimestamp = localStorage.getItem("gasPricesTimestamp");
    const oneDay = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

    if (
      cachedData &&
      cacheTimestamp &&
      Date.now() - parseInt(cacheTimestamp) < oneDay
    ) {
      setGasPrices(JSON.parse(cachedData));
    } else {
      const fetchGasPrices = async () => {
        try {
          const response = await fetch(
            "https://gas-price.p.rapidapi.com/europeanCountries",
            {
              method: "GET",
              headers: {
                "x-rapidapi-key":
                  "d47fc6b23emsh536bb2509bf0522p1d7b5cjsne789218aee9d",
                "x-rapidapi-host": "gas-price.p.rapidapi.com",
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Erreur ${response.status} : Accès refusé.`);
          }

          const data = await response.json();
          console.log(data); // Vérifie ici la structure des données

          const belgiumData = data.results.find(
            (country) => country.country === "Belgium"
          );

          if (!belgiumData) {
            throw new Error(
              "Les données pour la Belgique ne sont pas disponibles."
            );
          }

          setGasPrices(belgiumData);
          localStorage.setItem("gasPrices", JSON.stringify(belgiumData));
          localStorage.setItem("gasPricesTimestamp", Date.now().toString());
        } catch (error) {
          console.error("Erreur:", error);
        }
      };

      fetchGasPrices();
    }
  }, []);

  if (!gasPrices) {
    return <p>Chargement des prix de l'essence...</p>;
  }

  return (
    <div className="hidden lg:block  top-20 right-10 bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-2 text-white">
        Prix de l'essence en Belgique
      </h2>
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <Fuel className="text-green-500" size={24} />
          <span className="text-white">Essence : {gasPrices.gasoline} €</span>
        </div>
        <div className="flex items-center space-x-2">
          <Car className="text-yellow-500" size={24} />
          <span className="text-white">Diesel : {gasPrices.diesel} €</span>
        </div>
      </div>
    </div>
  );
};

export default Essence;
