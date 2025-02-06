import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur Taxi Time",
    });
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm animate-slideIn">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-secondary/50"
          required
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-secondary/50"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Se Connecter
      </Button>
      <p className="text-sm text-muted-foreground text-center">
        Pas encore de compte?{" "}
        <a href="#" className="text-primary hover:underline">
          Créer un compte
        </a>
      </p>
    </form>
  );
};