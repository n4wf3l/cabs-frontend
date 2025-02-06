import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Users, Car, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Chauffeurs Actifs",
    value: "12",
    icon: Users,
    trend: "+2 cette semaine",
  },
  {
    title: "Véhicules en Route",
    value: "8",
    icon: Car,
    trend: "75% de la flotte",
  },
  {
    title: "Chiffre d'Affaires",
    value: "€2,450",
    icon: TrendingUp,
    trend: "+15% ce mois",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 p-8">
        <h1 className="text-2xl font-bold mb-8">Tableau de Bord</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6 glass-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.trend}
                  </p>
                </div>
                <stat.icon className="text-primary" size={24} />
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;