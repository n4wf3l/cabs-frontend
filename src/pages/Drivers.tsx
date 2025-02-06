import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DriverList } from "@/components/drivers/DriverList";
import { AddDriverDialog } from "@/components/drivers/AddDriverDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Drivers = () => {
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Chauffeurs</h1>
          <Button onClick={() => setIsAddDriverOpen(true)}>
            <Plus className="mr-2" />
            Ajouter un chauffeur
          </Button>
        </div>
        <DriverList />
        <AddDriverDialog open={isAddDriverOpen} onOpenChange={setIsAddDriverOpen} />
      </main>
    </div>
  );
};

export default Drivers;