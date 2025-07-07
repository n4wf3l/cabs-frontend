import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import SettingsCards from "@/components/settings/SettingsCards";
import Forms from "@/components/settings/SettingsForm";

const Settings = () => {
  const [showDrivers, setShowDrivers] = useState(false);
  const [showAdmins, setShowAdmins] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [admins, setAdmins] = useState([
    "admin@example.com",
    "admin2@example.com",
  ]);
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Simuler le chargement des chauffeurs
    setTimeout(() => {
      setDrivers([
        { id: "1", first_name: "Jean", last_name: "Dupont" },
        { id: "2", first_name: "Marie", last_name: "Lambert" },
        // ... autres chauffeurs
      ]);
      setLoadingDrivers(false);
    }, 1500);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <SettingsHeader />

        <hr className="hr-light-effect mb-10" />

        <SettingsCards
          drivers={drivers}
          admins={admins}
          loadingDrivers={loadingDrivers}
          showDrivers={showDrivers}
          setShowDrivers={setShowDrivers}
          showAdmins={showAdmins}
          setShowAdmins={setShowAdmins}
        />

        <Forms />
      </main>
    </div>
  );
};

export default Settings;
