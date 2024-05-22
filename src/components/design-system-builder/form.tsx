import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import designSystemSchema from "./form-schema"
import defaultSystemDesign from './open-design-system.json'
import { ColorField } from "./fields/color-field"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { TypographyField } from "./fields/typography-field"

export function DesignSystemForm() {
  const form = useForm<z.infer<typeof designSystemSchema>>({
    resolver: zodResolver(designSystemSchema),
    defaultValues: defaultSystemDesign,
  })

  function onSubmit(values: z.infer<typeof designSystemSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            Spacing
            <ChevronRightIcon className="h-5 w-5 transition-all" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <h4>TBD</h4>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible className="space-y-4">
          <CollapsibleTrigger className="flex items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
            Borders
            <ChevronRightIcon className="h-5 w-5 transition-all" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <h4>TBD</h4>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible className="space-y-4">
          <CollapsibleTrigger className="flex items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
            Shadows
            <ChevronRightIcon className="h-5 w-5 transition-all" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <h4>TBD</h4>
          </CollapsibleContent>
        </Collapsible>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

function ChevronRightIcon(props) {
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
  )
}