/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { ColorPicker } from "@/components/color-picker";
import { colord } from "colord";
import { ChangeEvent } from "react";
import { RemoveDialog } from "../remove-dialog";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MetaField } from "./meta-field";

const hexToRgba = (hex: string) => {
  const { r, g, b, a } = colord(hex).toRgb();

  return {
    red: r.toString(),
    green: g.toString(),
    blue: b.toString(),
    alpha: (a * 255).toString(),
  };
};

const rgbaToHex = ({
  red,
  green,
  blue,
  alpha,
}: {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}) => {
  return colord({ r: red, g: green, b: blue, a: alpha }).toHex();
};

type RgbaInputProps = {
  control: any;
  name: string;
  onChangeRgba: (event: ChangeEvent<HTMLInputElement>, field: any) => void;
};

const RgbaInput = ({ control, name, onChangeRgba }: RgbaInputProps) => (
  <div className="flex space-x-2">
    <div>
      <FormLabel>red</FormLabel>
      <Controller
        name={`${name}.red`}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Red"
            onChange={(e) => onChangeRgba(e, field)}
          />
        )}
      />
    </div>
    <div>
      <FormLabel>green</FormLabel>
      <Controller
        name={`${name}.green`}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Green"
            onChange={(e) => onChangeRgba(e, field)}
          />
        )}
      />
    </div>
    <div>
      <FormLabel>blue</FormLabel>
      <Controller
        name={`${name}.blue`}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Blue"
            onChange={(e) => onChangeRgba(e, field)}
          />
        )}
      />
    </div>
    <div>
      <FormLabel>alpha</FormLabel>
      <Controller
        name={`${name}.alpha`}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Alpha"
            onChange={(e) => onChangeRgba(e, field)}
          />
        )}
      />
    </div>
  </div>
);

type HexInputProps = {
  control: any;
  name: string;
  onChangeHex: (e: ChangeEvent<HTMLInputElement>, field: any) => void;
};

const HexInput = ({ control, name, onChangeHex }: HexInputProps) => (
  <div className="flex space-x-2">
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <ColorPicker
            color={field.value}
            onChange={(color) => {
              const event: ChangeEvent<HTMLInputElement> = {
                target: { value: color },
              } as unknown as ChangeEvent<HTMLInputElement>;
              onChangeHex(event, field);
            }}
          />
          <Input
            {...field}
            placeholder="Hex"
            onChange={(e) => onChangeHex(e, field)}
          />
        </>
      )}
    />
  </div>
);

const ColorSelectionField = ({ name }: { name: string }) => {
  const { control, watch, setValue } = useFormContext();
  const rgbaLight = watch(`${name}.light.rgba`);
  const rgbaDark = watch(`${name}.dark.rgba`);

  const handleHexChange =
    (theme: "light" | "dark") =>
    (e: ChangeEvent<HTMLInputElement>, field: any) => {
      if (e.target.value && !e.target.value.startsWith("#")) {
        e.target.value = `#${e.target.value}`;
      }
      field.onChange(e);
      const rgba = hexToRgba(e.target.value);
      setValue(`${name}.${theme}.rgba`, rgba);
    };

  const handleHexChangeLight = handleHexChange("light");
  const handleHexChangeDark = handleHexChange("dark");

  const handleRgbaChange =
    (theme: "light" | "dark") =>
    (e: ChangeEvent<HTMLInputElement>, field: any) => {
      field.onChange(e);
      const rgbaTheme = theme === "light" ? rgbaLight : rgbaDark;

      const hex = rgbaToHex(rgbaTheme);
      setValue(`${name}.${theme}.hex`, hex);
    };

  const handleRgbaChangeLight = handleRgbaChange("light");
  const handleRgbaChangeDark = handleRgbaChange("dark");
  return (
    <FormItem>
      <FormControl>
        <div className="space-y-4">
          <div>
            <FormLabel className="font-semibold">Light</FormLabel>
            <HexInput
              control={control}
              name={`${name}.light.hex`}
              onChangeHex={handleHexChangeLight}
            />
            <RgbaInput
              control={control}
              name={`${name}.light.rgba`}
              onChangeRgba={handleRgbaChangeLight}
            />
          </div>

          <div>
            <FormLabel className="font-semibold">Dark</FormLabel>
            <HexInput
              control={control}
              name={`${name}.dark.hex`}
              onChangeHex={handleHexChangeDark}
            />
            <RgbaInput
              control={control}
              name={`${name}.dark.rgba`}
              onChangeRgba={handleRgbaChangeDark}
            />
          </div>
        </div>
      </FormControl>

      <FormMessage />
    </FormItem>
  );
};

export function ColorField() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "colors",
  });

  return (
    <div className="grid gap-4">
      {fields.map((field, index) => (
        <div className="gap-4 p-4 border-2 border-dotted" key={field.id}>
          <div className="grid gap-2 mb-2">
            <MetaField field={`colors.${index}`} />
          </div>
          <ColorSelectionField name={`colors.${index}`} />
          <RemoveDialog
            text={"Remove"}
            onRemove={() => remove(index)}
            element={{ name: "color" }}
          />
        </div>
      ))}
      <Button
        type="button"
        className="mt-4"
        onClick={() =>
          append({
            meta: { name: "", description: "", id: nanoid() },
            light: {
              hex: "",
              rgba: { red: "", green: "", blue: "", alpha: "" },
            },
            dark: {
              hex: "",
              rgba: { red: "", green: "", blue: "", alpha: "" },
            },
          })
        }
      >
        Add Color
      </Button>
    </div>
  );
}
