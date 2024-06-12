import { DesignSystem } from "open-design-system.schema";
import designSystemSchema from "./form-schema";
import { z } from "zod";

type DesignSystemFormSchema = z.infer<typeof designSystemSchema>;

function mapSurfaceToColors(colors: DesignSystem["colors"]) {
  const findColorIndex = (ref?: string) => {
    if (!ref) {
      return undefined;
    }

    const colorName = ref.split(".")[1];

    return colorName;
  };
  return (surface: DesignSystemFormSchema["surface"][0]) => ({
    ...surface,
    backgroundColor: `colors.${findColorIndex(surface.backgroundColor)}`,
    borderColor: `colors.${findColorIndex(surface.borderColor)}`,
  });
}

// function mapPrimitivesToSchema(schema: DesignSystem) {

//     function mapButton(primitive: DesignSystemFormSchema['primitives'][0]) {
//         if (primitive.type !== 'button') return {}

//         return {
//             ...primitive,
//             surfaceId: ,
//             typographyId: '',
//             spacingId: '',
//         }
//     }

//     return (primitive: DesignSystemFormSchema['primitives'][0]) => ({
//         ...primitive,
//         ...(primitive.type === 'button' ? mapButton(primitive) : {}),
//         ...(primitive.type === 'text' ? {} : {})
//     })
// }

export function fromSchemaToForm(schema: DesignSystem): DesignSystemFormSchema {
  return {
    id: schema.id,
    meta: schema.meta,
    colors: Object.values(schema.colors),
    typography: Object.values(schema.typography),
    spacing: Object.values(schema.spacing),
    surface: Object.values(schema.surface).map(
      mapSurfaceToColors(schema.colors)
    ),
    shadows: Object.values(schema.shadows),
    primitives: Object.values(schema.primitives), //.map(mapPrimitivesToSchema(schema))
  };
}

export function fromFormToSchema(data: DesignSystemFormSchema): DesignSystem {
  return {
    id: data.id,
    meta: data.meta,
    colors: data.colors.reduce(
      (items, item) => ({ ...items, [item.meta.name]: item }),
      {}
    ),
    typography: data.typography.reduce(
      (items, item) => ({ ...items, [item.meta.name]: item }),
      {}
    ),
    spacing: data.spacing.reduce(
      (items, item) => ({ ...items, [item.meta.name]: item }),
      {}
    ),
    surface: data.surface.reduce(
      (items, item) => ({ ...items, [item.meta.name]: item }),
      {}
    ),
    shadows: data.shadows.reduce(
      (items, item) => ({ ...items, [item.meta.name]: item }),
      {}
    ),
    primitives: data.shadows.reduce(
      (items, item) => ({ ...items, [item.meta.name]: item }),
      {}
    ),
  };
}
