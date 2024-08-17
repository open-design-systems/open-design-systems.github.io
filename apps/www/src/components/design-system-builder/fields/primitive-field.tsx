import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { nanoid } from "nanoid";
import { RemoveDialog } from "../remove-dialog";
import { Button as UIButton } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RefField } from "./ref-field";
import { MetaField } from "./meta-field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
            <MetaField field={`primitives.${index}`} />
            <FormField
              name={`primitives.${index}.type`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
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
                      <SelectItem value="button">Button</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
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
