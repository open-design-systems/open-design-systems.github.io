import {
    useFormContext,
    useFieldArray,
    Controller,
    useWatch,
  } from "react-hook-form";
  import { Input } from "@/components/ui/input";
  import { FormLabel } from "@/components/ui/form";
  import { Button as UIButton } from "@/components/ui/button";
  import { z } from "zod";
  import { primitivesSchema } from "../form-schema";
  import { nanoid } from "nanoid";
  
  export const PrimitivesField = () => {
    const { control, getValues, setValue } = useFormContext();
    const { fields, append } = useFieldArray({
      control,
      name: "primitives",
    });
  
    const primitives: z.infer<typeof primitivesSchema>[] = useWatch({
      control,
      name: `primitives`,
    });
  
    console.log({ primitives });
  
    const getSectionOptions = (sectionName) => {
      const section = getValues(sectionName);
      return section.map((item) => ({
        value: `${sectionName}.${item.meta.name}`,
        label: item.meta.name,
      }));
    };
  
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
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="button">Button</option>
                      <option value="text">Text</option>
                    </select>
                  </>
                )}
              />
              {primitives?.[index]?.type === "button" && (
                <>
                  <Controller
                    name={`primitives.${index}.surfaceId`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormLabel>Surface</FormLabel>
                        <select
                          {...field}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          {getSectionOptions("surface").map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                  <Controller
                    name={`primitives.${index}.typographyId`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormLabel>Typography</FormLabel>
                        <select
                          {...field}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          {getSectionOptions("typography").map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                  <Controller
                    name={`primitives.${index}.spacingId`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormLabel>Spacing</FormLabel>
                        <select
                          {...field}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          {getSectionOptions("spacing").map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </>
              )}
              {primitives?.[index]?.type === "text" && (
                <>
                  <Controller
                    name={`primitives.${index}.typographyId`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormLabel>Typography</FormLabel>
                        <select
                          {...field}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          {getSectionOptions("typography").map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </>
              )}
            </div>
          </div>
        ))}
        <UIButton
          type="button"
          onClick={() =>
            append({
              meta: { name: "", description: "", id: nanoid() },
              type: "button",
              surfaceId: "",
              typographyId: "",
              spacingId: "",
            })
          }
        >
          Add Primitive
        </UIButton>
      </div>
    );
  };
  