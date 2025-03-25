import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PersonalData from "@/components/drivers/AddChauffeur/PersonalData";
import WorkData from "@/components/drivers/AddChauffeur/WorkData";
import UploadingData from "@/components/drivers/AddChauffeur/UploadingData";
import FullScreenLoader from "@/components/drivers/AddChauffeur/FullScreenLoader";

const AddChauffeurForm = () => {
  const form = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true); // ✅ Active le loader
    const startTime = Date.now(); // ⏱ Capture du temps de début

    try {
      const formData = new FormData();

      // ✅ Convertit correctement les valeurs booléennes
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          formData.append(key, value ? "true" : "false");
        } else if (typeof value === "string") {
          formData.append(key, value);
        }
      });

      // ✅ Gestion des fichiers
      const fileFields = [
        "id_card",
        "driver_license_photo",
        "bank_card_photo",
        "contract_photo",
        "photo_chauffeur",
      ];
      fileFields.forEach((field) => {
        if (data[field] instanceof FileList && data[field].length > 0) {
          formData.append(field, data[field][0]);
        }
      });

      // ✅ Récupération du token
      const token = localStorage.getItem("token");
      if (!token)
        throw new Error("❌ Authentification échouée : Aucun token trouvé.");

      console.log("🔑 Envoi de la requête avec le token :", token);

      // ✅ Envoi de la requête API
      const response = await fetch("http://localhost:3000/chauffeurs", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `❌ Erreur HTTP ! Statut: ${response.status}. Réponse: ${errorText}`
        );
      }

      const result = await response.json();
      toast.success("🚗 Chauffeur ajouté avec succès !");
      form.reset(); // ✅ Reset du formulaire

      // ✅ Redirection après succès
      navigate("/drivers", { state: { newDriver: result } });
    } catch (error) {
      console.error("❌ Échec de l'ajout du chauffeur :", error);
      toast.error(
        "❌ Erreur lors de l'ajout du chauffeur. Veuillez réessayer."
      );
    } finally {
      // ✅ Attendre un minimum de 5 secondes avant de désactiver le loader
      const elapsedTime = Date.now() - startTime;
      const minDuration = 5000; // ⏳ Durée minimale du loader en ms

      setTimeout(
        () => setIsLoading(false),
        Math.max(0, minDuration - elapsedTime)
      );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-center md:text-left">
            Ajouter un Chauffeur
          </h1>
          <Button
            onClick={() => navigate("/drivers")}
            className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm"
          >
            Retour
          </Button>
        </motion.div>

        <hr className="hr-light-effect mb-10" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Form {...form}>
            <div>
              {/* ✅ Loader en plein écran */}
              <FullScreenLoader isLoading={isLoading} />

              {/* ✅ Formulaire */}
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PersonalData form={form} />
                  <WorkData form={form} />
                </div>
                <div className="mt-6">
                  <UploadingData form={form} />
                </div>
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
      </main>
    </div>
  );
};

export default AddChauffeurForm;
