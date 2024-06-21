import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { codeToHtml } from "shiki";
import { fromFormToSchema, fromSchemaToForm } from "./form-utils";
import { CopyButton } from "../copy-button";

function getDesignSystemJSON(json: any) {
  return JSON.stringify(fromFormToSchema(json), null, 2);
}

export function JsonPreview() {
  const designSystemJson = useWatch();
  const [designSystemPreview, setDesignSystemPreview] = useState<string | null>(
    null,
  );

  useEffect(() => {
    async function makePreview() {
      try {
        const previewJson = await codeToHtml(
          getDesignSystemJSON(designSystemJson),
          {
            lang: "json",
            theme: "dracula",
          },
        );

        setDesignSystemPreview(previewJson);
      } catch (err) {
        console.error("Error while shiki");
      }
    }

    makePreview();
  }, [designSystemJson]);

  return (
    <div className="flex p-4">
      {!designSystemPreview && <h3>Loading</h3>}
      {designSystemPreview && (
        <div className="flex relative">
          <CopyButton
            code={getDesignSystemJSON(designSystemJson)}
            className="absolute right-8 top-4"
          />
          <div
            dangerouslySetInnerHTML={{ __html: designSystemPreview }}
            className="w-full max-h-screen overflow-y-scroll text-left rounded-md [&_pre]:my-0 [&_pre]:h-[--container-height] [&_pre]:overflow-auto [&_pre]:whitespace-break-spaces [&_pre]:p-6 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
          ></div>
        </div>
      )}
    </div>
  );
}
