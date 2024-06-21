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

export const SurfaceField = () => {
  const { control } = useFormContext();

  const colors = useWatch({
    control,
    name: "colors",
  });

  const shadows = useWatch({
    control,
    name: "shadows",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "surface",
  });

  return (
    <div className="grid gap-4">
      {fields.map((field, index) => (
        <div className="gap-4 p-4 border-2 border-dotted" key={field.id}>
          <div className="grid gap-2 mb-2">
            <Controller
              name={`surface.${index}.meta.name`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Surface Name</FormLabel>
                  <Input {...field} placeholder="Name" />
                </>
              )}
            />
            <Controller
              name={`surface.${index}.meta.description`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Description</FormLabel>
                  <Input {...field} placeholder="Description" />
                </>
              )}
            />
            <Controller
              name={`surface.${index}.borderColor`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Border Color</FormLabel>
                  <select
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {colors.map((color: any, idx: number) => (
                      <option key={idx} value={color.meta.id}>
                        {color.meta.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
            <Controller
              name={`surface.${index}.borderRadius`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Border Radius (px)</FormLabel>
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
                  <FormLabel>Border Width (px)</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    step="1"
                    placeholder="Border Width"
                  />
                </>
              )}
            />
            <Controller
              name={`surface.${index}.boxShadow`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Box Shadow</FormLabel>
                  <select
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {shadows.map((shadow: any, idx: number) => (
                      <option key={idx} value={shadow.meta.id}>
                        {shadow.meta.name}
                      </option>
                    ))}
                  </select>
                  <Input {...field} placeholder="Box Shadow" />
                </>
              )}
            />
            <Controller
              name={`surface.${index}.backgroundColor`}
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Background Color</FormLabel>
                  <select
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {colors.map((color: any, idx: number) => (
                      <option key={idx} value={color.meta.id}>
                        {color.meta.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
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
            borderColor: "",
            borderRadius: 0,
            borderWidth: 0,
            boxShadow: "",
            backgroundColor: "",
          })
        }
      >
        Add Surface
      </Button>
    </div>
  );
};
