import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Ref } from "@opends/schema";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type RefFieldProps = {
  name: string;
  label: string;
  refType: Ref.RefType;
};

export const RefField = ({ name, label, refType }: RefFieldProps) => {
  const { control } = useFormContext();
  const refOptions = useWatch({
    control,
    name: refType,
  });

  const handleRefValue = (value: string) => {
    console.log(name, value);
    return {
      $ref: value,
      $refType: refType,
    };
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <FormLabel>{label}</FormLabel>
          <select
            {...field}
            onChange={(e) => field.onChange(handleRefValue(e.target.value))}
            value={field.value?.$ref}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          >
            {[null, ...refOptions].map((option: any, idx: number) => (
              <option key={idx} value={option ? option.meta.id : null}>
                {option ? option.meta.name : "None"}
              </option>
            ))}
          </select>
        </>
      )}
    />
  );
};
