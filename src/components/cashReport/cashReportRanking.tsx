import { Card } from "@/components/ui/card";

interface Driver {
  id: number;
  name: string;
  totalAmount: number;
  avgAmount: number;
  bestDay: {
    date: string;
    amount: number;
  };
}

interface CashReportRankingProps {
  driverStats: Driver[];
}

export const CashReportRanking = ({ driverStats }: CashReportRankingProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Classement des conducteurs</h3>
      <div className="grid gap-4">
        {driverStats.map((driver, index) => (
          <div key={driver.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-4">
              <div className={`text-lg font-bold ${
                index === 0 ? "text-yellow-500" :
                index === 1 ? "text-gray-400" :
                index === 2 ? "text-amber-600" : "text-muted-foreground"
              }`}>
                #{index + 1}
              </div>
              <div>
                <p className="font-medium">{driver.name}</p>
                <p className="text-sm text-muted-foreground">
                  Meilleur jour : {driver.bestDay.date} ({driver.bestDay.amount.toLocaleString()}€)
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">{driver.totalAmount.toLocaleString()}€</p>
              <p className="text-sm text-muted-foreground">
                moy. {driver.avgAmount.toFixed(0)}€/jour
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
