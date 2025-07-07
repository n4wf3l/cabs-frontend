import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  User,
  UserCheck,
  Settings as SettingsIcon,
  Shield,
  Bell,
  Globe,
  CreditCard,
  Layers,
  Eye,
  X,
  Search,
  Plus,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [activeSection, setActiveSection] = useState("team");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrer les utilisateurs en fonction de la recherche
  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAdmins = admins.filter((admin) =>
    admin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animations
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Sections de configuration
  const sections = [
    { id: "team", label: "Équipe", icon: <UserCheck className="w-4 h-4" /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
    },
    { id: "security", label: "Sécurité", icon: <Shield className="w-4 h-4" /> },
    {
      id: "integrations",
      label: "Intégrations",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      id: "billing",
      label: "Facturation",
      icon: <CreditCard className="w-4 h-4" />,
    },
    { id: "advanced", label: "Avancé", icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <div className="flex gap-8 pb-8">
      {/* Barre latérale de navigation des paramètres */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 flex-shrink-0 hidden md:block"
      >
        <div className="sticky top-24">
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`w-full flex items-center justify-between rounded-md px-3.5 py-2.5 text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <div className="flex items-center gap-3">
                  {section.icon}
                  {section.label}
                </div>
                {activeSection === section.id && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <div className="rounded-lg border border-border p-4 bg-card/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/20 p-2.5 rounded-full">
                  <SettingsIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Plan actuel</h4>
                  <p className="text-xs text-muted-foreground">Professional</p>
                </div>
              </div>
              <Progress value={68} className="h-1.5 mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>68% utilisé</span>
                <span>32% restant</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contenu principal des paramètres */}
      <div className="flex-1 space-y-8">
        {activeSection === "team" && (
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* En-tête de la section */}
            <motion.div
              variants={itemAnimation}
              className="flex flex-col gap-2"
            >
              <h2 className="text-2xl font-semibold tracking-tight">
                Gestion de l'équipe
              </h2>
              <p className="text-muted-foreground">
                Gérez les membres de votre équipe, les permissions et les rôles.
              </p>
            </motion.div>

            {/* Barre de recherche et filtre */}
            <motion.div
              variants={itemAnimation}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Rechercher un membre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button className="whitespace-nowrap" size="sm">
                <Plus className="mr-1.5 h-4 w-4" />
                Ajouter un membre
              </Button>
            </motion.div>

            {/* Section des chauffeurs */}
            <motion.div
              variants={itemAnimation}
              className="rounded-xl border border-border overflow-hidden bg-card"
            >
              <div className="border-b border-border bg-muted/50 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Chauffeurs</h3>
                  <Badge variant="secondary" className="rounded-full">
                    {loadingDrivers ? "..." : drivers.length}
                  </Badge>
                </div>
              </div>

              {loadingDrivers ? (
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded-full border-2 border-t-transparent border-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">
                    Chargement des chauffeurs...
                  </p>
                </div>
              ) : filteredDrivers.length > 0 ? (
                <div className="divide-y divide-border">
                  {filteredDrivers.map((driver, idx) => (
                    <div
                      key={driver.id}
                      className="px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-amber-500/10 text-amber-500">
                            {driver.first_name[0]}
                            {driver.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {driver.first_name} {driver.last_name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            chauffeur-{driver.id}@exemple.com
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        >
                          Actif
                        </Badge>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => navigate(`/drivers/${driver.id}`)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Voir le profil</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  <User className="h-10 w-10 text-muted-foreground opacity-40 mb-2" />
                  <p className="font-medium">Aucun chauffeur trouvé</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchQuery
                      ? "Essayez avec un terme différent"
                      : "Ajoutez des chauffeurs pour commencer"}
                  </p>
                </div>
              )}

              <div className="bg-muted/30 px-6 py-3 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                >
                  Voir tous les chauffeurs
                </Button>
              </div>
            </motion.div>

            {/* Section des admins */}
            <motion.div
              variants={itemAnimation}
              className="rounded-xl border border-border overflow-hidden bg-card"
            >
              <div className="border-b border-border bg-muted/50 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Administrateurs</h3>
                  <Badge variant="secondary" className="rounded-full">
                    {admins.length}
                  </Badge>
                </div>
              </div>

              {filteredAdmins.length > 0 ? (
                <div className="divide-y divide-border">
                  {filteredAdmins.map((admin, idx) => (
                    <div
                      key={idx}
                      className="px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-blue-500/10 text-blue-500">
                            {admin[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{admin.split("@")[0]}</p>
                          <p className="text-xs text-muted-foreground">
                            {admin}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                        >
                          Admin
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  <Shield className="h-10 w-10 text-muted-foreground opacity-40 mb-2" />
                  <p className="font-medium">Aucun administrateur trouvé</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchQuery
                      ? "Essayez avec un terme différent"
                      : "Ajoutez des administrateurs pour commencer"}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {activeSection === "security" && (
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div
              variants={itemAnimation}
              className="flex flex-col gap-2"
            >
              <h2 className="text-2xl font-semibold tracking-tight">
                Sécurité
              </h2>
              <p className="text-muted-foreground">
                Gérez les paramètres de sécurité de votre compte et de votre
                entreprise.
              </p>
            </motion.div>

            <motion.div
              variants={itemAnimation}
              className="rounded-xl border border-border overflow-hidden bg-card"
            >
              <div className="border-b border-border bg-muted/50 px-6 py-4">
                <h3 className="font-medium">
                  Authentification à deux facteurs
                </h3>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">
                    Activer l'authentification à deux facteurs
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Renforcez la sécurité de votre compte en exigeant une
                    vérification supplémentaire lors de la connexion.
                  </p>
                </div>
                <Switch />
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeSection !== "team" && activeSection !== "security" && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <SettingsIcon className="h-10 w-10 text-muted-foreground opacity-60" />
            </div>
            <h3 className="text-xl font-medium mb-2">Configuration à venir</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Cette section sera disponible dans une prochaine mise à jour. Nous
              travaillons actuellement sur cette fonctionnalité.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsCards;
