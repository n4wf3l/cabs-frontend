// components/drivers/AddChauffeur/PersonalData.tsx
import { fetchAdminById } from "@/api/admin";
import { useAuth } from "@/AuthContext";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

const PersonalData = ({ form }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [companyId, setCompanyId] = useState(""); // ✅ Store company_id
  const [loading, setLoading] = useState(true);

  // ✅ Get token from LocalStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); 
      const authUserId = decodedToken.sub; // Extract auth_user_id
      
  
      const fetchCompanyId = async () => {
        try {
          const response = await fetch(`http://localhost:3000/admins/auth/${authUserId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const adminData = await response.json();
          
  
          if (adminData && adminData.company_id) {
            setCompanyId(adminData.company_id); // ✅ Store company_id
          } else {
            console.warn("⚠️ No company_id found in response:", adminData);
          }
          
        } catch (error) {
          console.error("❌ Error fetching admin data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCompanyId();
    } catch (error) {
      console.error("❌ Error decoding token:", error);
      setLoading(false);
    }

      if (companyId) {
    form.setValue("company_id", companyId); // ✅ Update the form field programmatically
    form.trigger("company_id"); // ✅ Ensure validation is triggered
  }
  }, [companyId]);
  

  
  return (
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
        name="password"
        defaultValue=""
        render={({ field }) => (
          <FormItem className="flex flex-col space-y-2">
            <FormLabel className="font-normal">Mot de passe</FormLabel>
            <div className="relative">
              <FormControl>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez le mot de passe"
                  className="text-white"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
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
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-white">Employeur</FormLabel>
      <FormControl>
        <Input
          value={loading ? "Chargement..." : field.value || "Non défini"} 
          readOnly // Prevent manual changes
          {...field} // ✅ Ensure it's linked to the form
        />
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
  );
};

export default PersonalData;
