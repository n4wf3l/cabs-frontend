import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Lien de réinitialisation envoyé",
        description: `Un email a été envoyé à ${email}`,
      });
      setTimeout(() => navigate("/login"), 2000); // Redirection après 2 secondes
    }
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
    <div className="flex min-h-screen items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl flex bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl"
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-1/2 p-8 flex flex-col justify-center"
        >
          <img
            src="/taxitimelogo.png"
            alt="Taxi Time"
            className="h-10 mb-6 mx-auto"
          />
          <h2 className="text-2xl font-bold mb-4 text-center">
            Mot de passe oublié
          </h2>
          <p className="text-sm text-center text-gray-400 mb-6">
            Entrez votre adresse email pour recevoir un lien de
            réinitialisation.
          </p>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-500 w-full"
            >
              <Mail className="mr-2 h-4 w-4" /> Envoyer le lien
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
          <p className="text-sm mt-2">{visibleText}</p>
          <p className="text-xs mt-10 text-gray-400">
            Made with love in Brussels.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
