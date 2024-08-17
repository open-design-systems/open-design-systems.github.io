import {
  useFormContext,
  useFieldArray,
  Control,
  ControllerRenderProps,
} from "react-hook-form";
import { ColorPicker } from "@/components/color-picker";
import { colord } from "colord";
import { ChangeEvent } from "react";
import { RemoveDialog } from "../remove-dialog";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MetaField } from "./meta-field";

const hexToRgba = (hex: string) => {
  const { r, g, b, a } = colord(hex).toRgb();

  return {
    red: r,
    green: g,
    blue: b,
    alpha: a,
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
  control: Control;
  name: string;
  onChangeRgba: (
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps,
  ) => void;
};

const ColorRgbaInputField = ({
  control,
  name,
  colorCode,
  onChangeRgba,
}: RgbaInputProps & { colorCode: "red" | "green" | "blue" | "alpha" }) => (
  <FormField
    name={`${name}.${colorCode}`}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{colorCode}</FormLabel>
        <FormControl>
          <Input
            {...field}
            placeholder={colorCode}
            onChange={(e) => onChangeRgba(e, field)}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const RgbaInput = ({ control, name, onChangeRgba }: RgbaInputProps) => (
  <div className="flex space-x-2">
    <ColorRgbaInputField
      name={name}
      control={control}
      colorCode="red"
      onChangeRgba={onChangeRgba}
    />
    <ColorRgbaInputField
      name={name}
      control={control}
      colorCode="green"
      onChangeRgba={onChangeRgba}
    />
    <ColorRgbaInputField
      name={name}
      control={control}
      colorCode="blue"
      onChangeRgba={onChangeRgba}
    />
    <ColorRgbaInputField
      name={name}
      control={control}
      colorCode="alpha"
      onChangeRgba={onChangeRgba}
    />
  </div>
);

type HexInputProps = {
  control: Control;
  name: string;
  onChangeHex: (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps,
  ) => void;
};

const HexInput = ({ control, name, onChangeHex }: HexInputProps) => (
  <div>
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex space-x-2">
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
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

const ColorFormItem = ({
  name,
  type,
  onChangeHex,
  onChangeRgba,
}: {
  name: string;
  type: "light" | "dark";
  onChangeHex: (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps,
  ) => void;
  onChangeRgba: (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps,
  ) => void;
}) => {
  const { control } = useFormContext();
  return (
    <div>
      <FormLabel className="font-semibold capitalize">{type}</FormLabel>
      <HexInput
        control={control}
        name={`${name}.${type}.hex`}
        onChangeHex={onChangeHex}
      />
      <RgbaInput
        control={control}
        name={`${name}.${type}.rgba`}
        onChangeRgba={onChangeRgba}
      />
    </div>
  );
};

const ColorSelectionField = ({ name }: { name: string }) => {
  const { watch, setValue } = useFormContext();
  const rgbaLight = watch(`${name}.light.rgba`);
  const rgbaDark = watch(`${name}.dark.rgba`);

  const handleHexChange =
    (theme: "light" | "dark") =>
    (e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps) => {
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
    (e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps) => {
      field.onChange(e);
      const rgbaTheme = theme === "light" ? rgbaLight : rgbaDark;

      const hex = rgbaToHex(rgbaTheme);
      setValue(`${name}.${theme}.hex`, hex);
    };

  const handleRgbaChangeLight = handleRgbaChange("light");
  const handleRgbaChangeDark = handleRgbaChange("dark");
  return (
    <div className="space-y-4">
      <ColorFormItem
        name={name}
        type="light"
        onChangeHex={handleHexChangeLight}
        onChangeRgba={handleRgbaChangeLight}
      />
      <ColorFormItem
        name={name}
        type="dark"
        onChangeHex={handleHexChangeDark}
        onChangeRgba={handleRgbaChangeDark}
      />
    </div>
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
