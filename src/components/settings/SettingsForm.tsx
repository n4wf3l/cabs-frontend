import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Shield,
  User,
  Building,
  CheckCircle2,
  AlertCircle,
  X,
  Info,
} from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/hooks/use-theme";

const Forms = () => {
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminCompany, setAdminCompany] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  // Simuler le chargement de l'ID de société
  useEffect(() => {
    const timer = setTimeout(() => {
      setAdminCompany("CABS-12345");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Valider le formulaire
  useEffect(() => {
    // Validation des champs
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      firstName: !adminFirstName ? "Le prénom est requis" : "",
      lastName: !adminLastName ? "Le nom est requis" : "",
      email: !adminEmail
        ? "L'email est requis"
        : !emailRegex.test(adminEmail)
        ? "Format d'email invalide"
        : "",
      password: !adminPassword
        ? "Le mot de passe est requis"
        : adminPassword.length < 8
        ? "Le mot de passe doit contenir au moins 8 caractères"
        : "",
    };

    setErrors(newErrors);
    setFormValid(
      !newErrors.firstName &&
        !newErrors.lastName &&
        !newErrors.email &&
        !newErrors.password &&
        !!adminCompany
    );
  }, [adminFirstName, adminLastName, adminEmail, adminPassword, adminCompany]);

  const handleAdminAdd = async (e) => {
    e.preventDefault();
    if (!formValid) return;

    setIsSubmitting(true);

    try {
      // Simulation d'appel API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Administrateur ajouté",
        description: `${adminFirstName} ${adminLastName} a été ajouté en tant qu'administrateur.`,
      });

      // Réinitialisation du formulaire
      setAdminFirstName("");
      setAdminLastName("");
      setAdminEmail("");
      setAdminPassword("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur lors de l'ajout",
        description:
          "Une erreur est survenue lors de l'ajout de l'administrateur.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animations
  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const formAnimation = {
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerAnimation}
      initial="hidden"
      animate="show"
      className="mt-8"
    >
      <Card className="border-border overflow-hidden bg-card">
        <div className="p-6">
          <div className="flex items-start sm:items-center justify-between mb-8">
            <motion.div className="flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="bg-blue-500/10 p-2.5 rounded-full shrink-0">
                <Shield className="text-blue-500 h-6 w-6" />
              </div>
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl font-semibold tracking-tight"
                >
                  Ajouter un nouvel administrateur
                </motion.h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Les administrateurs ont accès à toutes les fonctionnalités de
                  gestion.
                </p>
              </div>
            </motion.div>
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-semibold px-3 py-1 h-auto">
              Super Admin
            </Badge>
          </div>

          <ScrollArea className="max-h-[calc(100vh-300px)]">
            <motion.form
              onSubmit={handleAdminAdd}
              variants={formAnimation}
              initial="hidden"
              animate="show"
              className="bg-card rounded-xl border border-border p-6"
            >
              <motion.div variants={itemAnimation} className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <UserPlus className="h-4 w-4 text-blue-500" />
                  <h3 className="text-lg font-medium">
                    Informations personnelles
                  </h3>
                </div>
                <Separator className="mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Prénom */}
                  <motion.div variants={itemAnimation} className="space-y-2.5">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-medium text-foreground"
                    >
                      <div className="flex items-center gap-2">
                        <span>Prénom</span>
                        <span className="text-destructive">*</span>
                      </div>
                    </Label>
                    <div>
                      <div
                        className={`relative ${
                          errors.firstName ? "animate-shake" : ""
                        }`}
                      >
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          type="text"
                          value={adminFirstName}
                          onChange={(e) => setAdminFirstName(e.target.value)}
                          className={`pl-10 ${
                            errors.firstName
                              ? "border-destructive focus:ring-destructive/30"
                              : adminFirstName
                              ? "border-green-500/50 focus:ring-green-500/30"
                              : ""
                          }`}
                          placeholder="Prénom"
                        />
                        {adminFirstName && !errors.firstName && (
                          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                        )}
                        {errors.firstName && (
                          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
                        )}
                      </div>
                      {errors.firstName && (
                        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                          <X className="w-3 h-3" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {/* Nom */}
                  <motion.div variants={itemAnimation} className="space-y-2.5">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-medium text-foreground"
                    >
                      <div className="flex items-center gap-2">
                        <span>Nom</span>
                        <span className="text-destructive">*</span>
                      </div>
                    </Label>
                    <div>
                      <div
                        className={`relative ${
                          errors.lastName ? "animate-shake" : ""
                        }`}
                      >
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="lastName"
                          type="text"
                          value={adminLastName}
                          onChange={(e) => setAdminLastName(e.target.value)}
                          className={`pl-10 ${
                            errors.lastName
                              ? "border-destructive focus:ring-destructive/30"
                              : adminLastName
                              ? "border-green-500/50 focus:ring-green-500/30"
                              : ""
                          }`}
                          placeholder="Nom"
                        />
                        {adminLastName && !errors.lastName && (
                          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                        )}
                        {errors.lastName && (
                          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
                        )}
                      </div>
                      {errors.lastName && (
                        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                          <X className="w-3 h-3" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={itemAnimation} className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="h-4 w-4 text-blue-500" />
                  <h3 className="text-lg font-medium">
                    Informations de connexion
                  </h3>
                </div>
                <Separator className="mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <motion.div variants={itemAnimation} className="space-y-2.5">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      <div className="flex items-center gap-2">
                        <span>Email professionnel</span>
                        <span className="text-destructive">*</span>
                      </div>
                    </Label>
                    <div>
                      <div
                        className={`relative ${
                          errors.email ? "animate-shake" : ""
                        }`}
                      >
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          className={`pl-10 ${
                            errors.email
                              ? "border-destructive focus:ring-destructive/30"
                              : adminEmail
                              ? "border-green-500/50 focus:ring-green-500/30"
                              : ""
                          }`}
                          placeholder="nom@exemple.com"
                        />
                        {adminEmail && !errors.email && (
                          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                        )}
                        {errors.email && (
                          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
                        )}
                      </div>
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                          <X className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {/* Mot de passe */}
                  <motion.div variants={itemAnimation} className="space-y-2.5">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-foreground"
                    >
                      <div className="flex items-center gap-2">
                        <span>Mot de passe</span>
                        <span className="text-destructive">*</span>
                      </div>
                    </Label>
                    <div>
                      <div
                        className={`relative ${
                          errors.password ? "animate-shake" : ""
                        }`}
                      >
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          className={`pl-10 pr-10 ${
                            errors.password
                              ? "border-destructive focus:ring-destructive/30"
                              : adminPassword
                              ? "border-green-500/50 focus:ring-green-500/30"
                              : ""
                          }`}
                          placeholder="Minimum 8 caractères"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                          <X className="w-3 h-3" />
                          {errors.password}
                        </p>
                      )}
                      <div className="flex mt-1.5 gap-2">
                        <div
                          className={`h-1 flex-1 rounded-full ${
                            adminPassword.length >= 3
                              ? "bg-red-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <div
                          className={`h-1 flex-1 rounded-full ${
                            adminPassword.length >= 6
                              ? "bg-yellow-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <div
                          className={`h-1 flex-1 rounded-full ${
                            adminPassword.length >= 8
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={itemAnimation}>
                <div className="flex items-center gap-2 mb-3">
                  <Building className="h-4 w-4 text-blue-500" />
                  <h3 className="text-lg font-medium">
                    Informations de société
                  </h3>
                </div>
                <Separator className="mb-6" />

                {/* Société */}
                <motion.div variants={itemAnimation} className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="company"
                      className="text-sm font-medium text-foreground"
                    >
                      <div className="flex items-center gap-2">
                        <span>Identifiant société</span>
                        <span className="text-destructive">*</span>
                      </div>
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center text-muted-foreground hover:text-foreground cursor-help">
                          <Info className="h-3.5 w-3.5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          L'identifiant de société est automatiquement attribué
                          et ne peut pas être modifié.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="company"
                      type="text"
                      value={adminCompany}
                      disabled
                      className="pl-10 pr-20 bg-muted/50 text-muted-foreground cursor-not-allowed"
                      placeholder="Chargement de l'ID société..."
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {adminCompany ? "Système" : "Chargement..."}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={itemAnimation}
                className="mt-8 flex flex-col gap-3"
              >
                <Button
                  type="submit"
                  className="w-full py-6 text-base"
                  disabled={!formValid || isSubmitting}
                  data-state={isSubmitting ? "loading" : "idle"}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Ajouter l'administrateur
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Un email d'invitation sera envoyé à l'administrateur pour
                  compléter son inscription.
                </p>

                {!formValid && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg mt-2">
                    <p className="text-amber-500 text-sm flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>
                        Veuillez remplir tous les champs requis correctement
                        avant de soumettre le formulaire.
                      </span>
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Section avancée : toggle darkmode/whitemode */}
              <div className="flex flex-col items-center justify-center mt-8">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/40 border w-fit">
                  <span className="inline-block rounded-full bg-muted p-2">
                    {isDark ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-moon text-blue-500"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79"></path>
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-sun text-yellow-500"
                      >
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.54 6.54-1.42-1.42M6.88 6.88 5.46 5.46m12.02 0-1.42 1.42M6.88 17.12l-1.42 1.42"></path>
                      </svg>
                    )}
                  </span>
                  <span className="text-sm font-medium">Mode sombre</span>
                  <input
                    type="checkbox"
                    checked={isDark}
                    onChange={() => setTheme(isDark ? "light" : "dark")}
                    className="toggle toggle-primary"
                    id="theme-toggle"
                  />
                  <label
                    htmlFor="theme-toggle"
                    className="text-xs text-muted-foreground cursor-pointer"
                  >
                    {isDark ? "Dark mode" : "Light mode"}
                  </label>
                </div>
              </div>
            </motion.form>
          </ScrollArea>
        </div>
      </Card>
    </motion.div>
  );
};

export default Forms;
