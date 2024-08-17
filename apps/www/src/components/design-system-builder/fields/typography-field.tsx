import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RemoveDialog } from "../remove-dialog";
import { nanoid } from "nanoid";
import { MetaField } from "./meta-field";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const popularFonts = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Oswald",
  "Raleway",
  "Poppins",
  "Merriweather",
  "Ubuntu",
  "Nunito",
];

const fontWeights = [
  { label: "Thin", value: "100" },
  { label: "Extra Light", value: "200" },
  { label: "Light", value: "300" },
  { label: "Regular", value: "400" },
  { label: "Medium", value: "500" },
  { label: "Semi Bold", value: "600" },
  { label: "Bold", value: "700" },
  { label: "Extra Bold", value: "800" },
  { label: "Black", value: "900" },
];

export const TypographyField = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "typography",
  });

  return (
    <div className="grid gap-4">
      {fields.map((field, index) => (
        <div className="gap-4 p-4 border-2 border-dotted" key={field.id}>
          <div className="grid gap-2 mb-2">
            <MetaField field={`typography.${index}`} />
          </div>
          <div className="grid gap-2 mb-2">
            <FormField
              name={`typography.${index}.fontFamily`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Font Family</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {popularFonts.map((font) => (
                        <SelectItem key={font} value={font}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                name={`typography.${index}.fontSize`}
                control={control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 flex-1">
                    <FormLabel>Font Size</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="1"
                        placeholder="Font Size"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`typography.${index}.fontWeight`}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Font Weight</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={`${field.value}`}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fontWeights.map((weight) => (
                          <SelectItem key={weight.value} value={weight.value}>
                            {weight.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                name={`typography.${index}.lineHeight`}
                control={control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 flex-1">
                    <FormLabel>Line Height</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.1"
                        placeholder="Line Height"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`typography.${index}.letterSpacing`}
                control={control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 flex-1">
                    <FormLabel>Letter Spacing</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        placeholder="Letter Spacing"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <RemoveDialog
            text={"Remove"}
            onRemove={() => remove(index)}
            element={{ name: "typography" }}
          />
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            meta: { name: "", description: "", id: nanoid() },
            fontFamily: "",
            fontSize: "",
            fontWeight: "",
            lineHeight: "",
            letterSpacing: "",
          })
        }
      >
        Add Typography
      </Button>
    </div>
  );
};
