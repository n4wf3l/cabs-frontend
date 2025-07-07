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


  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold">Documents</h3>
      <FormField
          key="id_card"
          control={control}
          name="id_card"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="id_card">Carte d'identité</FormLabel>
              <FormControl>
                <Input
                  id="id_card"
                  type="file"
                  accept="image/*"
                  {...register("id_card")}
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          key="driver_license_photo"
          control={control}
          name="driver_license_photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="driver_license_photo">Permis de conduire</FormLabel>
              <FormControl>
                <Input
                  id="driver_license_photo"
                  type="file"
                  accept="image/*"
                  {...register("driver_license_photo")}
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
               <FormField
          key="bank_card_photo"
          control={control}
          name="bank_card_photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="bank_card_photo">Carte bancaire</FormLabel>
              <FormControl>
                <Input
                  id="bank_card_photo"
                  type="file"
                  accept="image/*"
                  {...register("bank_card_photo")}
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
               <FormField
          key="contract_photo"
          control={control}
          name="contract_photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="contract_photo">Contrat</FormLabel>
              <FormControl>
                <Input
                  id="contract_photo"
                  type="file"
                  accept="image/*"
                  {...register("contract_photo")}
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          key="photo_chauffeur"
          control={control}
          name="photo_chauffeur"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="photo_chauffeur">Photo Chauffeur</FormLabel>
              <FormControl>
                <Input
                  id="photo_chauffeur"
                  type="file"
                  accept="image/*"
                  {...register("photo_chauffeur")}
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
    </motion.div>
  );
};

export default UploadingData;
