import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DesignSystemForm } from "./design-system-builder/form";
import type { DesignSystem } from "open-design-system.schema";

import openDesingSystem from "@/components/design-system-builder/open-design-system.json";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import designSystemSchema from "./design-system-builder/form-schema";
import { fromSchemaToForm } from "./design-system-builder/form-utils";
import { JsonPreview } from "./design-system-builder/json-preview";
import { DesignSystemPreview } from "./design-system-builder/design-system-preview";
import { ThemeToggle } from "./theme-toggle";

function downloadJsonFile(
  data: DesignSystem,
  fileName = "open-design-system.json"
) {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(
      {
        $schema: new URL("/open-design-system.schema.json", import.meta.url)
          .href,
        ...data,
      },
      null,
      4
    )
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = fileName;

  console.log(data, jsonString);

  link.click();
}

export function DesignSystem() {
  const defaultValues = openDesingSystem as unknown as DesignSystem;

  const methods = useForm<z.infer<typeof designSystemSchema>>({
    resolver: zodResolver(designSystemSchema),
    defaultValues: fromSchemaToForm(defaultValues),
  });

  const handleFormSubmit = (values: DesignSystem) => {
    downloadJsonFile(values);
  };

  return (
    <FormProvider {...methods}>
      <div className="grid min-h-screen w-full grid-cols-[1fr_2fr]">
        <div className="border-r bg-gray-100/40 p-6 dark:bg-gray-800/40">
          <div className="flex h-full max-h-screen flex-col gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Customize</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Adjust the settings to preview your changes.
              </p>
            </div>
            <div className="flex-1 space-y-6 overflow-auto">
              <DesignSystemForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <Tabs defaultValue="demo">
            <TabsList className="flex p-1 bg-gray-100/40 dark:bg-gray-800/40">
              <TabsTrigger value="demo">Demo</TabsTrigger>
              <TabsTrigger value="design-system">
                Open Design System
              </TabsTrigger>
              <ThemeToggle />
            </TabsList>
            <TabsContent value="demo">
              <DesignSystemPreview />
            </TabsContent>
            <TabsContent value="design-system">
              <JsonPreview />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </FormProvider>
  );
}
