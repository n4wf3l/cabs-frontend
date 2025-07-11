import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { format, endOfWeek } from "date-fns";
import { fr } from "date-fns/locale";

interface CashReportHeaderProps {
  currentWeekStart: Date;
  selectedDriver: string;
  selectedView: string;
  onDriverChange: (value: string) => void;
  onViewChange: (value: string) => void;
  onNavigateWeek: (direction: 'prev' | 'next') => void;
  drivers: Array<{ id: number; name: string; }>;
}

export const CashReportHeader = ({
  currentWeekStart,
  selectedDriver,
  selectedView,
  onDriverChange,
  onViewChange,
  onNavigateWeek,
  drivers,
}: CashReportHeaderProps) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="text-2xl font-bold">Bilan de caisse</h1>
        <p className="text-gray-500">
          Semaine du {format(currentWeekStart, 'dd/MM/yyyy', { locale: fr })} au{' '}
          {format(endOfWeek(currentWeekStart, { weekStartsOn: 1 }), 'dd/MM/yyyy', { locale: fr })}
        </p>
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigateWeek('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigateWeek('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Select
          value={selectedDriver}
          onValueChange={onDriverChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tous les conducteurs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les conducteurs</SelectItem>
            {drivers.map(driver => (
              <SelectItem key={driver.id} value={driver.id.toString()}>
                {driver.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedView}
          onValueChange={onViewChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type d'affichage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Vue journalière</SelectItem>
            <SelectItem value="comparison">Comparaison conducteurs</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};
