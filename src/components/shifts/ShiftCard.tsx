import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Car,
  Download,
  User,
  FileText,
  X,
  AlertTriangle,
  BatteryCharging,
  Plug,
  BadgeCheck,
  Route,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

interface ShiftCardProps {
  driverName: string;
  driverFirstName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalKm?: number;
  initialKm?: number;
  vehiclePhotos?: string[];
  entryTicket?: string;
  exitTicket?: string;
}

const ShiftCard = ({
  driverName,
  driverFirstName,
  date,
  startTime,
  endTime,
  totalKm,
  initialKm,
  vehiclePhotos = [],
  entryTicket,
  exitTicket,
}: ShiftCardProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <motion.div
      className="space-y-6 max-h-[80vh] overflow-y-scroll overflow-x-hidden pr-6 pl-5 text-white w-full flex flex-col relative scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 mt-5 ml-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* En-tête avec info chauffeur */}
      <motion.div
        className="flex items-center gap-4 pb-4 border-b border-white/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="p-3 rounded-full bg-gray-900"
          whileHover={{ scale: 1.1 }}
        >
          <User className="w-6 h-6 text-blue-700" />
        </motion.div>
        <div>
          <h2 className="text-xl font-semibold text-gradient">
            {driverFirstName} {driverName}
          </h2>
          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <CalendarDays className="w-4 h-4 text-blue-700" />
              <span>{date}</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="w-4 h-4 text-blue-700" />
              <span>
                {startTime} - {endTime}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Infos kilométrage */}
      <motion.div
        className="grid gap-4 md:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div
          className="p-4 rounded-lg bg-secondary/50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Car className="w-5 h-5 text-blue-700" />
            <span className="font-medium">Kilométrage initial</span>
          </div>
          <p className="text-2xl font-semibold text-center">12 500 km</p>
        </motion.div>
        <motion.div
          className="p-4 rounded-lg bg-secondary/50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Car className="w-5 h-5 text-blue-700" />
            <span className="font-medium">Distance parcourue</span>
          </div>
          <p className="text-2xl font-semibold text-center">3 200 km</p>
        </motion.div>
      </motion.div>

      {/* Nouvelles infos ajoutées */}
      <motion.div
        className="grid gap-4 md:grid-cols-2 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div
          className="p-4 rounded-lg bg-secondary/50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BadgeCheck className="w-5 h-5 text-green-600" />
            <span className="font-medium">Numéro de licence</span>
          </div>
          <p className="text-2xl font-semibold text-center">AB-12345-X</p>
        </motion.div>
        <motion.div
          className="p-4 rounded-lg bg-secondary/50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Plug className="w-5 h-5 text-yellow-600" />
            <span className="font-medium">Nombre de prises</span>
          </div>
          <p className="text-2xl font-semibold text-center">57</p>
        </motion.div>
        <motion.div
          className="p-4 rounded-lg bg-secondary/50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BatteryCharging className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Km en charge</span>
          </div>
          <p className="text-2xl font-semibold text-center">1 800 km</p>
        </motion.div>
        <motion.div
          className="p-4 rounded-lg bg-secondary/50"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-medium">Chutes</span>
          </div>
          <p className="text-2xl font-semibold text-center">2</p>
        </motion.div>
        <motion.div
          className="p-4 rounded-lg bg-secondary/50"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Route className="w-5 h-5 text-gray-700" />
            <span className="font-medium">Kilométrage total</span>
          </div>
          <p className="text-2xl font-semibold text-center">15 700 km</p>
        </motion.div>
      </motion.div>

      {/* Photos du véhicule */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-lg font-medium">Photos du véhicule</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vehiclePhotos.slice(0, 4).map((photo, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedPhoto(photo)}
              className="aspect-square rounded-lg overflow-hidden bg-secondary/50"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={photo}
                alt={`Vehicle photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Tickets */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-lg font-medium">Tickets</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div className="space-y-2" whileHover={{ scale: 1.05 }}>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-700" />
              <span>Ticket d'entrée</span>
            </div>
            <button onClick={() => setSelectedPhoto(entryTicket)}>
              <img
                src={entryTicket}
                alt="Entry ticket"
                className="w-full rounded-lg"
              />
            </button>
          </motion.div>
          <motion.div className="space-y-2" whileHover={{ scale: 1.05 }}>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-700" />
              <span>Ticket de sortie</span>
            </div>
            <button onClick={() => setSelectedPhoto(exitTicket)}>
              <img
                src={exitTicket}
                alt="Exit ticket"
                className="w-full rounded-lg"
              />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bouton Export PDF */}
      <div className="flex justify-end pt-4 sticky bottom-0 py-4">
        <Button className="bg-blue-700 hover:bg-blue-900 text-white transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Exporter en PDF
        </Button>
      </div>

      {/* Modal pour l'agrandissement des photos */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-[60vw] max-h-[80vh] p-4 overflow-hidden bg-background/95 backdrop-blur-sm border-white/10 flex flex-col items-center">
          {selectedPhoto && (
            <>
              {/* ✅ Image agrandie */}
              <img
                src={selectedPhoto}
                alt="Enlarged photo"
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ShiftCard;
