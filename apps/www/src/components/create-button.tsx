import { Lightbulb } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import React from "react";

export type CreateOptions = "scratch" | "android" | "ios" | "shadcn/ui";

interface CreateButtonWithOptionsProps extends Omit<ButtonProps, "onClick"> {
  options: Required<Array<CreateOptions>>;
  onClick: (option: CreateOptions) => void;
}

const IconsMap = {
  scratch: <Lightbulb className="h-5 w-5 mr-2" />,
  android: <AndroidIcon className="h-5 w-5 mr-2" />,
  ios: <IOSIcon className="h-5 w-5 mr-2" />,
  "shadcn/ui": <ShadcnUIIcon className="h-5 w-5 mr-2" />,
};

export function CreateButtonWithOptions({
  className,
  onClick,
  options,
  ...props
}: CreateButtonWithOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">Create from</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem key={option} onClick={() => onClick(option)}>
            {IconsMap[option]}
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AndroidIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 50 50"
    >
      <path d="M 16.28125 0.03125 C 16.152344 0.0546875 16.019531 0.078125 15.90625 0.15625 C 15.449219 0.464844 15.347656 1.105469 15.65625 1.5625 L 17.8125 4.78125 C 14.480469 6.546875 11.996094 9.480469 11.1875 13 L 38.8125 13 C 38.003906 9.480469 35.519531 6.546875 32.1875 4.78125 L 34.34375 1.5625 C 34.652344 1.105469 34.550781 0.464844 34.09375 0.15625 C 33.632813 -0.152344 32.996094 -0.0195313 32.6875 0.4375 L 30.3125 3.9375 C 28.664063 3.335938 26.875 3 25 3 C 23.125 3 21.335938 3.335938 19.6875 3.9375 L 17.3125 0.4375 C 17.082031 0.09375 16.664063 -0.0429688 16.28125 0.03125 Z M 19.5 8 C 20.328125 8 21 8.671875 21 9.5 C 21 10.332031 20.328125 11 19.5 11 C 18.667969 11 18 10.332031 18 9.5 C 18 8.671875 18.667969 8 19.5 8 Z M 30.5 8 C 31.332031 8 32 8.671875 32 9.5 C 32 10.332031 31.332031 11 30.5 11 C 29.671875 11 29 10.332031 29 9.5 C 29 8.671875 29.671875 8 30.5 8 Z M 8 15 C 6.34375 15 5 16.34375 5 18 L 5 32 C 5 33.65625 6.34375 35 8 35 C 8.351563 35 8.6875 34.925781 9 34.8125 L 9 15.1875 C 8.6875 15.074219 8.351563 15 8 15 Z M 11 15 L 11 37 C 11 38.652344 12.347656 40 14 40 L 36 40 C 37.652344 40 39 38.652344 39 37 L 39 15 Z M 42 15 C 41.648438 15 41.3125 15.074219 41 15.1875 L 41 34.8125 C 41.3125 34.921875 41.648438 35 42 35 C 43.65625 35 45 33.65625 45 32 L 45 18 C 45 16.34375 43.65625 15 42 15 Z M 15 42 L 15 46 C 15 48.207031 16.792969 50 19 50 C 21.207031 50 23 48.207031 23 46 L 23 42 Z M 27 42 L 27 46 C 27 48.207031 28.792969 50 31 50 C 33.207031 50 35 48.207031 35 46 L 35 42 Z" />
    </svg>
  );
}

function IOSIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 50 50"
    >
      <path d="M 16 3 C 9.38 3 4 8.38 4 15 L 4 35 C 4 41.62 9.38 47 16 47 L 36 47 C 42.62 47 48 41.62 48 35 L 48 15 C 48 8.38 42.62 3 36 3 L 16 3 z M 12.619141 18.070312 C 13.319141 18.070312 13.839844 18.570469 13.839844 19.230469 C 13.839844 19.880469 13.319141 20.380859 12.619141 20.380859 C 11.909141 20.380859 11.390625 19.880469 11.390625 19.230469 C 11.390625 18.570469 11.909141 18.070312 12.619141 18.070312 z M 23.039062 18.640625 C 26.689062 18.640625 28.939453 21.189297 28.939453 25.279297 C 28.939453 29.359297 26.709062 31.929688 23.039062 31.929688 C 19.349062 31.929688 17.109375 29.369297 17.109375 25.279297 C 17.109375 21.179297 19.399062 18.640625 23.039062 18.640625 z M 35.970703 18.640625 C 38.540703 18.640625 40.419062 20.139297 40.539062 22.279297 L 38.619141 22.279297 C 38.429141 21.109297 37.419453 20.380859 35.939453 20.380859 C 34.379453 20.380859 33.349609 21.119531 33.349609 22.269531 C 33.349609 23.169531 34.009922 23.690078 35.669922 24.080078 L 37.060547 24.419922 C 39.670547 25.029922 40.740234 26.080234 40.740234 27.990234 C 40.740234 30.420234 38.859609 31.939453 35.849609 31.939453 C 33.039609 31.939453 31.149766 30.490703 31.009766 28.220703 L 32.960938 28.220703 C 33.130938 29.420703 34.31 30.189453 36 30.189453 C 37.58 30.189453 38.740234 29.370234 38.740234 28.240234 C 38.740234 27.280234 38.010078 26.700781 36.330078 26.300781 L 34.689453 25.910156 C 32.399453 25.370156 31.349609 24.260391 31.349609 22.400391 C 31.349609 20.140391 33.200703 18.640625 35.970703 18.640625 z M 23.039062 20.470703 C 20.649062 20.470703 19.130859 22.339297 19.130859 25.279297 C 19.130859 28.209297 20.599062 30.099609 23.039062 30.099609 C 25.449062 30.099609 26.929688 28.209297 26.929688 25.279297 C 26.929688 22.339297 25.449063 20.470703 23.039062 20.470703 z M 11.679688 22.060547 L 13.560547 22.060547 L 13.560547 31.630859 L 11.679688 31.630859 L 11.679688 22.060547 z" />
    </svg>
  );
}

function ShadcnUIIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <rect width="256" height="256" fill="none" />
      <line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}
