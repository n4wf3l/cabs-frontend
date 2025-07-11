import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  DriverResponseDTO, DriverSignupRequestDTO
} from "@/api/models/DriverDTO";
import {
  fetchDrivers,
  createDriver,
  deleteDriver,
  updateDriver,
} from "@/api/driver";
import FullScreenLoader from "@/components/drivers/FullScreenLoader";
import { cn } from "@/lib/utils";
import { User, Mail, Lock, Phone, MapPin, Calendar, CreditCard, UserCog, Clock } from "lucide-react";

// Fonction pour calculer la force du mot de passe
const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 20;
  if (password.match(/[A-Z]/)) strength += 20;
  if (password.match(/[a-z]/)) strength += 20;
  if (password.match(/[0-9]/)) strength += 20;
  if (password.match(/[^A-Za-z0-9]/)) strength += 20;
  return strength;
};

// Fonction pour obtenir la couleur en fonction de la force
const getStrengthColor = (strength: number): string => {
  if (strength < 40) return "bg-red-500";
  if (strength < 60) return "bg-yellow-500";
  return "bg-green-500";
};

interface AddDriverFormProps {
  onCancel?: () => void;
  onSuccess?: (data: DriverResponseDTO) => void;
}

// Style global pour tous les champs du formulaire
const inputStyle = "pl-10 border-gray-700 focus:border-blue-500 hover:border-gray-600 transition-all duration-200 bg-gray-800/50 focus:bg-gray-800 shadow-sm focus:shadow-blue-900/30";
const iconStyle = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-200";

export const AddDriverForm = ({ onCancel, onSuccess }: AddDriverFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm<DriverSignupRequestDTO>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      postalCode: "",
      cityOfBirth: "",
      dateOfBirth: "",
    }
  });

  // Surveiller les changements du mot de passe pour mettre à jour la force
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'password') {
        setPasswordStrength(calculatePasswordStrength(value.password || ''));
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const formatData = (data: DriverSignupRequestDTO): DriverSignupRequestDTO => {
    return {
      ...data,
      firstName: data.firstName.trim().charAt(0).toUpperCase() + data.firstName.slice(1).toLowerCase(),
      lastName: data.lastName.trim().charAt(0).toUpperCase() + data.lastName.slice(1).toLowerCase(),
      cityOfBirth: data.cityOfBirth.trim().charAt(0).toUpperCase() + data.cityOfBirth.slice(1).toLowerCase(),
      address: data.address
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' '),
    };
  };

  const onSubmit = async (data: DriverSignupRequestDTO) => {
    if (passwordStrength < 60) {
      toast.error("Le mot de passe n'est pas assez sécurisé");
      return;
    }
    
    setIsLoading(true);
    const formattedData = formatData(data);

    try {
      const response = await createDriver(formattedData);
      console.log("Réponse du backend:", response);
      toast.success("🚗 Chauffeur ajouté avec succès !");
      form.reset();

      // Note : le backend renvoie juste un message de succès, pas les données du driver
      // Si on a besoin des données, il faudra faire un appel GET séparé
      if (onSuccess) {
        // Pour l'instant on passe undefined car le backend ne renvoie pas les données
        onSuccess(undefined as any);
      }
    } catch (error: any) {
      console.error("❌ Échec de l'ajout du chauffeur :", error);
      // Afficher un message d'erreur plus précis si disponible
      const errorMessage = error.response?.data?.message || "Erreur lors de l'ajout du chauffeur. Veuillez réessayer.";
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FullScreenLoader isLoading={isLoading} />
      <motion.div
        className="max-w-4xl mx-auto p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 15px rgba(59, 130, 246, 0.3)", "0 0 0 rgba(59, 130, 246, 0)"]
        }}
        transition={{ 
          duration: 0.5,
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-gradient-to-r from-blue-900 to-gray-900 rounded-t-lg p-4 border-b border-blue-600 flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-full">
              <User size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Nouveau chauffeur</h1>
          </div>
          
          <div className="bg-gray-900 rounded-b-lg p-6 border border-gray-800 border-t-0 shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
              <User size={18} className="text-blue-400" />
              Informations personnelles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className={iconStyle} />
                        <Input
                          {...field}
                          required
                          placeholder="Exemple : Jean"
                          className={inputStyle}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className={iconStyle} />
                        <Input
                          {...field}
                          required
                          placeholder="Exemple : Dupont"
                          className={inputStyle}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className={iconStyle} />
                        <Input
                          {...field}
                          required
                          type="email"
                          placeholder="Exemple : jean.dupont@email.com"
                          className={inputStyle}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className={iconStyle} />
                        <Input
                          {...field}
                          required
                          type="password"
                          placeholder="Exemple : MotDePasse123!"
                          className={inputStyle}
                        />
                      </div>
                    </FormControl>
                    <div className="mt-2 space-y-2">
                      <Progress 
                        value={passwordStrength} 
                        className={cn("h-2", getStrengthColor(passwordStrength))} 
                      />
                      <p className="text-sm text-gray-400">
                        {passwordStrength < 40 && "Mot de passe faible"}
                        {passwordStrength >= 40 && passwordStrength < 60 && "Mot de passe moyen"}
                        {passwordStrength >= 60 && "Mot de passe fort"}
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className={iconStyle} />
                        <Input
                          {...field}
                          required
                          placeholder="Exemple : +32 4 12 34 56 78"
                          className={inputStyle}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Adresse *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className={iconStyle} />
                        <Input
                          {...field}
                          required
                          placeholder="Exemple : 123 Rue de Paris"
                          className={inputStyle}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code postal *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className={iconStyle} />
                        <Input 
                          {...field} 
                          required 
                          placeholder="Exemple : 75000" 
                          className={inputStyle}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cityOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lieu de naissance *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className={iconStyle} />
                        <Input 
                          {...field} 
                          required 
                          placeholder="Exemple : Paris" 
                          className={inputStyle}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Date de naissance *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className={iconStyle} />
                        <Input
                          {...field}
                          required
                          type="date"
                          className={inputStyle}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mt-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
              <UserCog size={18} className="text-blue-400" />
              Statut du chauffeur
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
            
              <FormField
                control={form.control}
                name="paymentsEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-800 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-blue-400" />
                        Paiements activés
                      </FormLabel>
                      <FormDescription className="text-gray-400">
                        Indique si le chauffeur peut recevoir des paiements
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="availableForReplacement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-800 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-400" />
                        Disponible pour remplacement
                      </FormLabel>
                      <FormDescription className="text-gray-400">
                        Le chauffeur peut être assigné comme remplaçant
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="onLeave"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-800 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-400" />
                        En congé
                      </FormLabel>
                      <FormDescription className="text-gray-400">
                        Indique si le chauffeur est actuellement en congé
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4 mt-6">
            <div className="flex items-start">
              <div className="bg-blue-600 p-1 rounded-full mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-blue-400 font-semibold mb-1">Conseils pour l'ajout d'un chauffeur</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Assurez-vous que toutes les informations sont correctes et vérifiées</li>
                  <li>• Le mot de passe doit être fort (majuscules, chiffres, caractères spéciaux)</li>
                  <li>• Le format des numéros de téléphone recommandé est +32 4 XX XX XX XX</li>
                  <li>• L'adresse email doit être valide et accessible par le chauffeur</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="border-gray-600 hover:border-gray-400 hover:bg-gray-800 transition-all duration-300"
              >
                <span className="mr-2">✕</span> Annuler
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Ajout en cours...
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="mr-2">✓</span> Ajouter le chauffeur
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
    </>
  );
};

export default AddDriverForm;
