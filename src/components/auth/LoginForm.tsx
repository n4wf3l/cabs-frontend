import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Eye, EyeOff, CheckCircle2, X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";

// Modifier l'interface pour ajouter la prop onForgetPassword
interface LoginFormProps {
  onSuccess?: () => void;
  onForgetPassword?: () => void; // Nouvelle prop
}

export const LoginForm = ({ onSuccess, onForgetPassword }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [step, setStep] = useState<"email" | "password">("email"); // Multi-step login
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle email step
  const handleEmailStep = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setErrorMessage("Veuillez entrer une adresse email valide");
      return;
    }

    setErrorMessage("");
    setStep("password");
  };

  // Handle full login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Simulation d'un délai de connexion
    setTimeout(() => {
      try {
        // Validation basique
        if (!email.includes("@") || password.length < 6) {
          throw new Error("Email ou mot de passe invalide");
        }

        // Créer un faux token JWT avec un rôle admin
        const fakePayload = {
          email: email,
          role: "admin",
          exp: Math.floor(Date.now() / 1000) + 3600, // Expiration dans 1 heure
        };

        // Créer un faux JWT (header.payload.signature)
        const fakeHeader = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
        const fakePayloadStr = btoa(JSON.stringify(fakePayload));
        const fakeAccessToken = `${fakeHeader}.${fakePayloadStr}.fake-signature`;

        // Sauvegarder le token et naviguer
        localStorage.setItem("token", fakeAccessToken);
        if (rememberMe) {
          localStorage.setItem("remember_email", email);
        }

        toast({
          title: "Connexion réussie",
          description: `Bienvenue, ${email}!`,
        });

        // Navigation et callback de succès
        if (onSuccess) onSuccess();
      } catch (error) {
        setErrorMessage((error as Error).message);
        toast({
          title: "Erreur de connexion",
          description: (error as Error).message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }, 1000); // Simule 1 seconde de chargement
  };

  // Reset to email step
  const handleBack = () => {
    setStep("email");
    setErrorMessage("");
  };

  return (
    <div className="w-full p-6 md:p-8">
      <div className="mb-8 text-center">
        <img src="/tlogo.png" alt="Cabs" className="h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-white">
          Bienvenue sur Cabs
        </h2>
        <p className="text-gray-400 text-sm">
          {step === "email"
            ? "Connectez-vous pour gérer votre flotte"
            : `Se connecter en tant que ${email}`}
        </p>
      </div>

      {step === "email" ? (
        <motion.form
          onSubmit={handleEmailStep}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          <div>
            <Label htmlFor="email" className="text-gray-300 mb-1.5 block">
              Adresse email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nom@exemple.com"
              className="bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500/30 h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          {errorMessage && (
            <div className="text-red-400 text-sm py-2 px-3 bg-red-900/30 rounded-md border border-red-800/50 flex items-center gap-2">
              <X size={14} className="text-red-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <Button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 text-white w-full h-12 mt-2 rounded-md font-medium transition-all"
            disabled={!email}
          >
            Continuer
          </Button>

          <div className="relative my-6">
            <Separator className="bg-gray-700/50" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-2 text-xs text-gray-500">
              OU
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-gray-700 hover:bg-gray-800/80 hover:border-gray-600 text-white flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} />
            <span>Se connecter avec Google</span>
          </Button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Vous n'avez pas de compte ?{" "}
            <a
              href="#"
              className="text-yellow-500 hover:text-yellow-400 hover:underline"
            >
              S'inscrire
            </a>
          </p>
        </motion.form>
      ) : (
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          <div className="mb-6">
            <Button
              type="button"
              variant="ghost"
              className="text-gray-400 hover:text-white p-0 h-auto flex items-center gap-1.5 text-sm"
              onClick={handleBack}
            >
              ← Retour
            </Button>
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-300 mb-1.5 block">
              Mot de passe
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500/30 h-12 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
                className="data-[state=checked]:bg-yellow-600 border-gray-600"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm text-gray-300 select-none cursor-pointer"
              >
                Se souvenir de moi
              </label>
            </div>

            <Button
              type="button"
              variant="link"
              className="text-yellow-500 hover:text-yellow-400 text-sm p-0 h-auto"
              onClick={onForgetPassword}
            >
              Mot de passe oublié?
            </Button>
          </div>

          {errorMessage && (
            <div className="text-red-400 text-sm py-2 px-3 bg-red-900/30 rounded-md border border-red-800/50 flex items-center gap-2">
              <X size={14} className="text-red-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <Button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 text-white w-full h-12 mt-2 rounded-md font-medium transition-all"
            disabled={loading || !password}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Connexion...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <LogIn size={16} />
                <span>Se connecter</span>
              </div>
            )}
          </Button>
        </motion.form>
      )}

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          En vous connectant, vous acceptez nos{" "}
          <a href="#" className="text-gray-400 hover:text-white">
            Conditions d'utilisation
          </a>{" "}
          et notre{" "}
          <a href="#" className="text-gray-400 hover:text-white">
            Politique de confidentialité
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
