import openDesingSystem from "@/components/design-system-builder/templates/open-design-system.json";
import materialDesignSystem from "@/components/design-system-builder/templates/material-design-system-ods.json";
import type { DesignSystem } from "../../../../open-design-system.schema";

export default {
  openDesingSystem: openDesingSystem as unknown as DesignSystem,
  materialDesignSystem: materialDesignSystem as unknown as DesignSystem,
  cuppertinoDesignSystem: {} as unknown as DesignSystem,
  shadcnUIDesignSystem: {} as unknown as DesignSystem,
};
