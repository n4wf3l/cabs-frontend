import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";
import { motion, AnimatePresence, delay } from "framer-motion";
import api from "../api/api"; // ✅ Import axios API instance
//import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Send login request to backend
      const response = await api.post("/auth/login", { email, password });

      // ✅ Store JWT token
      const { accessToken } = response.data;
      localStorage.setItem("token", accessToken); // ✅ Store token

      // ✅ Decode JWT token to get role
      const payload = JSON.parse(atob(accessToken.split(".")[1])); // Decode JWT
      console.log("🔍 Decoded Token:", payload);

      if (payload.role === "admin") {
        navigate("/dashboard");
        toast({ title: "Connexion réussie", description: `Bienvenue, ${email}!` });
      } else {
        navigate("/unauthorized"); // Redirect unauthorized users
        localStorage.removeItem("token"); // ✅ Remove token
      }

      
    } catch (error) {
      console.error("❌ Login Failed:", error);
      toast({ title: "Erreur", description: "Email ou mot de passe incorrect", variant: "destructive" });
    }
  };

 
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-black relative p-4">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-900 z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <motion.img
              src="/taxitimelogo.png"
              alt="Taxi Time"
              className="h-40"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, yoyo: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && (
        <motion.div
          className="w-full max-w-4xl flex flex-col lg:flex-row bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
            <motion.img
              src="/taxitimelogo.png"
              alt="Taxi Time"
              className="h-10 mb-6 mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
            <motion.h2
              className="text-2xl font-bold mb-4 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Se connecter
            </motion.h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
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
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  className="text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}>
                <Button type="submit" className="bg-gray-800 text-white hover:bg-yellow-800 w-full" disabled={loading}>
                  {loading ? "Connexion..." : <><LogIn className="mr-2 h-4 w-4" /> Se connecter</>}
                </Button>
              </motion.div>
            </form>

            <motion.a
              href="/forget-password"
              className="text-yellow-400 text-sm mt-4 block text-center hover:text-yellow-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Mot de passe oublié?
            </motion.a>
          </div>

          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-black p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <a href="https://www.taxitime.be" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-bold hover:text-yellow-400">
              Taxi Time.
            </a>
            <p className="text-sm mt-2 text-center">La plateforme dédiée aux sociétés de taxi.</p>
            <p className="text-xs mt-10 text-gray-400">Made with love in Brussels.</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Login;
