import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  User,
  Users,
  Eye,
  UserPlus,
  UserCheck,
  Settings,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="w-full mb-6 grid grid-cols-2">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Utilisateurs</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>Système</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Carte des chauffeurs */}
            <div>
              <Card
                className="p-6 cursor-pointer hover:bg-gray-800 transition-all duration-300 border border-gray-700"
                onClick={() => setShowDrivers(!showDrivers)}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-yellow-500/20 p-2 rounded-full">
                      <User className="h-5 w-5 text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-bold">Chauffeurs</h3>
                  </div>
                  <ChevronDown
                    className="h-5 w-5 transition-transform duration-300"
                    style={{
                      transform: showDrivers
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </div>
                <p className="text-7xl font-bold text-yellow-500 flex items-center justify-center py-4">
                  {loadingDrivers ? (
                    <span className="text-4xl text-yellow-500/60">
                      chargement...
                    </span>
                  ) : (
                    drivers.length
                  )}
                </p>
              </Card>

              <AnimatePresence>
                {showDrivers && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-800 rounded-md mt-2 border border-gray-700"
                  >
                    {drivers.length > 0 ? (
                      <ul className="divide-y divide-gray-700">
                        {drivers.map((driver, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center py-3 first:pt-1 last:pb-1"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center">
                                {driver.first_name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium">
                                {driver.first_name.charAt(0).toUpperCase() +
                                  driver.first_name.slice(1)}{" "}
                                {driver.last_name.charAt(0).toUpperCase() +
                                  driver.last_name.slice(1)}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1"
                              onClick={() => navigate(`/drivers/${driver.id}`)}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Profil
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-6 text-gray-400">
                        <User className="w-8 h-8 mx-auto mb-2 opacity-40" />
                        <p>Aucun chauffeur n'a été ajouté.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Carte des admins */}
            <div>
              <Card
                className="p-6 cursor-pointer hover:bg-gray-800 transition-all duration-300 border border-gray-700"
                onClick={() => setShowAdmins(!showAdmins)}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <UserCheck className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold">Administrateurs</h3>
                  </div>
                  <ChevronDown
                    className="h-5 w-5 transition-transform duration-300"
                    style={{
                      transform: showAdmins ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </div>
                <p className="text-7xl font-bold text-blue-500 flex items-center justify-center py-4">
                  {admins.length}
                </p>
              </Card>

              <AnimatePresence>
                {showAdmins && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-800 rounded-md mt-2 border border-gray-700"
                  >
                    {admins.length > 0 ? (
                      <ul className="divide-y divide-gray-700">
                        {admins.map((admin, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center py-3 first:pt-1 last:pb-1"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-500/20 w-8 h-8 rounded-full flex items-center justify-center text-blue-500">
                                A
                              </div>
                              <span className="font-medium">{admin}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-6 text-gray-400">
                        <UserCheck className="w-8 h-8 mx-auto mb-2 opacity-40" />
                        <p>Aucun administrateur supplémentaire.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card className="p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Préférences système</h3>
            <p className="text-gray-400">
              Configuration système à venir dans une future mise à jour.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SettingsCards;
