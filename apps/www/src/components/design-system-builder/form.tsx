import { useFormContext, Controller } from "react-hook-form";

import { ColorField } from "./fields/color-field";
import { TypographyField } from "./fields/typography-field";
import { SpacingField } from "./fields/spacing-field";
import { SurfaceField } from "./fields/surface-field";
import { fromFormToSchema } from "./form-utils";
import { ShadowsField } from "./fields/shadow-field";
import { PrimitivesField } from "./fields/primitive-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";
import { OpenDesignSystemSchema } from "@opends/schema";
import { toast } from "sonner";

export function DesignSystemForm({
  onSubmit,
  onShare,
}: {
  onSubmit: (designSystem: OpenDesignSystemSchema) => void;
  onShare: () => void;
}) {
  const form = useFormContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmitForm(values: any) {
    onSubmit(fromFormToSchema(values));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onError(err: any) {
    toast.error(
      "There are some errors in the form, please correct before download",
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmitForm, onError)}
      className="space-y-8"
    >
      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="flex items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
          Design System Details
          <ChevronRightIcon className="h-5 w-5 transition-all" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <div className="grid gap-2 mb-2">
            <Controller
              name={`meta.name`}
              control={form.control}
              render={({ field }) => (
                <>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} placeholder="Design System Name" />
                </>
              )}
            />
            <Controller
              name={`meta.description`}
              control={form.control}
              render={({ field }) => (
                <>
                  <FormLabel>Description</FormLabel>
                  <Input {...field} placeholder="Description" />
                </>
              )}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="flex items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
          Colors
          <ChevronRightIcon className="h-5 w-5 transition-all" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <ColorField />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="flex items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
          Typography
          <ChevronRightIcon className="h-5 w-5 transition-all" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <TypographyField />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="flex items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
          Spacings
          <ChevronRightIcon className="h-5 w-5 transition-all" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <SpacingField />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="flex items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
          Surfaces
          <ChevronRightIcon className="h-5 w-5 transition-all" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <SurfaceField />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="flex items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
          Shadows
          <ChevronRightIcon className="h-5 w-5 transition-all" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <ShadowsField />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="space-y-4">
        <CollapsibleTrigger className="flex items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
          Components
          <ChevronRightIcon className="h-5 w-5 transition-all" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <PrimitivesField />
        </CollapsibleContent>
      </Collapsible>

      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <ShareLinkButton onClick={onShare} />
        <Button className="hidden md:block" type="submit">
          Download Open Design System
        </Button>
        <Button className="md:hidden" type="submit">
          Download Open DS
        </Button>
      </div>
    </form>
  );
}

function ShareLinkButton({ onClick }: { onClick: () => void }) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const handleClick = () => {
    setHasCopied(true);
    return onClick();
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" type="button" onClick={handleClick}>
          {hasCopied ? (
            <>
              <CheckIcon /> Copied link
            </>
          ) : (
            "Share link"
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Click to copy shareable URL to clipboard</TooltipContent>
    </Tooltip>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
