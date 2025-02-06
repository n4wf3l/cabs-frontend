import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

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
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-0 md:ml-20 lg:ml-64">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Paramètres</h1>
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
                  className="w-full"
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
                  className="w-full"
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
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Enregistrer les modifications
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;