import { Card } from "@/components/ui/card";
import { DollarSign, Users, Crown } from "lucide-react";

interface CashReportStatsProps {
  weekTotal: number;
  averagePerDriver: number;
  topDriver: {
    name: string;
    totalAmount: number;
  };
}

export const CashReportStats = ({
  weekTotal,
  averagePerDriver,
  topDriver,
}: CashReportStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm opacity-80">Total de la semaine</p>
            <h3 className="text-2xl font-bold">
              {weekTotal.toLocaleString()}€
            </h3>
          </div>
          <div className="p-2 bg-blue-400/20 rounded-lg">
            <DollarSign size={24} />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm opacity-80">Moyenne par conducteur</p>
            <h3 className="text-2xl font-bold">
              {averagePerDriver.toFixed(2)}€
            </h3>
          </div>
          <div className="p-2 bg-green-400/20 rounded-lg">
            <Users size={24} />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm opacity-80">Meilleur conducteur</p>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              {topDriver.name}
            </h3>
            <p className="text-sm mt-1">
              {topDriver.totalAmount.toLocaleString()}€ cette semaine
            </p>
          </div>
          <div className="p-2 bg-purple-400/20 rounded-lg">
            <Crown size={24} />
          </div>
        </div>
      </Card>
    </div>
  );
};
