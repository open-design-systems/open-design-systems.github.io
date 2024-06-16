import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Button } from '@/components/ui/button';

const popularFonts = [
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Oswald",
    "Raleway",
    "Poppins",
    "Merriweather",
    "Ubuntu",
    "Nunito"
];

const fontWeights = [
    { label: "Thin", value: 100 },
    { label: "Extra Light", value: 200 },
    { label: "Light", value: 300 },
    { label: "Regular", value: 400 },
    { label: "Medium", value: 500 },
    { label: "Semi Bold", value: 600 },
    { label: "Bold", value: 700 },
    { label: "Extra Bold", value: 800 },
    { label: "Black", value: 900 },
];

export const TypographyField = () => {
    const { control } = useFormContext();
    const { fields, append } = useFieldArray({
        control,
        name: "typography",
    });

    return (
        <div className='grid gap-4'>
            {fields.map((field, index) => (
                <div className='gap-4 p-4 border-2 border-dotted' key={field.id}>
                    <div className='grid gap-2 mb-2'>
                        <Controller
                            name={`typography.${index}.meta.name`}
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder="Name" />

                            )}
                        />
                        <Controller
                            name={`typography.${index}.meta.description`}
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder="Description" />
                            )}
                        />
                    </div>
                    <div className='grid gap-2 mb-2'>
                        <Controller
                            name={`typography.${index}.fontFamily`}
                            control={control}
                            render={({ field }) => (
                                <div className="mb-2">
                                    <FormLabel>Font Family</FormLabel>
                                    <select {...field} className="w-full p-2 border border-gray-300 rounded-md">
                                        {popularFonts.map((font) => (
                                            <option key={font} value={font}>
                                                {font}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        />
                        <div className='flex gap-4'>
                            <Controller
                                name={`typography.${index}.fontSize`}
                                control={control}
                                render={({ field }) => (
                                    <div className='flex flex-col gap-2 flex-1'>
                                        <FormLabel>Font Size (px)</FormLabel>
                                        <Input {...field} type="number" step="1" placeholder="Font Size" />
                                    </div>
                                )}
                            />
                            <Controller
                                name={`typography.${index}.fontWeight`}
                                control={control}
                                render={({ field }) => (
                                    <div className='flex flex-col gap-2 flex-1'>
                                        <FormLabel>Font Weight</FormLabel>
                                        <select {...field} className="w-full p-2 border border-gray-300 rounded-md">
                                            {fontWeights.map((weight) => (
                                                <option key={weight.value} value={weight.value}>
                                                    {weight.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            />
                        </div>
                        <div className='flex gap-4'>
                            <Controller
                                name={`typography.${index}.lineHeight`}
                                control={control}
                                render={({ field }) => (
                                    <div className='flex flex-col gap-2 flex-1'>
                                        <FormLabel>Line Height (px)</FormLabel>
                                        <Input {...field} type="number" step="0.1" placeholder="Line Height" />
                                    </div>
                                )}
                            />
                            <Controller
                                name={`typography.${index}.letterSpacing`}
                                control={control}
                                render={({ field }) => (
                                    <div className='flex flex-col gap-2 flex-1'>
                                        <FormLabel>Letter Spacing (em)</FormLabel>
                                        <Input {...field} type="number" step="0.01" placeholder="Letter Spacing" />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <Button type="button" onClick={() => append({ name: '', description: '', fontFamily: '', fontSize: '', fontWeight: '', lineHeight: '', letterSpacing: '' })}>Add Typography</Button>
        </div>
    );
};
