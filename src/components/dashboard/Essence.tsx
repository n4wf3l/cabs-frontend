import { useEffect, useState } from "react";
import { Fuel, Car, Cloud, Droplet } from "lucide-react";

const Essence = () => {
  const [gasPrices, setGasPrices] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const cachedGasData = localStorage.getItem("gasPrices");
    const cachedWeatherData = localStorage.getItem("weatherData");
    const cacheTimestamp = localStorage.getItem("dataTimestamp");
    const oneHour = 60 * 60 * 1000; // 1 heure en millisecondes

    if (
      cachedGasData &&
      cachedWeatherData &&
      cacheTimestamp &&
      Date.now() - parseInt(cacheTimestamp) < oneHour
    ) {
      setGasPrices(JSON.parse(cachedGasData));
      setWeather(JSON.parse(cachedWeatherData));
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
        } catch (error) {
          console.error(
            "Erreur lors du chargement des prix de l'essence:",
            error
          );
        }
      };

      const fetchWeather = async () => {
        try {
          const response = await fetch(
            "https://meteostat.p.rapidapi.com/point/daily?lat=50.8503&lon=4.3517&start=2025-02-10&end=2025-02-10",
            {
              method: "GET",
              headers: {
                "x-rapidapi-key":
                  "a76ae68987mshce8a54a27a108f9p13007ejsn6cb197c72d74",
                "x-rapidapi-host": "meteostat.p.rapidapi.com",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Erreur ${response.status} : Accès refusé.`);
          }

          const data = await response.json();
          setWeather(data.data[0]);
          localStorage.setItem("weatherData", JSON.stringify(data.data[0]));
        } catch (error) {
          console.error("Erreur lors du chargement de la météo:", error);
        }
      };

      fetchGasPrices();
      fetchWeather();
      localStorage.setItem("dataTimestamp", Date.now().toString());
    }
  }, []);

  if (!gasPrices || !weather) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="hidden lg:flex flex-col space-y-4 top-20 right-10 bg-gray-800 p-4 rounded-lg shadow-lg">
      <div>
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

      <div>
        <h2 className="text-lg font-bold mb-2 text-white">Météo à Bruxelles</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Cloud className="text-blue-400" size={24} />
            <span className="text-white">Température : {weather.tavg}°C</span>
          </div>
          <div className="flex items-center space-x-2">
            <Droplet className="text-blue-500" size={24} />
            <span className="text-white">
              Précipitations : {weather.prcp} mm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Essence;
