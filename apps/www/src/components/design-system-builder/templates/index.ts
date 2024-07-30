import openDesingSystem from "@/components/design-system-builder/templates/open-design-system.json";
import materialDesignSystem from "@/components/design-system-builder/templates/material-design-system-ods.json";
import shadcnUIDesignSystem from "@/components/design-system-builder/templates/shadcn-design-system-ods.json";
import { OpenDesignSystemSchema, Validator } from "@opends/schema";

const templates: Record<string, OpenDesignSystemSchema> = {
  openDesingSystem: Validator(openDesingSystem),
  materialDesignSystem: Validator(materialDesignSystem),
  shadcnUIDesignSystem: Validator(shadcnUIDesignSystem),
};

export default templates;
