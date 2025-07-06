import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Phone } from "lucide-react"; // Importer l'icône de téléphone
import { motion } from "framer-motion";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleWhatsAppMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "+32467686600"; // Numéro de téléphone fixe
    const message =
      "Bonjour, j'ai oublié mon mot de passe en tant qu'administrateur pour me connecter à la plateforme Taxi Time. Est-ce possible que vous me le réinitialisez?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank"); // Ouvrir WhatsApp
    toast({
      title: "Message prêt à être envoyé",
      description: `Un message a été préparé pour le numéro ${phoneNumber}.`,
    });
    setTimeout(() => navigate("/login"), 2000); // Redirection après 2 secondes
  };

  // Effet d'écriture progressive
  const fullText =
    "RRééinitialisez votre mot de passe rapidement et en toute sécurité.";
  const [visibleText, setVisibleText] = useState("");
  const indexRef = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current < fullText.length) {
        setVisibleText((prev) => prev + fullText.charAt(indexRef.current));
        indexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black relative">
      {/* Background with neon effect */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500 rounded-full filter blur-[150px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-orange-500 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl flex bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl relative z-10"
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full p-8 flex flex-col justify-center items-center" // Ajout de items-center pour centrer le contenu
        >
          <img
            src="/cabslogo.png"
            alt="Taxi Time"
            className="h-10 mb-6 mx-auto"
          />
          <h2 className="text-2xl font-bold mb-4 text-center">
            Mot de passe oublié
          </h2>
          <p className="text-sm text-center text-gray-400 mb-6">
            Contactez-nous via WhatsApp pour réinitialiser votre mot de passe.
          </p>
          <form onSubmit={handleWhatsAppMessage} className="space-y-4">
            <Button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-500 w-full"
            >
              <Phone className="mr-2 h-4 w-4" /> Contacter via WhatsApp
            </Button>
          </form>
          <Button
            variant="link"
            onClick={() => navigate("/login")}
            className="text-yellow-400 mt-4 mx-auto block"
          >
            Retour à la connexion
          </Button>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-black p-6"
        >
          <h2 className="text-lg font-bold">
            <a
              href="https://www.taxitime.be"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors duration-300 hover:text-yellow-400"
            >
              Taxi Time.
            </a>
          </h2>
          <p className="text-sm mt-2 text-center">{visibleText}</p>{" "}
          {/* Ajout de text-center pour centrer le texte */}
          <p className="text-xs mt-10 text-gray-400">
            Made with love in Brussels.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
