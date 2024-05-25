import { useFormContext, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Button } from '@/components/ui/button';

export const ShadowField = () => {
    const { control } = useFormContext();

    const { fields, append } = useFieldArray({
        control,
        name: "shadow",
    });

    const colors = useWatch({
        control,
        name: 'colors',
    });

    return (
        <div className='grid gap-4'>
            {fields.map((field, index) => (
                <div className='gap-4 p-4 border-2 border-dotted' key={field.id}>
                    <div className='grid gap-2 mb-2'>
                        <Controller
                            name={`shadow.${index}.meta.name`}
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder="Shadow Name" />
                            )}
                        />
                        <Controller
                            name={`shadow.${index}.meta.description`}
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder="Description" />
                            )}
                        />
                        <Controller
                            name={`shadow.${index}.elevation`}
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type="number" step="1" placeholder="Elevation" />
                            )}
                        />
                        <Controller
                            name={`shadow.${index}.shadowColor`}
                            control={control}
                            render={({ field }) => (
                                <>
                                    <FormLabel>Shadow Color</FormLabel>
                                    <select {...field} className="w-full p-2 border border-gray-300 rounded-md">
                                        {colors.map((color, idx) => (
                                            <option key={idx} value={`colors.${color.meta.name}`}>
                                                {color.meta.name}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}
                        />
                        <Controller
                            name={`shadow.${index}.opacity`}
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type="number" step="1" placeholder="Opacity" />
                            )}
                        />
                        Offset
                        <div className='flex gap-3'>
                        <Controller
                            name={`shadow.${index}.offset.width`}
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type="number" step="1" placeholder="Width" />
                            )}
                        />
                        <Controller
                            name={`shadow.${index}.offset.height`}
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type="number" step="1" placeholder="Height" />
                            )}
                        />
                        </div>
                        <Controller
                            name={`shadow.${index}.radius`}
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type="number" step="1" placeholder="Radius" />
                            )}
                        />
                    </div>
                </div>
            ))}
            <Button type="button" onClick={() => append({ name: '', description: '', value: '' })}>Add Shadow</Button>
        </div>
    );
};
