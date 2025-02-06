import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Settings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "Taxi Time",
    email: "contact@taxitime.fr",
    phone: "+33 1 23 45 67 89",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Paramètres mis à jour",
      description: "Les paramètres ont été mis à jour avec succès.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar responsive */}
      <div className="fixed z-50 md:relative md:translate-x-0 transition-transform duration-300">
        <Sidebar />
      </div>

      {/* Contenu principal avec ajustement responsive */}
      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <motion.h1
          className="text-2xl font-bold mb-8 text-center md:text-left mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Paramètres
        </motion.h1>

        <hr className="hr-light-effect mt-10 mb-10" />

        {/* Carte avec animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nom de l'entreprise</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email de contact</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone de contact</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Button type="submit" className="w-full md:w-auto">
                  Enregistrer les modifications
                </Button>
              </motion.div>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Settings;
