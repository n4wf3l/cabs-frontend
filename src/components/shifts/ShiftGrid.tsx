import { Shift } from "@/pages/Shifts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Clock, MapPin } from "lucide-react";

interface ShiftGridProps {
  shifts: Shift[];
}

export const ShiftGrid = ({ shifts }: ShiftGridProps) => {
  const getStatusColor = (status: Shift["status"]) => {
    switch (status) {
      case "en_cours":
        return "text-blue-500";
      case "terminé":
        return "text-green-500";
      case "annulé":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {shifts.map((shift) => (
        <Card key={shift.id} className="glass-card">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">{shift.driverName}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{shift.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {shift.startTime} - {shift.endTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{shift.distance} km</span>
              </div>
              <div className={`font-medium ${getStatusColor(shift.status)}`}>
                {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="w-full">
                  Voir les Détails
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Détails du Shift</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Chauffeur</h4>
                    <p>{shift.driverName}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Date</h4>
                    <p>{shift.date}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Horaires</h4>
                    <p>
                      {shift.startTime} - {shift.endTime}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Distance</h4>
                    <p>{shift.distance} km</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Statut</h4>
                    <p className={getStatusColor(shift.status)}>
                      {shift.status.charAt(0).toUpperCase() +
                        shift.status.slice(1)}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};