import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginForm } from "@/components/auth/LoginForm";
import { ForgetPasswordForm } from "@/components/auth/ForgetPasswordForm";
import Conditions from "@/components/auth/Conditions";
import Confidentiality from "@/components/auth/Confidentiality";
import SeeMore from "@/components/auth/SeeMore";
import { Button } from "@/components/ui/button";
import {
  Car,
  Clock,
  Shield,
  CheckCircle,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  // Gestion des états
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [showConditions, setShowConditions] = useState(false);
  const [showConfidentiality, setShowConfidentiality] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  // Gérer le chargement de l'image de fond
  useEffect(() => {
    const img = new Image();
    img.src = "/cover.png";
    img.onload = () => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 300);
    };
    // Fallback en cas d'erreur de chargement de l'image
    img.onerror = () => {
      setIsLoading(false);
      setShowContent(true);
    };
  }, []);

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleLoginSuccess = () => {
    navigate("/dashboard");
  };

  // Fonctions pour gérer le mot de passe oublié
  const handleShowForgetPassword = () => {
    setShowForgetPassword(true);
  };

  const handleCancelForgetPassword = () => {
    setShowForgetPassword(false);
  };

  // Fonctions pour gérer les conditions et la confidentialité
  const handleShowConditions = () => {
    console.log("Show conditions clicked in LandingPage");
    setShowConditions(true);
    setShowForgetPassword(false);
    setShowConfidentiality(false);
  };

  const handleShowConfidentiality = () => {
    console.log("Show confidentiality clicked in LandingPage");
    setShowConditions(false);
    setShowForgetPassword(false);
    setShowConfidentiality(true);
  };

  // Fonction pour afficher "En savoir plus"
  const handleShowSeeMore = () => {
    setShowSeeMore(true);
    setShowConditions(false);
    setShowForgetPassword(false);
    setShowConfidentiality(false);
  };

  const handleBack = () => {
    setShowConditions(false);
    setShowConfidentiality(false);
    setShowForgetPassword(false);
    setShowSeeMore(false);
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Partie gauche avec l'image de fond et contenu */}
      <div className="relative w-full lg:w-3/5 overflow-hidden">
        {/* Image d'arrière-plan réelle */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 1 }}
            className="relative h-full"
          >
            {/* Remplacer cette ligne */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" /> */}

            {/* Par ce bloc multi-dégradé */}
            <div className="absolute inset-0 z-10">
              {/* Dégradé principal du coin bas gauche (noir) vers le haut droit (plus clair) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/60 to-black/10" />

              {/* Dégradé supplémentaire pour renforcer le coin bas gauche */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

              {/* Ajustement subtil pour améliorer la lisibilité du texte */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
            </div>

            <img
              src="/cover.png"
              alt="Taxi Background"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>

        {/* Contenu superposé */}
        <div className="relative z-20 h-full flex flex-col p-8 lg:p-16">
          <div className="flex-grow flex flex-col justify-center max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: showContent ? 1 : 0,
                x: showContent ? 0 : -20,
              }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center mb-6"
            >
              {/* Logo placé en dehors du badge */}
              <img src="/tlogo.png" alt="Cabs" className="h-12 w-12 mr-6" />

              {/* Badge avec le texte */}
              <span className="bg-white/10 text-white text-sm py-1 px-4 rounded-full inline-flex items-center backdrop-blur-sm border border-white/20">
                <span className="bg-yellow-500 rounded-full h-2 w-2 mr-2"></span>
                <span>Gestion de flotte simplifiée</span>
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: showContent ? 1 : 0,
                y: showContent ? 0 : 30,
              }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Gérez votre flotte <br />
              <span className="text-yellow-500">comme jamais</span> auparavant
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: showContent ? 1 : 0,
                y: showContent ? 0 : 30,
              }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-xl text-gray-200 mb-10 max-w-lg"
            >
              La plateforme dédiée aux sociétés de taxi pour gérer leurs
              chauffeurs simplement et efficacement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: showContent ? 1 : 0,
                y: showContent ? 0 : 30,
              }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-6 flex items-center gap-2"
              >
                <span>Demander une démo</span>
                <ArrowRight size={18} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-6 py-6"
                onClick={handleShowSeeMore}
              >
                En savoir plus
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                {
                  icon: <Car className="text-yellow-400" />,
                  title: "Gestion de véhicules",
                  desc: "Suivez l'état de votre flotte en temps réel",
                },
                {
                  icon: <Clock className="text-blue-400" />,
                  title: "Planning intelligent",
                  desc: "Organisez efficacement les horaires de vos chauffeurs",
                },
                {
                  icon: <Shield className="text-green-400" />,
                  title: "Sécurité",
                  desc: "Accès sécurisé à toutes vos données sensibles",
                },
                {
                  icon: <CheckCircle className="text-purple-400" />,
                  title: "Simplicité",
                  desc: "Interface intuitive, prise en main rapide",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: showContent ? 1 : 0,
                    y: showContent ? 0 : 20,
                  }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 0.7 : 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="mt-auto text-center lg:text-left text-white/60 text-sm"
          >
            © 2025 Cabs. Tous droits réservés.
          </motion.div>
        </div>
      </div>

      {/* Partie droite avec le formulaire de connexion */}
      <motion.div
        className="hidden lg:block lg:w-2/5 bg-gray-900 relative overflow-hidden"
        initial={{ x: "100%" }}
        animate={{ x: isLoading ? "100%" : "0%" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {/* Éléments visuels décoratifs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]" />

        <div className="h-full flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {!showForgetPassword && !showConditions && !showConfidentiality && !showSeeMore ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: showContent ? 1 : 0,
                    y: showContent ? 0 : 20,
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <LoginForm
                    onSuccess={handleLoginSuccess}
                    onForgetPassword={handleShowForgetPassword}
                    onShowConditions={handleShowConditions}
                    onShowConfidentiality={handleShowConfidentiality}
                  />
                </motion.div>
              ) : showForgetPassword ? (
                <motion.div
                  key="forget"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <ForgetPasswordForm
                    onCancel={handleCancelForgetPassword}
                    onSuccess={handleLoginSuccess}
                  />
                </motion.div>
              ) : showConditions ? (
                <motion.div
                  key="conditions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Conditions onBack={handleBack} />
                </motion.div>
              ) : showConfidentiality ? (
                <motion.div
                  key="confidentiality"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Confidentiality onBack={handleBack} />
                </motion.div>
              ) : (
                <motion.div
                  key="seeMore"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <SeeMore onBack={handleBack} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Version mobile du formulaire de connexion */}
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm lg:hidden z-50 flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div
          className="bg-gray-900 w-full max-w-md rounded-xl overflow-hidden border border-gray-800"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <AnimatePresence mode="wait">
            {!showForgetPassword && !showConditions && !showConfidentiality && !showSeeMore ? (
              <LoginForm
                onSuccess={handleLoginSuccess}
                onForgetPassword={handleShowForgetPassword}
                onShowConditions={handleShowConditions}
                onShowConfidentiality={handleShowConfidentiality}
              />
            ) : showForgetPassword ? (
              <ForgetPasswordForm
                onCancel={handleCancelForgetPassword}
                onSuccess={handleLoginSuccess}
              />
            ) : showConditions ? (
              <Conditions onBack={handleBack} />
            ) : showConfidentiality ? (
              <Confidentiality onBack={handleBack} />
            ) : (
              <SeeMore onBack={handleBack} />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
