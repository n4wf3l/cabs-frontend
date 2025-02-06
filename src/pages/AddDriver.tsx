import { Sidebar } from "@/components/dashboard/Sidebar";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

type DriverFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  employer: string;
  birthPlace: string;
  birthDate: string;
  address: string;
  country: string;
  nationalId: string;
  nationality: string;
  idCardPhoto: File | null;
  licensePhoto: File | null;
  bankCardPhoto: File | null;
  contractPhoto: File | null;
  startDate: string;
  description: string;
  workDays: string[];
  shift: string;
  formula: string;
  carPlate: string;
  paymentMethods: {
    [key: string]: boolean;
  };
};

const paymentRates = {
  "Carte bancaire": 2.5,
  "Cheque Papier": 2.5,
  Espèce: 0,
  "Bolt App": 20,
  "Bolt Cash": 20,
  "Bolt carte bancaire": 22.5,
  "Heetch App": 18,
  "Heetch Cash": 18,
  "Heetch Carte bancaire": 20.5,
  "Uber App": 27.5,
  "Uber Cash": 25,
  "Uber Carte bancaire": 18,
  "Taxi vert Cash": 0,
  "Taxi vert APP": 2.5,
  "Taxi vert Carte bancaire": 2.5,
};

const daysOfWeek = [
  { label: "Lundi", value: "lundi" },
  { label: "Mardi", value: "mardi" },
  { label: "Mercredi", value: "mercredi" },
  { label: "Jeudi", value: "jeudi" },
  { label: "Vendredi", value: "vendredi" },
  { label: "Samedi", value: "samedi" },
  { label: "Dimanche", value: "dimanche" },
];
const AddDriverForm = () => {
  const form = useForm<DriverFormData>();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const onSubmit = (data: DriverFormData) => {
    console.log(data);
    toast.success("Driver added successfully!");
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof DriverFormData
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue(field as any, file);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full">
        <h1 className="text-2xl font-bold mb-8">Ajouter un Chauffeur</h1>
        <hr className="mb-10"></hr>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Informations personnelles
                </h3>

                <FormField
                  control={form.control}
                  name="firstName"
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
                  name="lastName"
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
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
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
              </div>

              {/* Role and Employment */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Role & Employment</h3>

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rôle</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="driver">
                            Chauffeur de Taxi
                          </SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Gestionnaire</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employer"
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
                  name="startDate"
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
              </div>

              {/* Birth and Nationality */}
              <div className="space-y-4 mt-20">
                <h3 className="text-lg font-semibold">Birth & Nationality</h3>

                <FormField
                  control={form.control}
                  name="birthPlace"
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
                  name="birthDate"
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
                  name="nationalId"
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
              </div>

              {/* Address */}
              <div className="space-y-4 mt-20">
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
                <div className="space-y-4">
                  {" "}
                  {/* Existing Shift and Formula fields */}
                  {/* Days of the Week Checkboxes */}
                  <div className="space-y-2 mb-20">
                    <h4 className="font-semibold">Jours de travail</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {daysOfWeek.map((day) => (
                        <div
                          key={day.value}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={day.value}
                            className="rounded border-gray-300"
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              if (isChecked) {
                                // Add the day to the selectedDays array
                                setSelectedDays((prev) => [...prev, day.value]);
                                form.setValue("workDays", [
                                  ...selectedDays,
                                  day.value,
                                ]);
                              } else {
                                // Remove the day from the selectedDays array
                                setSelectedDays((prev) =>
                                  prev.filter((d) => d !== day.value)
                                );
                                form.setValue(
                                  "workDays",
                                  selectedDays.filter((d) => d !== day.value)
                                );
                              }
                            }}
                          />
                          <Label htmlFor={day.value}>{day.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Documents</h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="idCardPhoto">Carte d'identité</Label>
                    <Input
                      id="idCardPhoto"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "idCardPhoto")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="licensePhoto">Permis de conduire</Label>
                    <Input
                      id="licensePhoto"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "licensePhoto")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bankCardPhoto">Carte bancaire</Label>
                    <Input
                      id="bankCardPhoto"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "bankCardPhoto")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contractPhoto">Contrat</Label>
                    <Input
                      id="contractPhoto"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "contractPhoto")}
                    />
                  </div>
                </div>
              </div>

              {/* Work Schedule */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Work Schedule</h3>

                <FormField
                  control={form.control}
                  name="shift"
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
                            <RadioGroupItem value="day" id="day" />
                            <Label htmlFor="day">JOUR</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="night" id="night" />
                            <Label htmlFor="night">NUIT</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="long" id="long" />
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
                  name="formula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Formule</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select formula" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="50/50">50/50</SelectItem>
                          <SelectItem value="forfait">Forfait</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="carPlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voiture (Plaque)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter car plate number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Payment Methods */}
              <div className="space-y-4 col-span-full mt-20">
                <h3 className="text-lg font-semibold">Payment Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(paymentRates).map(([method, rate]) => (
                    <div key={method} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={method}
                        className="rounded border-gray-300"
                        onChange={(e) =>
                          form.setValue(
                            `paymentMethods.${method}`,
                            e.target.checked
                          )
                        }
                      />
                      <Label htmlFor={method}>
                        {method} ({rate}%)
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter important information"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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

export default AddDriverForm;
