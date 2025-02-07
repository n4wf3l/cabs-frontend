// components/drivers/AddChauffeur/PersonalData.tsx
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PersonalData = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Informations personnelles</h3>
      <FormField
        control={form.control}
        name="first_name"
        rules={{ required: "Le prénom est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prénom</FormLabel>
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
            <FormLabel>Nom</FormLabel>
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
            <FormLabel>Email</FormLabel>
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
            <FormLabel>Téléphone</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le numéro de téléphone" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />{" "}
            {/* Message d'erreur en rouge */}
          </FormItem>
        )}
      />
      {/* Birth and Nationality */}
      <h3 className="text-lg font-semibold">Naissance & Nationalité</h3>
      <FormField
        control={form.control}
        name="birth_place"
        rules={{ required: "Le lieu de naissance est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lieu de naissance</FormLabel>
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
            <FormLabel>Date de naissance</FormLabel>
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
            <FormLabel>Nationalité</FormLabel>
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
            <FormLabel>N° identification national</FormLabel>
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
      <h3 className="text-lg font-semibold">Adresse</h3>
      <FormField
        control={form.control}
        name="address"
        rules={{ required: "L'adresse est obligatoire" }} // Validation
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse</FormLabel>
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
            <FormLabel>Pays</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le pays" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />{" "}
            {/* Message d'erreur en rouge */}
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalData;
