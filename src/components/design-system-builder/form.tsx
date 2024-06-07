import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"

import designSystemSchema from "./form-schema"
import defaultSystemDesign from './open-design-system.json'
import { ColorField } from "./fields/color-field"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { TypographyField } from "./fields/typography-field"
import { SpacingField } from "./fields/spacing-field"
import { SurfaceField } from "./fields/surface-field"
import { fromSchemaToForm, fromFormToSchema } from "./form-utils"
import { DesignSystem } from "open-design-system.schema"
import { ShadowsField } from "./fields/shadow-field"
import { PrimitivesField } from "./fields/primitive-field"

export function DesignSystemForm({ onSubmit }) {
  const defaultValues = fromSchemaToForm(defaultSystemDesign as unknown as DesignSystem);
  const form = useForm<z.infer<typeof designSystemSchema>>({
    resolver: zodResolver(designSystemSchema),
    defaultValues
  })

  function onSubmitForm(values: z.infer<typeof designSystemSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    onSubmit(fromFormToSchema(values))
  }

  function onError(err) {
    console.log(err)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm, onError)} className="space-y-8">
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
            Primitives
            <ChevronRightIcon className="h-5 w-5 transition-all" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <PrimitivesField />
          </CollapsibleContent>
        </Collapsible>

        <Button type="submit">View Open Design System</Button>
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