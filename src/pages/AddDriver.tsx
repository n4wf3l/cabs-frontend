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

const AddChauffeurForm = () => {
  const form = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true); // Activate loading state
  
    try {
      const formData = new FormData();
  
      // ✅ Convert boolean values correctly
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          formData.append(key, value ? "true" : "false");
        } else if (typeof value === "string") {
          formData.append(key, value);
        }
      });
  
      // ✅ Ensure file uploads work correctly
      const fileFields = [
        "id_card",
        "driver_license_photo",
        "bank_card_photo",
        "contract_photo",
      ];
      fileFields.forEach((field) => {
        if (data[field] instanceof FileList && data[field].length > 0) {
          formData.append(field, data[field][0]); // Add file
        }
      });
  
      // ✅ Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("❌ Authentication error: No token found.");
      }
  
      console.log("🔑 Sending request with token:", token); // ✅ Debugging
  
      // ✅ Send request with Authorization header
      const response = await fetch("http://localhost:3000/chauffeurs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Ensure authentication
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}. Response: ${errorText}`
        );
      }
  
      const result = await response.json();
      toast.success("🚗 Chauffeur ajouté avec succès!");
      form.reset(); // ✅ Reset form after success
  
      // ✅ Redirect to chauffeurs list after success
      navigate("/drivers", { state: { newDriver: result } });
    } catch (error) {
      console.error("❌ Failed to submit form:", error);
      toast.error("Erreur lors de l'ajout du chauffeur.");
    } finally {
      setIsLoading(false); // Disable loading state
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PersonalData form={form} />
                <WorkData form={form} />
              </div>
              <div className="mt-6">
                <UploadingData form={form} />
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  type="submit"
                  className="w-full md:w-auto"
                  disabled={isLoading}
                >
                  {isLoading ? "Ajout en cours..." : "Ajouter le chauffeur"}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </main>
    </div>
  );
};

export default AddChauffeurForm;
