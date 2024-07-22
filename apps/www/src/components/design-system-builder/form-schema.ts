import { nanoid } from "nanoid";
import { Static, Type } from "@sinclair/typebox";
import {
  Colors,
  Typographies,
  Meta,
  Spacings,
  Surfaces,
  Shadows,
  Primitives,
} from "@opends/schema";

const designSystemSchema = Type.Object({
  id: Type.String({ default: nanoid }),
  meta: Meta.MetaSchema,
  colors: Type.Array(Colors.ColorTypeObjectSchema),
  typography: Type.Array(Typographies.TypographyTypeObjectSchema),
  spacing: Type.Array(Spacings.SpacingTypeObjectSchema),
  surface: Type.Array(Surfaces.SurfaceTypeObjectSchema),
  shadows: Type.Array(Shadows.ShadowTypeObjectSchema),
  primitives: Type.Array(Primitives.PrimitivesTypeObjectSchema),
});

export type DesignSystemSchema = Static<typeof designSystemSchema>;

export default designSystemSchema;
