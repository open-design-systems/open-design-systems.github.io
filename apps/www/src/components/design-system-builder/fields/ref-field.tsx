import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ref } from "@opends/schema";
import { useFormContext, useWatch } from "react-hook-form";

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
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={handleRefValue}
            defaultValue={field.value?.$ref}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {[null, ...refOptions].map((option: any, idx: number) => (
                <SelectItem key={idx} value={option ? option.meta.id : null}>
                  {option ? option.meta.name : "None"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
