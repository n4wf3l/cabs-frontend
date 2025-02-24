import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Car, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface ShiftPreviewProps {
  driverName: string;
  driverFirstName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalKm?: number;
  onViewDetails: () => void;
}

const ShiftPreviewCard = ({
  driverName,
  driverFirstName,
  date,
  startTime,
  endTime,
  totalKm,
  onViewDetails,
}: ShiftPreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="glass-card p-4 border border-transparent hover:border-white transition-colors duration-300 animate-fade-in">
        <motion.div
          className="flex flex-col h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* En-tête avec info chauffeur */}
          <motion.div
            className="flex items-center gap-3 mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="p-2 rounded-full bg-gray-900"
              whileHover={{ scale: 1.1 }}
            >
              <CalendarDays className="w-5 h-5 text-blue-700" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gradient">
                {driverFirstName} {driverName}
              </h3>
              <p className="text-sm text-muted-foreground">{date}</p>
            </div>
          </motion.div>

          {/* Détails du shift */}
          <motion.div
            className="space-y-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <motion.div
              className="flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="w-4 h-4 text-blue-700" />
              <span>
                {startTime} - {endTime}
              </span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Car className="w-4 h-4 text-blue-700" />
              <span>{totalKm} km</span>
            </motion.div>
          </motion.div>

          {/* Statut et bouton Voir les détails */}
          <motion.div
            className="mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <motion.span
                className="text-sm px-2 py-1 rounded-full bg-gray-900 text-blue-700"
                whileHover={{ scale: 1.1 }}
              >
                Terminé
              </motion.span>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="ghost"
                  className="hover:text-blue-700"
                  onClick={onViewDetails}
                >
                  Voir les détails
                  <ChevronRight className="w-4 h-4 ml-1 text-blue-700" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default ShiftPreviewCard;
