import { OpenDesignSystemSchema } from "@opends/schema";
import { DesignSystemSchema } from "./form-schema";

export function fromSchemaToForm(
  schema: OpenDesignSystemSchema,
): DesignSystemSchema {
  return {
    id: schema.id,
    meta: schema.meta,
    colors: Object.values(schema.colors ?? []),
    typography: Object.values(schema.typography ?? []),
    spacing: Object.values(schema.spacing ?? []),
    surface: Object.values(schema.surface ?? []),
    shadows: Object.values(schema.shadows ?? []),
    primitives: Object.values(schema.primitives ?? []),
  };
}

export function fromFormToSchema(
  data: DesignSystemSchema,
): OpenDesignSystemSchema {
  return {
    id: data.id,
    meta: data.meta,
    colors: data.colors.reduce(
      (items, item) => ({ ...items, [item.meta.name]: item }),
      {},
    ),
    typography: data.typography.reduce(
      (items, item) => ({ ...items, [item.meta.name]: item }),
      {},
    ),
    spacing: data.spacing.reduce(
      (items, item) => ({ ...items, [item.meta.name]: item }),
      {},
    ),
    surface: data.surface.reduce(
      (items, item) => ({ ...items, [item.meta.name]: item }),
      {},
    ),
    shadows: data.shadows.reduce(
      (items, item) => ({ ...items, [item.meta.name]: item }),
      {},
    ),
    primitives: data.primitives.reduce(
      (items, item) => ({ ...items, [item.meta.name]: item }),
      {},
    ),
  };
}
