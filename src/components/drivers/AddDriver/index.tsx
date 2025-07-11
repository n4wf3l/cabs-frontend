import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../FullScreenLoader";

// Ajoute ces props
interface AddDriverFormProps {
  onCancel?: () => void;
  onSuccess?: (data: any) => void;
}

export const AddDriverForm = ({ onCancel, onSuccess }: AddDriverFormProps) => {
  const form = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Données soumises:", data);
      toast.success("🚗 Chauffeur ajouté avec succès !");
      form.reset();

      // Utilise le callback au lieu de naviguer
      if (onSuccess) {
        onSuccess({ id: "new-id", ...data });
      }
    } catch (error) {
      console.error("❌ Échec de l'ajout du chauffeur :", error);
      toast.error(
        "❌ Erreur lors de l'ajout du chauffeur. Veuillez réessayer."
      );
    } finally {
      const elapsedTime = Date.now() - startTime;
      const minDuration = 5000;

      setTimeout(
        () => setIsLoading(false),
        Math.max(0, minDuration - elapsedTime)
      );
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Form {...form}>
          <div>
            <FullScreenLoader isLoading={isLoading} />

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
   
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? "Ajout en cours..." : "Ajouter le chauffeur"}
                </button>
              </div>
            </form>
          </div>
        </Form>
      </motion.div>
    </>
  );
};
