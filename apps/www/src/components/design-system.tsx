import { DesignSystemForm } from "./design-system-builder/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { DesignSystemPreview } from "./design-system-builder/design-system-preview";
import DraggableArea from "./design-system-builder/draggable-area";
import designSystemSchema, {
  DesignSystemSchema,
} from "./design-system-builder/form-schema";
import { fromSchemaToForm } from "./design-system-builder/form-utils";
import { JsonPreview } from "./design-system-builder/json-preview";
import { ThemeToggle } from "./theme-toggle";
import JSONCrush from "jsoncrush";
import { CreateButtonWithOptions, CreateOptions } from "./create-button";
import { OpenDesignSystemSchema } from "@opends/schema";
import templates from "./design-system-builder/templates";

const schemaFile = "open-design-system-schema.json";
const baseUrl = import.meta.env.DEV
  ? "http://localhost:5173"
  : "https://open-design-systems.github.io";

function downloadJsonFile(
  data: OpenDesignSystemSchema,
  fileName = "open-design-system.json",
) {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(
      {
        $schema: `${baseUrl}/${schemaFile}`,
        ...data,
      },
      null,
      4,
    ),
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = fileName;

  link.click();
}

const newDefaultValues = templates.openDesingSystem;

const STORAGE_KEY = "open-design-system:design-system";

const createOptions: Record<CreateOptions, OpenDesignSystemSchema> = {
  scratch: newDefaultValues,
  material: templates.materialDesignSystem,
  "shadcn/ui": templates.shadcnUIDesignSystem,
};

function loadSavedDesignSystem() {
  const savedLocally = localStorage.getItem(STORAGE_KEY);

  const url = new URL(window.location.href);
  const sharedLink = JSONCrush.uncrush(
    decodeURIComponent(url?.searchParams.get("share") || ""),
  );

  return sharedLink || savedLocally;
}

export function DesignSystem() {
  const savedDesignSystem = loadSavedDesignSystem();
  const defaultValues = savedDesignSystem
    ? JSON.parse(savedDesignSystem)
    : fromSchemaToForm(newDefaultValues);

  // const methods = useForm<z.infer<typeof designSystemSchema>>({
  //   resolver: zodResolver(designSystemSchema),
  //   defaultValues: fromSchemaToForm(defaultValues),
  // });

  console.log({ designSystemSchema, defaultValues });

  const methods = useForm<DesignSystemSchema>({
    resolver: typeboxResolver(designSystemSchema),
    defaultValues: defaultValues,
  });

  const watchForm = useWatch({ control: methods.control });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchForm));
  }, [watchForm]);

  const handleFormSubmit = (values: OpenDesignSystemSchema) => {
    downloadJsonFile(values);
  };

  const handleShare = () => {
    const stringifiedSchema = JSON.stringify(watchForm);
    const shareableData = encodeURIComponent(
      JSONCrush.crush(stringifiedSchema),
    );
    const url = new URL(window.location.href);

    url.searchParams.set("share", shareableData);

    history.pushState({}, "", url);

    navigator.clipboard.writeText(url.toString());
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const json = JSON.parse(event.target.result as string);
        methods.reset(fromSchemaToForm(json));
      }
    };
    reader.readAsText(file);
  };

  const handleNew = (option: CreateOptions) => {
    const url = new URL(window.location.href);

    url.searchParams.delete("share");
    history.replaceState({}, "", url);

    const newValues = createOptions[option];

    methods.reset(fromSchemaToForm(newValues));
  };

  const handleUploadClick = () => {
    document.getElementById("file-input")?.click();
  };

  return (
    <FormProvider {...methods}>
      <div className="grid min-h-screen w-full grid-cols-[1fr_2fr]">
        <DraggableArea onFileUpload={handleFileUpload}>
          <div className="border-r bg-gray-100/40 p-6 dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Customize</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Adjust the settings to preview your changes.
                </p>
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="secondary" onClick={handleUploadClick}>
                  Upload
                </Button>
                <CreateButtonWithOptions
                  variant="default"
                  options={["scratch", "material" /*, "shadcn/ui"*/]}
                  onClick={handleNew}
                />
                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
              </div>
              <div className="flex-1 space-y-6 overflow-auto">
                <DesignSystemForm
                  onSubmit={handleFormSubmit}
                  onShare={handleShare}
                />
              </div>
            </div>
          </div>
        </DraggableArea>
        <div className="flex flex-col">
          <Tabs defaultValue="demo">
            <TabsList className="flex p-1 bg-gray-100/40 dark:bg-gray-800/40">
              <TabsTrigger value="demo">Demo</TabsTrigger>
              <TabsTrigger value="design-system">
                Open Design System Schema
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
