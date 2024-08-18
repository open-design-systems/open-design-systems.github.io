import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const parseNumber = (value?: string) => {
  return Number.isNaN(Number(value)) ? undefined : Number(value);
};

export function handleNumberFieldChange(onChange: (...event: any[]) => void) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEvent = {
      ...e,
      target: { ...e.target, value: parseNumber(e.target.value) },
    };

    onChange(newEvent);
  };
}

export function handleSelectNumberFieldChange(
  onChange: (...event: any[]) => void,
) {
  return (value: string) => {
    const newEvent = {
      target: { value: parseNumber(value) },
    };

    onChange(newEvent);
  };
}
