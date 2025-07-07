import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { DriversHeader } from "@/components/drivers/DriversHeader";
import { DriversSearch } from "@/components/drivers/DriversSearch";
import { DriverList } from "@/components/drivers/DriverList";
import { AddDriverForm } from "@/components/drivers/AddDriver";

export const Drivers = () => {
  const [filter, setFilter] = useState("");
  const [isAddingDriver, setIsAddingDriver] = useState(false);

  // Fonction pour basculer entre la liste et le formulaire d'ajout
  const toggleAddDriver = () => {
    setIsAddingDriver(!isAddingDriver);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full">
        {isAddingDriver ? (
          // Afficher le formulaire d'ajout
          <div>
            <div className="flex justify-between items-center mb-8 mt-10">
              <h1 className="text-2xl font-bold">Ajouter un Chauffeur</h1>
              <button
                onClick={toggleAddDriver}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white"
              >
                Retour à la liste
              </button>
            </div>
            <hr className="hr-light-effect mb-10" />
            <AddDriverForm
              onCancel={toggleAddDriver}
              onSuccess={() => {
                setIsAddingDriver(false);
                // Éventuellement rafraîchir la liste des chauffeurs
              }}
            />
          </div>
        ) : (
          // Afficher la liste des chauffeurs
          <>
            <DriversHeader onAddClick={toggleAddDriver} />
            <hr className="hr-light-effect mt-10 mb-10" />
            <DriversSearch
              value={filter}
              onChange={(value) => setFilter(value)}
            />
            <DriverList filter={filter} />
          </>
        )}
      </main>
    </div>
  );
};

export default Drivers;
