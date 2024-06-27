import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RemoveDialog } from "../remove-dialog";
import { nanoid } from "nanoid";
import { MetaField } from "./meta-field";
import { FormLabel } from "@/components/ui/form";

export const SpacingField = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "spacing",
  });

  return (
    <div className="grid gap-4">
      {fields.map((field, index) => (
        <div className="gap-4 p-4 border-2 border-dotted" key={field.id}>
          <div className="grid gap-2 mb-2">
            <MetaField field={`spacing.${index}`} />
            <Controller
              name={`spacing.${index}.value`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Value</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    step="1"
                    placeholder="Value"
                  />
                </>
              )}
            />
          </div>
          <RemoveDialog
            text={"Remove"}
            onRemove={() => remove(index)}
            element={{ name: "spacing" }}
          />
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            meta: { name: "", description: "", id: nanoid() },
            value: "",
          })
        }
      >
        Add Spacing
      </Button>
    </div>
  );
};
