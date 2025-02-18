import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const SettingsCards = ({
  drivers,
  admins,
  loadingDrivers,
  showDrivers,
  setShowDrivers,
  showAdmins,
  setShowAdmins,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Card
          className="p-4 cursor-pointer hover:bg-secondary/50 text-center"
          onClick={() => setShowDrivers(!showDrivers)}
        >
          <h3 className="text-xl font-bold">Chauffeurs</h3>
          <p className="text-7xl font-bold text-primary flex items-center justify-center">
            {loadingDrivers ? "..." : drivers.length}
            <ChevronDown
              className="ml-2 h-6 w-6 transition-transform duration-300"
              style={{
                transform: showDrivers ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </p>
        </Card>
        <AnimatePresence>
          {showDrivers && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-secondary rounded-md mt-2"
            >
              {drivers.length > 0 ? (
                <ul className="space-y-2 text-center">
                  {drivers.map((driver, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>
                        {driver.first_name.charAt(0).toUpperCase() +
                          driver.first_name.slice(1)}{" "}
                        {driver.last_name.charAt(0).toUpperCase() +
                          driver.last_name.slice(1)}
                      </span>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => navigate(`/drivers/${driver.id}`)}
                      >
                        Voir Profil
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-400">
                  Aucun chauffeur n'a été ajouté.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <Card
          className="p-4 cursor-pointer hover:bg-secondary/50 text-center"
          onClick={() => setShowAdmins(!showAdmins)}
        >
          <h3 className="text-xl font-bold">Admins</h3>
          <p className="text-7xl font-bold text-primary flex items-center justify-center">
            {admins.length}
            <ChevronDown
              className="ml-2 h-6 w-6 transition-transform duration-300"
              style={{
                transform: showAdmins ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </p>
        </Card>
        <AnimatePresence>
          {showAdmins && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-secondary rounded-md mt-2"
            >
              <ul className="space-y-2 text-center">
                {admins.map((admin, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {admin}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SettingsCards;
