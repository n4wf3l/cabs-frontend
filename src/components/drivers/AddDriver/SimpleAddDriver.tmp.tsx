import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CreateDriverRequest, DriverResponse, createDriver } from "@/api/driver";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
  onSuccess?: (data: DriverResponse) => void;
}

export const AddDriverForm = ({ onCancel, onSuccess }: AddDriverFormProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  const form = useForm<CreateDriverRequest>({
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

  // Vérifier si le formulaire est valide
  useEffect(() => {
    const values = form.getValues();
    const isFormValid = values.firstName && values.lastName && 
                       values.email && values.password && 
                       values.phoneNumber && values.address &&
                       values.postalCode && values.cityOfBirth &&
                       values.dateOfBirth && passwordStrength >= 60;
    setCanProceed(isFormValid);
  }, [form.watch(), passwordStrength]);

  const handleNext = () => {
    const values = form.getValues();
    // Capitaliser les champs requis
    form.setValue("firstName", values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1).toLowerCase());
    form.setValue("lastName", values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1).toLowerCase());
    form.setValue("cityOfBirth", values.cityOfBirth.charAt(0).toUpperCase() + values.cityOfBirth.slice(1).toLowerCase());
    
    // Mettre en majuscules les mots de l'adresse
    if (values.address) {
      form.setValue("address", values.address
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
      );
    }
    
    setStep(2);
  };

  const onSubmit = async (data: CreateDriverRequest) => {
    if (step === 1) {
      handleNext();
      return;
    }

    setIsLoading(true);

    try {
      const response = await createDriver(data);
      toast.success("🚗 Chauffeur ajouté avec succès !");
      form.reset();
      setStep(1);
      setPasswordStrength(0);
      if (onSuccess) {
        onSuccess(undefined as any);
      }
    } catch (error: any) {
      console.error("❌ Échec de l'ajout du chauffeur :", error);
      const errorMessage = error.response?.data?.message || "Erreur lors de l'ajout du chauffeur. Veuillez réessayer.";
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center justify-between">
              Informations du chauffeur
              {step === 2 && (
                <span className="text-sm text-green-400 flex items-center">
                  Format vérifié ✓
                </span>
              )}
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom *</FormLabel>
                      <FormControl>
                        <Input {...field} required className="bg-gray-800 border-gray-700" />
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
                        <Input {...field} required className="bg-gray-800 border-gray-700" />
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
                        <Input type="email" {...field} required className="bg-gray-800 border-gray-700" />
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
                        <Input 
                          type="password" 
                          {...field} 
                          required 
                          className="bg-gray-800 border-gray-700"
                          onChange={(e) => {
                            field.onChange(e);
                            setPasswordStrength(calculatePasswordStrength(e.target.value));
                          }}
                        />
                      </FormControl>
                      <div className="mt-2 space-y-2">
                        <Progress value={passwordStrength} className={cn("h-2", getStrengthColor(passwordStrength))} />
                        <p className="text-sm text-gray-400">
                          {passwordStrength < 40 && "Mot de passe faible - Ajoutez des majuscules, chiffres et symboles"}
                          {passwordStrength >= 40 && passwordStrength < 60 && "Mot de passe moyen - Continuez d'améliorer"}
                          {passwordStrength >= 60 && "Mot de passe fort - Parfait !"}
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
                        <Input {...field} required className="bg-gray-800 border-gray-700" />
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
                        <Input {...field} required className="bg-gray-800 border-gray-700" />
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
                        <Input {...field} required className="bg-gray-800 border-gray-700" />
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
                        <Input {...field} required className="bg-gray-800 border-gray-700" />
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
                        <Input type="date" {...field} required className="bg-gray-800 border-gray-700" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Annuler
              </Button>
            )}
            
            <Button
              type="submit"
              disabled={!canProceed || isLoading}
              className="bg-blue-600 hover:bg-blue-700 relative min-w-[200px]"
            >
              <span className={cn("transition-opacity", isLoading ? "opacity-0" : "opacity-100")}>
                {step === 1 ? (
                  <>
                    {canProceed ? "Vérifier le format" : "Remplissez tous les champs"}
                    {canProceed && <span className="ml-2">→</span>}
                  </>
                ) : (
                  "Ajouter le chauffeur"
                )}
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default AddDriverForm;
