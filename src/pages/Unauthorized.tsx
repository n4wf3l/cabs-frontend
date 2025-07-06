import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, SmartphoneNfc, Download, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Conteneurs principaux */}
      <motion.div
        className="w-full max-w-5xl flex flex-col md:flex-row gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Section d'accès refusé */}
        <motion.div
          className="flex-1 bg-gray-800 rounded-lg shadow-xl p-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col items-center text-center h-full justify-center">
            <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Accès non autorisé
            </h1>
            <div className="w-16 h-1 bg-red-500 mb-4"></div>
            <p className="text-gray-300 mb-4">
              Cette interface est réservée aux administrateurs de Cabs.
            </p>
            <p className="text-gray-400 text-sm">
              Si vous êtes administrateur, veuillez vous connecter avec vos
              identifiants.
            </p>
          </div>
        </motion.div>

        {/* Section téléchargement application */}
        <motion.div
          className="flex-1 bg-gray-800 rounded-lg shadow-xl p-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col items-center text-center h-full justify-center">
            <SmartphoneNfc className="w-12 h-12 text-yellow-400 mb-4" />
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Application Chauffeur
            </h2>
            <p className="text-gray-300 mb-6">
              L'application Cabs pour chauffeurs est disponible sur mobile.
              Téléchargez-la dès maintenant :
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* Bouton Android */}
              <motion.a
                href="#"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-300 w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Télécharger sur</span>
                  <span className="font-semibold">Google Play</span>
                </div>
              </motion.a>

              {/* Bouton iOS */}
              <motion.a
                href="#"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-300 w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Télécharger sur</span>
                  <span className="font-semibold">App Store</span>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bouton retour à l'accueil */}
      <motion.button
        onClick={() => navigate("/login")}
        className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg transition-colors duration-300 mb-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Home className="w-5 h-5" />
        <span className="font-medium">Retour à l'accueil</span>
      </motion.button>

      {/* Footer */}
      <motion.div
        className="text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        © 2025 Cabs. Tous droits réservés.
      </motion.div>
    </motion.div>
  );
};

export default Unauthorized;
