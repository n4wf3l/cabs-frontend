import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Shield,
  User,
  Building,
} from "lucide-react";
import { createAdmin } from "@/api/admin";
import { useToast } from "../ui/use-toast";
import { Card } from "@/components/ui/card";

const Forms = () => {
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminCompany, setAdminCompany] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  // Reste du code de récupération du company_id inchangé...
  useEffect(() => {
    // Le code existant pour récupérer le company_id
  }, []);

  const handleAdminAdd = async (e) => {
    // Le code existant pour ajouter un admin
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8"
    >
      <Card className="bg-gray-800 border border-gray-700 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <motion.h2
              className="text-xl font-bold flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="text-blue-500 h-5 w-5" />
              <span>Gestion des administrateurs</span>
            </motion.h2>
            <div className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-medium">
              Super Admin
            </div>
          </div>

          <motion.form
            onSubmit={handleAdminAdd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-gray-900/50 rounded-lg p-6 border border-gray-700"
          >
            <h3 className="text-lg font-medium mb-4 text-blue-400 flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Ajouter un nouvel administrateur
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prénom */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Prénom</span>
                  </div>
                </label>
                <input
                  type="text"
                  value={adminFirstName}
                  onChange={(e) => setAdminFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Prénom"
                />
              </motion.div>

              {/* Nom */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Nom</span>
                  </div>
                </label>
                <input
                  type="text"
                  value={adminLastName}
                  onChange={(e) => setAdminLastName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Nom"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>Email</span>
                  </div>
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="admin@example.com"
                />
              </motion.div>

              {/* Mot de passe */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-medium text-gray-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <span>Mot de passe</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Société */}
              <motion.div
                className="space-y-2 md:col-span-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-sm font-medium text-gray-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span>Société</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={adminCompany}
                    disabled
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg transition-all cursor-not-allowed text-gray-500"
                    placeholder="Chargement de l'ID société..."
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-xs bg-gray-700/80 py-1 px-2 rounded text-gray-400">
                      Auto
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.button
              type="submit"
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              disabled={!adminCompany}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <UserPlus className="w-4 h-4" />
              Ajouter un administrateur
            </motion.button>

            {!adminCompany && (
              <p className="text-yellow-500 text-xs mt-2 flex items-center gap-1 justify-center">
                <Lock className="w-3 h-3" />
                Chargement de l'ID société en cours...
              </p>
            )}
          </motion.form>
        </div>
      </Card>
    </motion.div>
  );
};

export default Forms;
