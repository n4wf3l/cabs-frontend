import { Card } from "@/components/ui/card";
import { Clock, Car, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DayDetail {
  date: string;
  total: number;
  activeDrivers: number;
  weather: string;
  specialEvents?: string[];
}

interface DriverPerformance {
  id: number;
  name: string;
  rides: number;
  revenue: number;
  hoursWorked: number;
  revenuePerHour: number;
  revenuePerRide: number;
  attendance: number;
}

interface VehicleInfo {
  id: string;
  averageRevenue: number;
  mileage: number;
  alerts?: string[];
}

interface CashReportDetailsProps {
  dayDetails: DayDetail[];
  driverPerformance: DriverPerformance[];
  vehicles: VehicleInfo[];
}

export const CashReportDetails = ({
  dayDetails,
  driverPerformance,
  vehicles,
}: CashReportDetailsProps) => {
  return (
    <div className="grid gap-6">
      {/* Performances des conducteurs */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Performance des conducteurs</h3>
        <div className="space-y-4">
          {driverPerformance.slice(0, 5).map((driver) => (
            <div key={driver.id} className="bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{driver.name}</h4>
                <div className="text-sm text-muted-foreground">
                  {driver.attendance}% présence
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Courses</p>
                  <p className="font-medium">{driver.rides}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Heures</p>
                  <p className="font-medium">{driver.hoursWorked}h</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Revenu/course</p>
                  <p className="font-medium">{driver.revenuePerRide.toFixed(2)}€</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Revenu/heure</p>
                  <p className="font-medium">{driver.revenuePerHour.toFixed(2)}€</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Détails journaliers */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Détails journaliers</h3>
        <div className="space-y-3">
          {dayDetails.map((day) => (
            <TooltipProvider key={day.date}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-help">
                    <div>
                      <p className="font-medium">{day.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {day.activeDrivers} conducteurs actifs
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{day.total.toLocaleString()}€</p>
                      <p className="text-sm text-muted-foreground">{day.weather}</p>
                    </div>
                  </div>
                </TooltipTrigger>
                {day.specialEvents && day.specialEvents.length > 0 && (
                  <TooltipContent>
                    <div className="p-2">
                      <p className="font-medium mb-1">Événements :</p>
                      <ul className="list-disc list-inside">
                        {day.specialEvents.map((event, i) => (
                          <li key={i}>{event}</li>
                        ))}
                      </ul>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </Card>

      {/* Véhicules */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">État des véhicules</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">Véhicule {vehicle.id}</h4>
                {vehicle.alerts && vehicle.alerts.length > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <ul className="list-disc list-inside">
                          {vehicle.alerts.map((alert, i) => (
                            <li key={i}>{alert}</li>
                          ))}
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Recette moyenne</p>
                  <p className="font-medium">
                    {vehicle.averageRevenue.toLocaleString()}€
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Kilométrage</p>
                  <p className="font-medium">{vehicle.mileage.toLocaleString()} km</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
