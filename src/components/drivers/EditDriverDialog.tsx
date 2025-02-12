import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { updateChauffeur } from "@/api/chauffeurs"; // ✅ Import API function
import { Textarea } from "../ui/textarea";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface EditDriverDialogProps {
  driver: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (updatedDriver: any) => void; // ✅ Callback to update list
}

export const EditDriverDialog = ({ driver, open, onOpenChange, onEdit }: EditDriverDialogProps) => {
  const form = useForm({ defaultValues: driver });
  const { control, register, handleSubmit, reset } = form;

  useEffect(() => {
    if (driver) {
      console.log("Driver data:", driver);
      form.reset(driver); // ✅ Pre-fill form fields
    }
  }, [driver, form]);

  const onSubmit = async (data: any) => {
    try {
      const updatedData = {
        ...data,
        works_monday: data.works_monday ?? false,
        works_tuesday: data.works_tuesday ?? false,
        works_wednesday: data.works_wednesday ?? false,
        works_thursday: data.works_thursday ?? false,
        works_friday: data.works_friday ?? false,
        works_saturday: data.works_saturday ?? false,
        works_sunday: data.works_sunday ?? false,
      };
  
      console.log("🚀 Submitting Data (before FormData conversion):", updatedData);
  
      // Convert to FormData
      const formData = new FormData();
      Object.keys(updatedData).forEach((key) => {
        const value = updatedData[key];
  
        // Ensure we only append the first file from a FileList
        if (value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]); // Take the first file
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value)); // Convert null to empty string
        }
      });
  
      // Debugging: Log the formData contents
      console.log("📦 Submitting FormData Content:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
  
      const updatedDriver = await updateChauffeur(driver.id, formData);
      toast.success("Chauffeur mis à jour avec succès!");
      onEdit(updatedDriver);
      onOpenChange(false);
    } catch (error) {
      console.error("❌ Failed to update chauffeur:", error);
      toast.error("Erreur lors de la mise à jour du chauffeur.");
    }
  };
  
  
  
  
  const documents = [
    { name: "id_card", label: "Carte d'identité" },
    { name: "driver_license_photo", label: "Permis de conduire" },
    { name: "bank_card_photo", label: "Carte bancaire" },
    { name: "contract_photo", label: "Contrat" },
  ];

  if (!driver) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le chauffeur</DialogTitle>
          <DialogDescription>Mettez à jour les informations du chauffeur.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
      <h3 className="text-lg font-semibold">Informations personnelles</h3>
      <FormField
        control={form.control}
        name="first_name"
        rules={{ required: "Le prénom est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Prénom</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le prénom" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />{" "}
            {/* Message d'erreur en rouge */}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="last_name"
        rules={{ required: "Le nom est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Nom</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le nom" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />{" "}
            {/* Message d'erreur en rouge */}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        rules={{ required: "L'email est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Entrez l'email" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />{" "}
            {/* Message d'erreur en rouge */}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        rules={{ required: "Le numéro de téléphone est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Téléphone</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le numéro de téléphone" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />{" "}
            {/* Message d'erreur en rouge */}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="company_id"
        rules={{ required: "L'employeur est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Employeur</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le nom de l'employeur" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="start_date"
        rules={{ required: "La date d'entrée est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Date d'entrée</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
          <FormField
        control={form.control}
        name="end_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Date de Fin</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Birth and Nationality */}
      <FormField
        control={form.control}
        name="birth_place"
        rules={{ required: "Le lieu de naissance est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Lieu de naissance</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le lieu de naissance" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />{" "}
            {/* Message d'erreur en rouge */}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="birth_date"
        rules={{ required: "La date de naissance est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Date de naissance</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />{" "}
            {/* Message d'erreur en rouge */}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nationality"
        rules={{ required: "La nationalité est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Nationalité</FormLabel>
            <FormControl>
              <Input placeholder="Entrez la nationalité" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />{" "}
            {/* Message d'erreur en rouge */}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="national_id"
        rules={{
          required: "Le numéro d'identification national est obligatoire",
        }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">
              N° identification national
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Entrez le numéro d'identification national"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />{" "}
            {/* Message d'erreur en rouge */}
          </FormItem>
        )}
      />
      {/* Address */}
      <FormField
        control={form.control}
        name="address"
        rules={{ required: "L'adresse est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Adresse</FormLabel>
            <FormControl>
              <Textarea placeholder="Entrez l'adresse" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />{" "}
            {/* Message d'erreur en rouge */}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="country"
        rules={{ required: "Le pays est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Pays</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le pays" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />{" "}
            {/* Message d'erreur en rouge */}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="extra_info"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Description informations importante</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />{" "}
            {/* Message d'erreur en rouge */}
          </FormItem>
        )}
      />
    </div>
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
      render={({ field }) => {
        // Determine if the field contains a URL (from Supabase) or a File (newly selected)
        const imageUrl =
          field.value instanceof File
            ? URL.createObjectURL(field.value) // Preview for new file
            : driver?.[doc.name] ?? null; // Existing Supabase URL

        return (
          <FormItem className="flex flex-col space-y-2">
            <FormLabel htmlFor={doc.name}>{doc.label}</FormLabel>

            {/* ✅ Show image preview if available */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt={`${doc.label} Preview`}
                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
            )}

            <FormControl>
              <Input
                id={doc.name}
                type="file"
                accept="image/*"
                {...register(doc.name)}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    field.onChange(file);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  ))}
</motion.div>

    <div className="space-y-4">
      {/* Work Schedule */}
      <h3 className="text-lg font-semibold">Horaires de travail</h3>
      <FormField
        control={form.control}
        name="shift_type"
        rules={{ required: "Le type de shift est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Type de shift</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Day" id="day" />
                  <FormLabel className="text-white" htmlFor="day">
                    JOUR
                  </FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Night" id="night" />
                  <FormLabel className="text-white" htmlFor="night">
                    NUIT
                  </FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Long" id="long" />
                  <FormLabel className="text-white" htmlFor="long">
                    LONGUE
                  </FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="work_formula"
        rules={{ required: "La formule de travail est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Formule</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une formule" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="50/50">50/50</SelectItem>
                <SelectItem value="Forfait">Forfait</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Days of the Week Checkboxes */}
      <h3 className="text-lg font-semibold">Journée de travail</h3>
      {[
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((day) => (
        <FormField
          key={day}
          control={form.control}
          name={`works_${day}`}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value === true}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
              </FormControl>
              <FormLabel className="font-normal">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </FormLabel>
            </FormItem>
          )}
        />
      ))}
      {/* Payment Preferences */}
      <h3 className="text-lg font-semibold">Préférences de paiement</h3>
      {/* General Payment Methods */}
      {[
        "accepts_card_payment",
        "accepts_check_payment",
        "accepts_cash_payment",
      ].map((paymentMethod) => (
        <FormField
          key={paymentMethod}
          control={form.control}
          name={paymentMethod}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value === true}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
              </FormControl>
              <FormLabel className="font-normal">
                {paymentMethod
                  .replace(/_/g, " ")
                  .replace("accepts ", "Accepte ")}
              </FormLabel>
            </FormItem>
          )}
        />
      ))}
      {/* Bolt Payment Methods */}
      <h4 className="text-md font-medium mt-4">Bolt</h4>
      {["accepts_bolt_app", "accepts_bolt_cash", "accepts_bolt_card"].map(
        (paymentMethod) => (
          <FormField
            key={paymentMethod}
            control={form.control}
            name={paymentMethod}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  {paymentMethod
                    .replace(/_/g, " ")
                    .replace("accepts ", "Accepte ")}
                </FormLabel>
              </FormItem>
            )}
          />
        )
      )}
      {/* Heetch Payment Methods */}
      <h4 className="text-md font-medium mt-4">Heetch</h4>
      {["accepts_heetch_app", "accepts_heetch_cash", "accepts_heetch_card"].map(
        (paymentMethod) => (
          <FormField
            key={paymentMethod}
            control={form.control}
            name={paymentMethod}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  {paymentMethod
                    .replace(/_/g, " ")
                    .replace("accepts ", "Accepte ")}
                </FormLabel>
              </FormItem>
            )}
          />
        )
      )}
      {/* Uber Payment Methods */}
      <h4 className="text-md font-medium mt-4">Uber</h4>
      {["accepts_uber_app", "accepts_uber_cash", "accepts_uber_card"].map(
        (paymentMethod) => (
          <FormField
            key={paymentMethod}
            control={form.control}
            name={paymentMethod}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  {paymentMethod
                    .replace(/_/g, " ")
                    .replace("accepts ", "Accepte ")}
                </FormLabel>
              </FormItem>
            )}
          />
        )
      )}
      {/* Taxi Vert Payment Methods */}
      <h4 className="text-md font-medium mt-4">Taxi Vert</h4>
      {[
        "accepts_taxi_vert_cash",
        "accepts_taxi_vert_app",
        "accepts_taxi_vert_card",
      ].map((paymentMethod) => (
        <FormField
          key={paymentMethod}
          control={form.control}
          name={paymentMethod}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value === true}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
              </FormControl>
              <FormLabel className="font-normal">
                {paymentMethod
                  .replace(/_/g, " ")
                  .replace("accepts ", "Accepte ")}
              </FormLabel>
            </FormItem>
          )}
        />
      ))}
    </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">Enregistrer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
