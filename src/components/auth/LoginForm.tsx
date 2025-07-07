import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Eye, EyeOff } from "lucide-react";

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
  const navigate = useNavigate();
  const { toast } = useToast();

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

        toast({
          title: "Connexion réussie",
          description: `Bienvenue, ${email}!`,
        });

        // Navigation et callback de succès
        if (onSuccess) onSuccess();
        navigate("/dashboard");
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

  return (
    <div className="w-full">
      <img src="/tlogo.png" alt="Cabs" className="h-10 mb-6 mx-auto" />
      <h2 className="text-2xl font-bold mb-4 text-center">Se connecter</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-gray-200">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-yellow-500 focus:ring-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-gray-200">
            Mot de passe
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-yellow-500 focus:ring-yellow-500 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-400 text-sm py-1 px-2 bg-red-900/30 rounded border border-red-800">
            {errorMessage}
          </div>
        )}

        <Button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-700 text-white w-full transition-colors"
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            <LogIn className="mr-2 h-4 w-4" />
          )}
          Se connecter
        </Button>
      </form>

      {/* À la fin, remplacer le lien par ce bouton: */}
      <button
        type="button"
        onClick={onForgetPassword} // Utiliser la prop au lieu de naviguer
        className="text-yellow-400 text-sm mt-4 block w-full text-center hover:text-yellow-300 transition-colors"
      >
        Mot de passe oublié?
      </button>
    </div>
  );
};

export default LoginForm;
