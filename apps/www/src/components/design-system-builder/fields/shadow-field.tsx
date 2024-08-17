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
import { RefField } from "./ref-field";

export const ShadowsField = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "shadows",
  });

  return (
    <div className="grid gap-4">
      {fields.map((field, index) => (
        <div className="gap-4 p-4 border-2 border-dotted" key={field.id}>
          <div className="grid gap-2 mb-2">
            <MetaField field={`shadows.${index}`} />
            <FormField
              name={`shadows.${index}.elevation`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Elevation</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Elevation" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <RefField
              name={`shadows.${index}.shadowColor`}
              refType="colors"
              label="Shadow Color"
            />
            <FormField
              name={`shadows.${index}.shadowOpacity`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shadow Opacity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      placeholder="Shadow Opacity"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <FormField
                name={`shadows.${index}.shadowOffset.width`}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shadow Offset Width</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Width" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`shadows.${index}.shadowOffset.height`}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shadow Offset Height</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Height" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name={`shadows.${index}.shadowRadius`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shadow Radius</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.1"
                      placeholder="Shadow Radius"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <RemoveDialog
            text={"Remove"}
            onRemove={() => remove(index)}
            element={{ name: "shadow" }}
          />
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            meta: { name: "", description: "", id: nanoid() },
            elevation: "",
            shadowColor: { $ref: "", $refType: "colors" },
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,
          })
        }
      >
        Add Shadow
      </Button>
    </div>
  );
};
