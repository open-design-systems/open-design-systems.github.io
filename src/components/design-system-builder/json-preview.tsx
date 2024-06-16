import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { codeToHtml } from "shiki";

export function JsonPreview() {
  const designSystemJson = useWatch();
  const [designSystemPreview, setDesignSystemPreview] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function makePreview() {
      const previewJson = await codeToHtml(
        JSON.stringify(designSystemJson, null, 4),
        {
          lang: "json",
          theme: "dracula",
        }
      );

      setDesignSystemPreview(previewJson);
    }

    makePreview();
  }, [designSystemJson]);

  return (
    <>
      {!designSystemPreview && <h3>Loading</h3>}
      {designSystemPreview && (
        <div
          dangerouslySetInnerHTML={{ __html: designSystemPreview }}
          className="w-full overflow-hidden text-left rounded-md [&_pre]:my-0 [&_pre]:h-[--container-height] [&_pre]:overflow-auto [&_pre]:whitespace-break-spaces [&_pre]:p-6 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
        ></div>
      )}
    </>
  );
}
