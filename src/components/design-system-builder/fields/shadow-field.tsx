import {
  useFormContext,
  useFieldArray,
  Controller,
  useWatch,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RemoveDialog } from "../remove-dialog";
import { nanoid } from "nanoid";

export const ShadowsField = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "shadows",
  });

  const colors = useWatch({
    control,
    name: "colors",
  });

  return (
    <div className="grid gap-4">
      {fields.map((field, index) => (
        <div className="gap-4 p-4 border-2 border-dotted" key={field.id}>
          <div className="grid gap-2 mb-2">
            <Controller
              name={`shadows.${index}.meta.name`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Shadow Name</FormLabel>
                  <Input {...field} placeholder="Name" />
                </>
              )}
            />
            <Controller
              name={`shadows.${index}.meta.description`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Description</FormLabel>
                  <Input {...field} placeholder="Description" />
                </>
              )}
            />
            <Controller
              name={`shadows.${index}.elevation`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Elevation</FormLabel>
                  <Input {...field} placeholder="Elevation" />
                </>
              )}
            />
            <Controller
              name={`shadows.${index}.shadowColor`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Shadow Color</FormLabel>
                  <select
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {colors.map((color: any, idx: number) => (
                      <option key={idx} value={`colors.${color.meta.name}`}>
                        {color.meta.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
            <Controller
              name={`shadows.${index}.shadowOpacity`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Shadow Opacity</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    placeholder="Shadow Opacity"
                  />
                </>
              )}
            />
            <div className="flex space-x-4">
              <Controller
                name={`shadows.${index}.shadowOffset.width`}
                control={control}
                render={({ field }) => (
                  <>
                    <FormLabel>Shadow Offset Width</FormLabel>
                    <Input {...field} type="number" placeholder="Width" />
                  </>
                )}
              />
              <Controller
                name={`shadows.${index}.shadowOffset.height`}
                control={control}
                render={({ field }) => (
                  <>
                    <FormLabel>Shadow Offset Height</FormLabel>
                    <Input {...field} type="number" placeholder="Height" />
                  </>
                )}
              />
            </div>
            <Controller
              name={`shadows.${index}.shadowRadius`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Shadow Radius</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    step="0.1"
                    placeholder="Shadow Radius"
                  />
                </>
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
            shadowColor: "",
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
