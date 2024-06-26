import { z } from "zod";
import { nanoid } from "nanoid";

export const metaSchema = z.object({
  id: z.string().default(() => nanoid()),
  name: z.string(),
  description: z.string(),
});

const rgbaSchema = z.object({
  red: z.string(),
  green: z.string(),
  blue: z.string(),
  alpha: z.string(),
});

const rawColorSchema = z.object({
  hex: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
  rgba: rgbaSchema,
});

const colorSchema = z.object({
  meta: metaSchema,
  light: rawColorSchema,
  dark: rawColorSchema,
});

export const typographySchema = z.object({
  meta: metaSchema,
  fontFamily: z.string(),
  fontSize: z.string(),
  fontWeight: z.string(),
  lineHeight: z.string(),
  letterSpacing: z.string(),
});

export const spacingSchema = z.object({
  meta: metaSchema,
  value: z.number(),
});

export const surfaceSchema = z.object({
  meta: metaSchema,
  borderColor: z.string().optional(),
  borderRadius: z.number().optional(),
  borderWidth: z.number().optional(),
  boxShadow: z.string().optional(),
  backgroundColor: z.string().optional(),
});

const shadowsSchema = z.object({
  meta: metaSchema,
  shadowColor: z.string(),
  shadowOpacity: z.number(),
  shadowOffset: z.object({
    width: z.number(),
    height: z.number(),
  }),
  shadowRadius: z.number(),
});

export const primitiveButtonSchema = z.object({
  meta: metaSchema,
  type: z.literal("button"),
  surfaceId: z.string(),
  typographyId: z.string(),
  spacingId: z.string(),
});

export const primitiveTextSchema = z.object({
  meta: metaSchema,
  type: z.literal("text"),
  typographyId: z.string(),
});

export const primitivesSchema = z.union([
  primitiveButtonSchema,
  primitiveTextSchema,
]);

const designSystemSchema = z.object({
  id: z.string().default(() => nanoid()),
  meta: metaSchema,
  colors: z.array(colorSchema),
  typography: z.array(typographySchema),
  spacing: z.array(spacingSchema),
  surface: z.array(surfaceSchema),
  shadows: z.array(shadowsSchema),
  primitives: z.array(primitivesSchema),
});

export default designSystemSchema;
