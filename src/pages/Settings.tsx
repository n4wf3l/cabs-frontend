import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import SettingsCards from "@/components/settings/SettingsCards";
import Forms from "@/components/settings/SettingsForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield } from "lucide-react";

const Settings = () => {
  const [showDrivers, setShowDrivers] = useState(false);
  const [showAdmins, setShowAdmins] = useState(false);
  const [activeTab, setActiveTab] = useState("team");
  const [drivers, setDrivers] = useState([]);
  const [admins, setAdmins] = useState([
    "admin@example.com",
    "john.doe@example.com",
    "jane.smith@example.com",
  ]);
  const [loadingDrivers, setLoadingDrivers] = useState(true);

  useEffect(() => {
    // Simuler le chargement des chauffeurs
    setTimeout(() => {
      setDrivers([
        { id: "1", first_name: "Jean", last_name: "Dupont" },
        { id: "2", first_name: "Marie", last_name: "Lambert" },
        { id: "3", first_name: "Paul", last_name: "Bernard" },
        { id: "4", first_name: "Sophie", last_name: "Martin" },
        { id: "5", first_name: "Lucas", last_name: "Girard" },
      ]);
      setLoadingDrivers(false);
    }, 1500);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8">
        <SettingsHeader />

        <hr className="hr-light-effect mb-10" />

        <div className="md:hidden mb-8">
          <Tabs
            defaultValue="team"
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="team"
                className="flex items-center gap-2 py-3"
              >
                <User className="w-4 h-4" />
                <span>Équipe</span>
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="flex items-center gap-2 py-3"
              >
                <Shield className="w-4 h-4" />
                <span>Administrateurs</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {activeTab === "team" || !activeTab ? (
          <SettingsCards
            drivers={drivers}
            admins={admins}
            loadingDrivers={loadingDrivers}
            showDrivers={showDrivers}
            setShowDrivers={setShowDrivers}
            showAdmins={showAdmins}
            setShowAdmins={setShowAdmins}
          />
        ) : (
          <Forms />
        )}

        {/* Version desktop affiche les deux sections */}
        <div className="hidden md:block">
          <Forms />
        </div>
      </main>
    </div>
  );
};

export default Settings;
