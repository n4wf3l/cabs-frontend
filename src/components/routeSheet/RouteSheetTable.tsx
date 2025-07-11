import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  RouteSheet, 
  SortField, 
  SortDirection,
  statusColors,
  statusLabels,
  shiftLabels
} from "./types";
import { Eye, Edit, Trash2, MoreHorizontal, Clock, Calendar, MapPin, Car, User, DollarSign, ArrowUp, ArrowDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

interface RouteSheetTableProps {
  data: RouteSheet[];
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function RouteSheetTable({
  data,
  onViewDetails,
  onEdit,
  onDelete,
}: RouteSheetTableProps) {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortField === "driverName") {
      return sortDirection === "asc"
        ? a.driverName.localeCompare(b.driverName)
        : b.driverName.localeCompare(a.driverName);
    } else if (sortField === "date") {
      return sortDirection === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date);
    } else if (sortField === "status") {
      return sortDirection === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else if (sortField === "revenue") {
      return sortDirection === "asc"
        ? a.revenue - b.revenue
        : b.revenue - a.revenue;
    } else if (sortField === "kilometers") {
      return sortDirection === "asc"
        ? a.kilometers - b.kilometers
        : b.kilometers - a.kilometers;
    }
    return 0;
  });

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 h-3 w-3" />
    );
  };

  return (
    <motion.div
      className="rounded-lg border bg-card shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-muted/70 transition-colors"
              onClick={() => handleSort("driverName")}
            >
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                Chauffeur
                {getSortIcon("driverName")}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                <Car className="mr-2 h-4 w-4 text-muted-foreground" />
                Véhicule
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/70 transition-colors"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                Date
                {getSortIcon("date")}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                Horaires
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/70 transition-colors"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Statut
                {getSortIcon("status")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/70 transition-colors text-right"
              onClick={() => handleSort("kilometers")}
            >
              <div className="flex items-center justify-end">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                Km
                {getSortIcon("kilometers")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/70 transition-colors text-right"
              onClick={() => handleSort("revenue")}
            >
              <div className="flex items-center justify-end">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                Revenus
                {getSortIcon("revenue")}
              </div>
            </TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                Aucune feuille de route trouvée pour ces critères
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((route, index) => (
              <motion.tr
                key={route.id}
                className="border-b hover:bg-muted/50 cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onViewDetails(route.id)}
              >
                <TableCell className="font-medium">{route.driverName}</TableCell>
                <TableCell>{route.vehicleId}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{route.date}</span>
                    <span className="text-xs text-muted-foreground">
                      {shiftLabels[route.shiftType]}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex flex-col">
                          <span>{route.startTime} - {route.endTime}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                            {route.startLocation} → {route.endLocation}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="font-medium">Trajets</div>
                        <div className="text-xs">Départ: {route.startLocation}</div>
                        <div className="text-xs">Arrivée: {route.endLocation}</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[route.status]}>
                    {statusLabels[route.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {route.kilometers} km
                </TableCell>
                <TableCell className="text-right font-medium">
                  {route.revenue} €
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewDetails(route.id);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Voir détails</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(route.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-600"
                          onClick={() => onDelete(route.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
}
