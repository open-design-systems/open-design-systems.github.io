"use client";

import * as React from "react";
import { CheckIcon, ClipboardIcon } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CopyButton({
  code,
  ...props
}: {
  code: string;
} & ButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7 rounded-[6px] [&_svg]:size-3.5"
          onClick={() => {
            navigator.clipboard.writeText(code);
            setHasCopied(true);
          }}
          {...props}
        >
          <span className="sr-only">Copy</span>
          {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy Schema</TooltipContent>
    </Tooltip>
  );
}
