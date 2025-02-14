// components/drivers/AddChauffeur/WorkData.tsx
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // Assurez-vous d'importer Input
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const WorkData = ({ form }) => {
  return (
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
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
        "dimanche",
      ].map((day, index) => {
        const dayMapping = [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ];
        return (
          <FormField
            key={day}
            control={form.control}
            name={`works_${dayMapping[index]}`}
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
        );
      })}

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
          defaultValue={true}
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
            defaultValue={true}
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
            defaultValue={true}
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
            defaultValue={true}
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
          defaultValue={true}
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
  );
};

export default WorkData;
