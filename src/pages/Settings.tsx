import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Essence from "@/components/dashboard/Essence";
import InteractiveResults from "@/components/dashboard/InteractiveResults";
import SettingsCards from "@/components/settings/SettingsCards";
import Forms from "@/components/settings/Forms";
import { fetchChauffeurs } from "@/api/chauffeurs";
import { Mail, Lock, Eye, EyeOff, Save, UserPlus } from "lucide-react";

const Settings = () => {
  const [showDrivers, setShowDrivers] = useState(false);
  const [showAdmins, setShowAdmins] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadChauffeurs = async () => {
      try {
        const chauffeurs = await fetchChauffeurs();
        setDrivers(chauffeurs);
      } catch (error) {
        console.error("Erreur lors du chargement des chauffeurs:", error);
      } finally {
        setLoadingDrivers(false);
      }
    };

    loadChauffeurs();
  }, []);

  const admins = ["Admin 1", "Admin 2"];

  const handleAccountSave = (e) => {
    e.preventDefault();
    // Logic for saving account details
  };

  const handleAdminAdd = (e) => {
    e.preventDefault();
    // Logic for adding a new admin
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-center md:text-left">
            Paramètres
          </h1>
          <InteractiveResults />
        </motion.div>

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
