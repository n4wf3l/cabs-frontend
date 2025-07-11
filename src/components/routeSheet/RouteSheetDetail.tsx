import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  Receipt, 
  Edit2, 
  User, 
  DollarSign, 
  RectangleHorizontal,
  CircleCheck,
  Share2,
  Printer,
  Download
} from "lucide-react";
import { RouteSheet, statusColors, statusLabels, shiftLabels } from "./types";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface RouteSheetDetailProps {
  data: RouteSheet | null;
  onEdit: () => void;
}

export function RouteSheetDetail({ data, onEdit }: RouteSheetDetailProps) {
  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="h-[500px] flex items-center justify-center">
          <CardContent className="p-6 text-center text-muted-foreground flex flex-col items-center">
            <Receipt className="h-12 w-12 mb-4 opacity-30" />
            <h3 className="text-lg font-medium mb-2">Aucune feuille sélectionnée</h3>
            <p>Sélectionnez une feuille de route pour voir les détails</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      key={data.id}
    >
      <Card className="overflow-hidden border-t-4" style={{ 
        borderTopColor: data.status === "completed" ? "#10b981" : 
                         data.status === "in-progress" ? "#3b82f6" : "#f59e0b" 
      }}>
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div>
            <div className="flex items-center space-x-2">
              <CardTitle>Feuille #{data.id}</CardTitle>
              <Badge className={statusColors[data.status]}>
                {statusLabels[data.status]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1 flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {data.date} • {shiftLabels[data.shiftType]}
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onEdit}>
                  <Edit2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Modifier</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Chauffeur et véhicule */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center">
                <User className="h-3.5 w-3.5 mr-1.5" /> Chauffeur
              </p>
              <p className="font-medium">{data.driverName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center">
                <Car className="h-3.5 w-3.5 mr-1.5" /> Véhicule
              </p>
              <p className="font-medium">{data.vehicleId}</p>
            </div>
          </div>
          
          <Separator />
          
          {/* Horaires */}
          <div className="space-y-2">
            <p className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-1.5" /> Horaires
            </p>
            <div className="bg-muted/50 p-3 rounded-md flex justify-between items-center">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Départ</p>
                <p className="font-medium">{data.startTime}</p>
              </div>
              <div className="flex-1 px-2 flex items-center justify-center">
                <div className="h-0.5 w-full bg-muted-foreground/20 relative">
                  <div className="absolute inset-0 bg-primary" style={{ 
                    width: data.status === "completed" ? "100%" : 
                           data.status === "in-progress" ? "50%" : "0%" 
                  }}></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Arrivée</p>
                <p className="font-medium">{data.endTime}</p>
              </div>
            </div>
          </div>
          
          {/* Trajet */}
          <div className="space-y-2">
            <p className="text-sm font-medium flex items-center">
              <MapPin className="h-4 w-4 mr-1.5" /> Itinéraire
            </p>
            <div className="bg-muted/50 p-3 rounded-md space-y-3">
              <div className="flex items-start">
                <div className="mt-1 mr-3">
                  <div className="h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
                  <div className="h-10 w-0.5 bg-primary/40 mx-auto"></div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Point de départ</p>
                  <p className="font-medium">{data.startLocation}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mt-1 mr-3">
                  <div className="h-4 w-4 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Destination</p>
                  <p className="font-medium">{data.endLocation}</p>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Performance */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center">
                <RectangleHorizontal className="h-3.5 w-3.5 mr-1.5" /> Distance
              </p>
              <p className="font-medium">{data.kilometers} km</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center">
                <DollarSign className="h-3.5 w-3.5 mr-1.5" /> Revenus
              </p>
              <p className="font-medium">{data.revenue} €</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="justify-between pt-0">
          <p className="text-xs text-muted-foreground">
            {data.status === "completed" ? (
              <span className="flex items-center">
                <CircleCheck className="h-3.5 w-3.5 mr-1.5 text-green-500" />
                Feuille validée
              </span>
            ) : data.status === "in-progress" ? (
              <span className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                En cours
              </span>
            ) : (
              <span className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                Planifiée
              </span>
            )}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
