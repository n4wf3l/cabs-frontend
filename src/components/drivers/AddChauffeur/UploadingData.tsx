import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";

// Définition des props attendues
interface UploadingDataProps {
  form: UseFormReturn<any>;
}

const UploadingData = ({ form }: UploadingDataProps) => {
  const { control, register } = form;

  const documents = [
    { name: "id_card", label: "Carte d'identité" },
    { name: "driver_license_photo", label: "Permis de conduire" },
    { name: "bank_card_photo", label: "Carte bancaire" },
    { name: "contract_photo", label: "Contrat" },
  ];

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold">Documents</h3>
      {documents.map((doc) => (
        <FormField
          key={doc.name}
          control={control}
          name={doc.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={doc.name}>{doc.label}</FormLabel>
              <FormControl>
                <Input
                  id={doc.name}
                  type="file"
                  accept="image/*"
                  {...register(doc.name)}
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </motion.div>
  );
};

export default UploadingData;
