import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";

export const MetaField = ({ field }: { field: string }) => {
  const { control } = useFormContext();
  return (
    <div>
      <Controller
        name={`${field}.meta.name`}
        control={control}
        render={({ field }) => (
          <>
            <FormLabel>Name</FormLabel>
            <Input {...field} placeholder="Name" />
          </>
        )}
      />
      <Controller
        name={`${field}.meta.description`}
        control={control}
        render={({ field }) => (
          <>
            <FormLabel>Description</FormLabel>
            <Input {...field} placeholder="Description" />
          </>
        )}
      />
    </div>
  );
};
