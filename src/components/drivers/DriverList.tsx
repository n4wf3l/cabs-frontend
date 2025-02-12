import { useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pencil,
  Trash2,
  Eye,
  User,
  Phone,
  Mail,
  Clock,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

interface DriverListProps {
  drivers: any[];
  loading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  driversPerPage: number;
}

const DriverList: React.FC<DriverListProps> = ({
  drivers,
  loading,
  currentPage,
  setCurrentPage,
  driversPerPage,
}) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<"date" | "shift" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const totalPages = Math.ceil(drivers.length / driversPerPage);
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;

  const sortDrivers = (driversList: any[]) => {
    if (!sortBy) return driversList;
    return [...driversList].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison =
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
      } else if (sortBy === "shift") {
        const order = ["Jour", "Nuit", "Long"];
        comparison = order.indexOf(a.shift_type) - order.indexOf(b.shift_type);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const currentDrivers = sortDrivers(drivers).slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );

  const handleSort = (type: "date" | "shift") => {
    if (sortBy === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(type);
      setSortOrder("asc");
    }
  };

  return (
    <motion.div
      className="rounded-md border shadow-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Table className="w-full text-center">
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center justify-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span>Nom</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>Email</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>Téléphone</span>
              </div>
            </TableHead>
            <TableHead
              onClick={() => handleSort("date")}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Date de début</span>
                <ArrowUpDown className="h-4 w-4 text-gray-500" />
              </div>
            </TableHead>
            <TableHead
              onClick={() => handleSort("shift")}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>Type de shift</span>
                <ArrowUpDown className="h-4 w-4 text-gray-500" />
              </div>
            </TableHead>
            <TableHead>
              <div className="text-center">Actions</div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading
            ? Array.from({ length: driversPerPage }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-6 w-20 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-32 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16 mx-auto" />
                  </TableCell>
                </TableRow>
              ))
            : currentDrivers.map((driver) => (
                <TableRow
                  key={driver.id}
                  className="hover:bg-gray-900 text-white transition duration-300"
                >
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => navigate(`/drivers/${driver.id}`)}
                        className="text-blue-500 hover:text-blue-300"
                      >
                        <Eye className="h-8 w-8 bg-primary/10 hover:bg-primary/20 rounded-full p-1" />
                      </button>
                      <span>
                        {driver.first_name.charAt(0).toUpperCase() +
                          driver.first_name.slice(1).toLowerCase()}{" "}
                        {driver.last_name.charAt(0).toUpperCase() +
                          driver.last_name.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{driver.email}</TableCell>
                  <TableCell className="text-center">{driver.phone}</TableCell>
                  <TableCell className="text-center">
                    {new Date(driver.start_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        driver.shift_type === "Day"
                          ? "default"
                          : driver.shift_type === "Night"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {driver.shift_type === "Day"
                        ? "Jour"
                        : driver.shift_type === "Night"
                        ? "Nuit"
                        : "Long"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-primary/10 hover:bg-primary/20 rounded-full"
                    >
                      <Pencil className="h-4 w-4 text-primary" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-red-500/10 hover:bg-red-500/20 rounded-full"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default DriverList;
