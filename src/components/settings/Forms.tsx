import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { createAdmin } from "@/api/admin";
import { useToast } from "../ui/use-toast";

const Forms = () => {
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminCompany, setAdminCompany] = useState(""); // ✅ Auto-filled company ID
  const [adminPassword, setAdminPassword] = useState(""); // ✅ Password field
  const [showPassword, setShowPassword] = useState(false); // ✅ Toggle password visibility
  const { toast } = useToast(); // ✅ Notification system

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const authUserId = decodedToken.sub; // Extract auth_user_id

      const fetchCompanyId = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/admins/auth/${authUserId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const adminData = await response.json();

          if (adminData && adminData.company_id) {
            setAdminCompany(adminData.company_id); // ✅ Auto-fill company ID
          } else {
            console.warn("⚠️ No company_id found in response:", adminData);
          }
        } catch (error) {
          console.error("❌ Error fetching admin data:", error);
        }
      };

      fetchCompanyId();
    } catch (error) {
      console.error("❌ Error decoding token:", error);
    }
  }, []);

  const handleAdminAdd = async (e) => {
    e.preventDefault();

    try {
      await createAdmin({
        first_name: adminFirstName,
        last_name: adminLastName,
        email: adminEmail,
        company_id: adminCompany, // ✅ Use the auto-filled company ID
        password: adminPassword, // ✅ Include password
      });

      // ✅ Success feedback
      toast({ title: "Succès", description: "Admin ajouté avec succès !" });

      // ✅ Clear form
      setAdminFirstName("");
      setAdminLastName("");
      setAdminEmail("");
      setAdminCompany(""); // ✅ Reset company ID
      setAdminPassword("");
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout d'un admin:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'admin.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-blue-500 transition-all"
      whileHover={{ y: -5 }}
      whileTap={{ y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.form
        onSubmit={handleAdminAdd}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h2
          className="text-2xl font-semibold mb-6 flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-blue-400">Ajouter un administrateur</span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Prénom",
              value: adminFirstName,
              setValue: setAdminFirstName,
              icon: Mail,
              placeholder: "John",
            },
            {
              label: "Nom",
              value: adminLastName,
              setValue: setAdminLastName,
              icon: Lock,
              placeholder: "Doe",
            },
            {
              label: "Email",
              value: adminEmail,
              setValue: setAdminEmail,
              icon: Mail,
              placeholder: "admin@email.com",
            },
          ].map(
            ({ label, value, setValue, icon: Icon, placeholder }, index) => (
              <motion.div
                key={label}
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <label className="block text-sm font-medium mb-1.5 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </div>
                </label>
                <motion.input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={placeholder}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>
            )
          )}

          {/* Société - Désactivé */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium mb-1.5 text-gray-300">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Société</span>
              </div>
            </label>
            <motion.input
              type="text"
              value={adminCompany}
              disabled
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-not-allowed opacity-75"
              placeholder="Chargement..."
            />
          </motion.div>

          {/* Mot de passe */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium mb-1.5 text-gray-300">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Mot de passe</span>
              </div>
            </label>
            <div className="relative">
              <motion.input
                type={showPassword ? "text" : "password"}
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Entrez le mot de passe"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 focus:outline-none"
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bouton Ajouter */}
        <motion.button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          disabled={!adminCompany}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <UserPlus className="w-4 h-4" />
          Ajouter
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Forms;
