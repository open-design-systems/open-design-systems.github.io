import { Form, useFormContext } from "react-hook-form";

import { ColorField } from "./fields/color-field";
import { TypographyField } from "./fields/typography-field";
import { SpacingField } from "./fields/spacing-field";
import { SurfaceField } from "./fields/surface-field";
import { fromFormToSchema } from "./form-utils";
import { ShadowsField } from "./fields/shadow-field";
import { PrimitivesField } from "./fields/primitive-field";
import { DesignSystem } from "open-design-system.schema";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";

export function DesignSystemForm({
  onSubmit,
  onShare,
}: {
  onSubmit: (designSystem: DesignSystem) => void;
  onShare: () => void;
}) {
  const form = useFormContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmitForm(values: any) {
    onSubmit(fromFormToSchema(values));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onError(err: any) {
    console.log("err", err);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmitForm, onError)}
      className="space-y-8"
    >
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

      <div className="flex gap-4 justify-end">
        <ShareLinkButton onClick={onShare} />
        <Button type="submit">Download Open Design System</Button>
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
