import { Card } from "@/components/ui/card";
import { AlertOctagon, MessageSquare } from "lucide-react";

export interface Anomaly {
  type: 'absence' | 'dispute' | 'payment' | 'complaint';
  description: string;
  date: string;
  driverName?: string;
  status: 'pending' | 'resolved';
}

interface ComparisonData {
  previousWeek: {
    total: number;
    percentage: number;
  };
  lastFourWeeks: {
    average: number;
    trend: 'up' | 'down';
    percentage: number;
  };
}

interface CashReportFooterProps {
  anomalies: Anomaly[];
  comparison: ComparisonData;
}

export const CashReportFooter = ({
  anomalies,
  comparison,
}: CashReportFooterProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Anomalies et Notes */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertOctagon className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold">Anomalies & Notes</h3>
        </div>
        <div className="space-y-3">
          {anomalies.map((anomaly, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
            >
              <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">
                  {anomaly.driverName && `${anomaly.driverName} - `}
                  {anomaly.description}
                </p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {anomaly.date}
                  </span>
                  <span className={`text-xs ${
                    anomaly.status === 'resolved' 
                      ? 'text-green-500' 
                      : 'text-yellow-500'
                  }`}>
                    {anomaly.status === 'resolved' ? 'Résolu' : 'En attente'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Comparaisons */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Comparaison</h3>
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Semaine précédente</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">
                {comparison.previousWeek.total.toLocaleString()}€
              </p>
              <p className={`text-sm ${
                comparison.previousWeek.percentage > 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {comparison.previousWeek.percentage > 0 ? '+' : ''}
                {comparison.previousWeek.percentage}%
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Moyenne sur 4 semaines
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">
                {comparison.lastFourWeeks.average.toLocaleString()}€
              </p>
              <p className={`text-sm ${
                comparison.lastFourWeeks.percentage > 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {comparison.lastFourWeeks.percentage > 0 ? '+' : ''}
                {comparison.lastFourWeeks.percentage}%
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
