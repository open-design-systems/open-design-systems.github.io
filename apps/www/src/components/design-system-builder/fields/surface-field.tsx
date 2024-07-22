import {
  useFormContext,
  useFieldArray,
  Controller,
  useWatch,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { RemoveDialog } from "../remove-dialog";
import { MetaField } from "./meta-field";
import { RefField } from "./ref-field";

export const SurfaceField = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "surface",
  });

  return (
    <div className="grid gap-4">
      {fields.map((field, index) => (
        <div className="gap-4 p-4 border-2 border-dotted" key={field.id}>
          <div className="grid gap-2 mb-2">
            <MetaField field={`surface.${index}`} />
            <RefField
              name={`surface.${index}.borderColor`}
              refType="colors"
              label="Border Color"
            />
            <Controller
              name={`surface.${index}.borderRadius`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Border Radius</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    step="1"
                    placeholder="Border Radius"
                  />
                </>
              )}
            />
            <Controller
              name={`surface.${index}.borderWidth`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Border Width</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    step="1"
                    placeholder="Border Width"
                  />
                </>
              )}
            />
            <RefField
              name={`surface.${index}.boxShadow`}
              refType="shadows"
              label="Box Shadow"
            />
            <RefField
              name={`surface.${index}.backgroundColor`}
              refType="colors"
              label="Background Color"
            />
          </div>
          <RemoveDialog
            text={"Remove"}
            onRemove={() => remove(index)}
            element={{ name: "surface" }}
          />
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            meta: { name: "", description: "", id: nanoid() },
            borderColor: { $ref: "", $refType: "colors" },
            borderRadius: 0,
            borderWidth: 0,
            boxShadow: { $ref: "", $refType: "shadows" },
            backgroundColor: { $ref: "", $refType: "colors" },
          })
        }
      >
        Add Surface
      </Button>
    </div>
  );
};
