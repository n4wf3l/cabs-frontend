import { DateFilterType, StatusFilterType } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  CalendarDays,
  CalendarIcon,
  ArrowDownUp,
  ListFilter,
  ChevronsUpDown,
  X,
  Download,
  FileText,
  FileSpreadsheet
} from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RouteSheetFiltersProps {
  dateFilter: DateFilterType;
  setDateFilter: (filter: DateFilterType) => void;
  statusFilter: StatusFilterType;
  setStatusFilter: (filter: StatusFilterType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const dateFilters: { label: string; value: DateFilterType; icon: React.ElementType }[] = [
  { label: "Aujourd'hui", value: "today", icon: Calendar },
  { label: "Hier", value: "yesterday", icon: CalendarDays },
  { label: "Cette semaine", value: "week", icon: Clock },
  { label: "Ce mois", value: "month", icon: CalendarIcon },
];

const statusFilters: { label: string; value: StatusFilterType; icon: React.ElementType; color: string }[] = [
  { label: "Tous", value: "all", icon: Filter, color: "bg-gray-500" },
  { label: "Terminés", value: "completed", icon: CheckCircle, color: "bg-green-500" },
  { label: "En cours", value: "in-progress", icon: Clock, color: "bg-blue-500" },
  { label: "Planifiés", value: "planned", icon: Calendar, color: "bg-amber-500" },
];

export function RouteSheetFilters({
  dateFilter,
  setDateFilter,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
}: RouteSheetFiltersProps) {
  return (
    <motion.div
      className="bg-card rounded-lg p-4 shadow-sm border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-2/5">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par chauffeur, véhicule, lieu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Select value={dateFilter} onValueChange={(value: DateFilterType) => setDateFilter(value)}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    {dateFilters.map((filter) => (
                      <SelectItem key={filter.value} value={filter.value}>
                        <div className="flex items-center gap-2">
                          <filter.icon className="h-4 w-4" />
                          <span>{filter.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent>Filtrer par période</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Select value={statusFilter} onValueChange={(value: StatusFilterType) => setStatusFilter(value)}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusFilters.map((filter) => (
                      <SelectItem key={filter.value} value={filter.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${filter.value === 'all' ? 'bg-gray-500' : 
                            filter.value === 'completed' ? 'bg-green-500' : 
                            filter.value === 'in-progress' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                          <filter.icon className="h-4 w-4" />
                          <span>{filter.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent>Filtrer par statut</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto flex-shrink-0">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Exporter
                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Format d'export</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Excel
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {dateFilter !== "today" && (
          <Badge variant="secondary" className="gap-1">
            {dateFilters.find((f) => f.value === dateFilter)?.label}
            <X className="h-3 w-3 cursor-pointer" onClick={() => setDateFilter("today")} />
          </Badge>
        )}
        {statusFilter !== "all" && (
          <Badge variant="secondary" className="gap-1">
            {statusFilters.find((f) => f.value === statusFilter)?.label}
            <X className="h-3 w-3 cursor-pointer" onClick={() => setStatusFilter("all")} />
          </Badge>
        )}
        {(searchQuery || dateFilter !== "today" || statusFilter !== "all") && (
          <Button variant="ghost" size="sm" onClick={() => {
            setSearchQuery("");
            setDateFilter("today");
            setStatusFilter("all");
          }}>
            Réinitialiser les filtres
          </Button>
        )}
      </div>
    </motion.div>
  );
}
