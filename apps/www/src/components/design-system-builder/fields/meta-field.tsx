import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const MetaField = ({ field }: { field: string }) => {
  const { control } = useFormContext();
  return (
    <div>
      <FormField
        name={`${field}.meta.name`}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`${field}.meta.description`}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Description" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
