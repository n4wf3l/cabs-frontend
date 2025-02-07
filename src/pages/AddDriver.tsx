import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Checkbox } from "@/components/ui/checkbox";


const AddChauffeurForm = () => {
  const form = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    // Append text fields
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false"); // ✅ Keeps it boolean-like
      } else if (typeof value === "string") {
        formData.append(key, value);
      }
    });

    // Append files
    const fileFields = ["id_card", "driver_license_photo", "bank_card_photo", "contract_photo"];
    fileFields.forEach((field) => {
      if (data[field] instanceof FileList && data[field].length > 0) {
        formData.append(field, data[field][0]);
      }
    });

    try {
      const response = await fetch("http://localhost:3000/chauffeurs", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
      }

      const result = await response.json();
      toast.success("Chauffeur ajouté avec succès!");
      form.reset();
    } catch (error) {
      console.error("Failed to submit form:", error);
      toast.error("Erreur lors de l'ajout du chauffeur.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full">
        <motion.h1
          className="text-2xl font-bold mb-8 text-center md:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ajouter un Chauffeur
        </motion.h1>
        <hr className="mb-10" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold">Informations personnelles</h3>
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Role and Employment */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FormField
                  control={form.control}
                  name="company_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employeur</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter employer name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date d'entrée</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Birth and Nationality */}
              <motion.div
                className="space-y-4 mt-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold">Birth & Nationality</h3>
                <FormField
                  control={form.control}
                  name="birth_place"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lieu de naissance</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter birth place" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birth_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de naissance</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationalité</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter nationality" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="national_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N° identification national</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter national ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Address */}
              <motion.div
                className="space-y-4 mt-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold">Address</h3>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pays</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Days of the Week Checkboxes */}
              <motion.div
  className="space-y-4"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.8 }} // Adjusted delay for proper sequencing
>
<h3 className="text-lg font-semibold">Journee de travail</h3>
<FormField
  control={form.control}
  name="works_monday"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value === true} // Ensure it's explicitly a boolean
          onCheckedChange={(checked) => field.onChange(!!checked)} // Convert to boolean explicitly
        />
      </FormControl>
      <FormLabel className="font-normal">Lundi</FormLabel>
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="works_tuesday"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value === true} // Ensure it's explicitly a boolean
          onCheckedChange={(checked) => field.onChange(!!checked)} // Convert to boolean explicitly
        />
      </FormControl>
      <FormLabel className="font-normal">Mardi</FormLabel>
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="works_wednesday"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value === true} // Ensure it's explicitly a boolean
          onCheckedChange={(checked) => field.onChange(!!checked)} // Convert to boolean explicitly
        />
      </FormControl>
      <FormLabel className="font-normal">Mercredi</FormLabel>
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="works_thursday"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value === true} // Ensure it's explicitly a boolean
          onCheckedChange={(checked) => field.onChange(!!checked)} // Convert to boolean explicitly
        />
      </FormControl>
      <FormLabel className="font-normal">Jeudi</FormLabel>
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="works_friday"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value === true} // Ensure it's explicitly a boolean
          onCheckedChange={(checked) => field.onChange(!!checked)} // Convert to boolean explicitly
        />
      </FormControl>
      <FormLabel className="font-normal">Vendredi</FormLabel>
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="works_saturday"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value === true} // Ensure it's explicitly a boolean
          onCheckedChange={(checked) => field.onChange(!!checked)} // Convert to boolean explicitly
        />
      </FormControl>
      <FormLabel className="font-normal">Samedi</FormLabel>
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="works_sunday"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value === true} // Ensure it's explicitly a boolean
          onCheckedChange={(checked) => field.onChange(!!checked)} // Convert to boolean explicitly
        />
      </FormControl>
      <FormLabel className="font-normal">Dimanche</FormLabel>
    </FormItem>
  )}
/>


</motion.div>
  <h3 className="text-lg font-semibold">Payment Preferences</h3>

              {/* Documents Upload */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold">Documents</h3>
                <div className="space-y-4">
                  {["id_card", "driver_license_photo", "bank_card_photo", "contract_photo"].map((field) => (
                    <div key={field}>
                      <Label htmlFor={field}>{field.replace(/_/g, " ")}</Label>
                      <Input
                        id={field}
                        type="file"
                        accept="image/*"
                        {...form.register(field)}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Work Schedule */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold">Work Schedule</h3>
                <FormField
                  control={form.control}
                  name="shift_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shift</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Day" id="day" />
                            <Label htmlFor="day">JOUR</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Night" id="night" />
                            <Label htmlFor="night">NUIT</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Long" id="long" />
                            <Label htmlFor="long">LONGUE</Label>
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Formule</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select formula" />
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
               
              </motion.div>

              {/* Payment Methods */}
              <motion.div
  className="space-y-4"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.8 }} // Adjusted delay for proper sequencing
>
  <h3 className="text-lg font-semibold">Payment Preferences</h3>

  {/* General Payment Methods */}
  <FormField
  control={form.control}
  name="accepts_card_payment"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value === true} // Ensure it's explicitly a boolean
          onCheckedChange={(checked) => field.onChange(!!checked)} // Convert to boolean explicitly
        />
      </FormControl>
      <FormLabel className="font-normal">Accepts Card Payment</FormLabel>
    </FormItem>
  )}
/>
  <FormField
    control={form.control}
    name="accepts_check_payment"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Check Payment</FormLabel>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="accepts_cash_payment"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Cash Payment</FormLabel>
      </FormItem>
    )}
  />

  {/* Bolt Payment Methods */}
  <h4 className="text-md font-medium mt-4">Bolt</h4>
  <FormField
    control={form.control}
    name="accepts_bolt_app"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Bolt App</FormLabel>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="accepts_bolt_cash"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Bolt Cash</FormLabel>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="accepts_bolt_card"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Bolt Card</FormLabel>
      </FormItem>
    )}
  />

  {/* Heetch Payment Methods */}
  <h4 className="text-md font-medium mt-4">Heetch</h4>
  <FormField
    control={form.control}
    name="accepts_heetch_app"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Heetch App</FormLabel>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="accepts_heetch_cash"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Heetch Cash</FormLabel>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="accepts_heetch_card"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Heetch Card</FormLabel>
      </FormItem>
    )}
  />

  {/* Uber Payment Methods */}
  <h4 className="text-md font-medium mt-4">Uber</h4>
  <FormField
    control={form.control}
    name="accepts_uber_app"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Uber App</FormLabel>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="accepts_uber_cash"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Uber Cash</FormLabel>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="accepts_uber_card"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Uber Card</FormLabel>
      </FormItem>
    )}
  />

  {/* Taxi Vert Payment Methods */}
  <h4 className="text-md font-medium mt-4">Taxi Vert</h4>
  <FormField
    control={form.control}
    name="accepts_taxi_vert_cash"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Taxi Vert Cash</FormLabel>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="accepts_taxi_vert_app"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Taxi Vert App</FormLabel>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="accepts_taxi_vert_card"
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel className="font-normal">Accepts Taxi Vert Card</FormLabel>
      </FormItem>
    )}
  />
</motion.div>


              {/* Description */}
              <FormField
                  control={form.control}
                  name="extra_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Information Supplementaire</FormLabel>
                      <FormControl>
                        <Textarea placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
           
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="w-full md:w-auto">
                Add Driver
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default AddChauffeurForm;

