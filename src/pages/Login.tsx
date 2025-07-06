import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("admin");
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Simulation d'un délai de connexion
    setTimeout(() => {
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

      navigate("/dashboard");
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${email}!`,
      });

      setLoading(false);
    }, 1000); // Simule 1 seconde de chargement
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowSplash(false), 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const fullText =
    "LLa plateforme dédiée aux sociétés de taxi pour gérer leurs chauffeurs simplement et efficacement.";
  const [visibleText, setVisibleText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (!showSplash) {
      const interval = setInterval(() => {
        if (indexRef.current < fullText.length) {
          setVisibleText((prev) => prev + fullText.charAt(indexRef.current));
          indexRef.current++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showSplash]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black relative p-4">
      {showSplash && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gray-900 z-50 ${
            fadeOut
              ? "opacity-0 transition-opacity duration-1000 ease-in-out"
              : "opacity-100"
          }`}
        >
          <img src="/cabslogo.png" alt="Cabs" className="h-40 animate-pulse" />
        </div>
      )}

      {!showSplash && (
        <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl">
          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
            <img src="/cabslogo.png" alt="Cabs" className="h-10 mb-6 mx-auto" />
            <h2 className="text-2xl font-bold mb-4 text-center">
              Se connecter
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  className="text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="bg-gray-800 hover:bg-yellow-800 w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  <LogIn className="mr-2 h-4 w-4" />
                )}
                Se connecter
              </Button>
            </form>

            <a
              href="/forget-password"
              className="text-yellow-400 text-sm mt-4 block text-center hover:text-yellow-500"
            >
              Mot de passe oublié?
            </a>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-black p-6">
            <a
              href="https://www.taxitime.be"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-lg font-bold hover:text-yellow-400"
            >
              Cabs.
            </a>
            <p className="text-sm mt-2 text-center">{visibleText}</p>
            <p className="text-xs mt-10 text-gray-400">
              Made with love in Brussels.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
