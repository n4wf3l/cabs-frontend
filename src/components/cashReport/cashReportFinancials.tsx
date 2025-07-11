import { Card } from "@/components/ui/card";
import { Euro, CreditCard, Gift, AlertTriangle, Receipt } from "lucide-react";

interface FinancialStats {
  cashPayments: number;
  cardPayments: number;
  tips: number;
  refunds: number;
  netRevenue: number;
}

export const CashReportFinancials = ({ stats }: { stats: FinancialStats }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Chiffres financiers détaillés</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg">
          <div className="p-2 bg-green-100 rounded-full">
            <Euro className="text-green-600 h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Paiements espèces</p>
            <p className="font-semibold">{stats.cashPayments.toLocaleString()}€</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg">
          <div className="p-2 bg-blue-100 rounded-full">
            <CreditCard className="text-blue-600 h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Paiements carte/app</p>
            <p className="font-semibold">{stats.cardPayments.toLocaleString()}€</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg">
          <div className="p-2 bg-yellow-100 rounded-full">
            <Gift className="text-yellow-600 h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pourboires</p>
            <p className="font-semibold">{stats.tips.toLocaleString()}€</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertTriangle className="text-red-600 h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Remboursements/Annulations</p>
            <p className="font-semibold text-red-500">{stats.refunds.toLocaleString()}€</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg col-span-2">
          <div className="p-2 bg-purple-100 rounded-full">
            <Receipt className="text-purple-600 h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Recettes nettes</p>
            <p className="font-semibold text-lg">{stats.netRevenue.toLocaleString()}€</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
