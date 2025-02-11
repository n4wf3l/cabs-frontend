import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Save, UserPlus } from "lucide-react";

const Forms = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const handleAccountSave = (e) => {
    e.preventDefault();
    // Logic to save account information
  };

  const handleAdminAdd = (e) => {
    e.preventDefault();
    // Logic to add new admin
  };

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-6 mt-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Mon Compte Card */}
      <motion.div
        className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-blue-500 transition-all"
        whileHover={{ y: -5 }}
        whileTap={{ y: 0 }}
      >
        <form onSubmit={handleAccountSave}>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-blue-400">Mon Compte</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </div>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-300">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Nouveau mot de passe</span>
                </div>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            Sauvegarder
          </button>
        </form>
      </motion.div>

      {/* Ajouter un administrateur Card */}
      <motion.div
        className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-blue-500 transition-all"
        whileHover={{ y: -5 }}
        whileTap={{ y: 0 }}
      >
        <form onSubmit={handleAdminAdd}>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-blue-400">Ajouter un administrateur</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </div>
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="admin@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-300">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Mot de passe</span>
                </div>
              </label>
              <div className="relative">
                <input
                  type={showAdminPassword ? "text" : "password"}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {showAdminPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Ajouter
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Forms;
