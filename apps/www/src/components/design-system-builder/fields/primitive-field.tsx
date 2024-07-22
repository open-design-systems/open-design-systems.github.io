import {
  useFormContext,
  useFieldArray,
  Controller,
  useWatch,
} from "react-hook-form";
import { nanoid } from "nanoid";
import { RemoveDialog } from "../remove-dialog";
import { Button as UIButton } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RefField } from "./ref-field";

export const PrimitivesField = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "primitives",
  });

  const primitives = useWatch({
    control,
    name: `primitives`,
  });

  return (
    <div className="grid gap-4">
      {fields.map((field, index) => (
        <div className="gap-4 p-4 border-2 border-dotted" key={field.id}>
          <div className="grid gap-2 mb-2">
            <Controller
              name={`primitives.${index}.meta.name`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Primitive Name</FormLabel>
                  <Input {...field} placeholder="Name" />
                </>
              )}
            />
            <Controller
              name={`primitives.${index}.meta.description`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Description</FormLabel>
                  <Input {...field} placeholder="Description" />
                </>
              )}
            />
            <Controller
              name={`primitives.${index}.type`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Type</FormLabel>
                  <select
                    {...field}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                  >
                    <option value="button">Button</option>
                    <option value="text">Text</option>
                  </select>
                </>
              )}
            />
            {primitives?.[index]?.type === "button" && (
              <>
                <RefField
                  name={`primitives.${index}.surfaceId`}
                  refType="surface"
                  label="Surface"
                />
                <RefField
                  name={`primitives.${index}.typographyId`}
                  refType="typography"
                  label="Typography"
                />

                <RefField
                  name={`primitives.${index}.spacingId`}
                  refType="spacing"
                  label="Spacing"
                />
              </>
            )}
            {primitives?.[index]?.type === "text" && (
              <>
                <RefField
                  name={`primitives.${index}.typographyId`}
                  refType="typography"
                  label="Typography"
                />
              </>
            )}
          </div>
          <RemoveDialog
            text={"Remove"}
            onRemove={() => remove(index)}
            element={{ name: "primitive" }}
          />
        </div>
      ))}
      <UIButton
        type="button"
        onClick={() =>
          append({
            meta: { name: "", description: "", id: nanoid() },
            type: "button",
            surfaceId: { $ref: "", $refType: "surface" },
            typographyId: { $ref: "", $refType: "typography" },
            spacingId: { $ref: "", $refType: "spacing" },
          })
        }
      >
        Add Primitive
      </UIButton>
    </div>
  );
};
