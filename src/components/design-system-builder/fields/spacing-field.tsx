import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

export const SpacingField = () => {
    const { control } = useFormContext();

    const { fields, append } = useFieldArray({
        control,
        name: "spacing",
    });

    return (
        <div className='grid gap-4'>
            {fields.map((field, index) => (
                <div className='gap-4 p-4 border-2 border-dotted' key={field.id}>
                    <div className='grid gap-2 mb-2'>
                        <Controller
                            name={`spacing.${index}.meta.name`}
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder="Spacing Name" />
                            )}
                        />
                        <Controller
                            name={`spacing.${index}.meta.description`}
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder="Description" />
                            )}
                        />
                        <Controller
                            name={`spacing.${index}.value`}
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type="number" step="1" placeholder="Value (px)" />
                            )}
                        />
                    </div>
                </div>
            ))}
            <Button type="button" onClick={() => append({ name: '', description: '', value: '' })}>Add Spacing</Button>
        </div>
    );
};
