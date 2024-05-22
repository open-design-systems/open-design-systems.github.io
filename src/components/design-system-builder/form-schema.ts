import { z } from 'zod';

const rgbaSchema = z.object({
  red: z.string(),
  green: z.string(),
  blue: z.string(),
  alpha: z.string(),
});

const colorSchema = z.object({
  light: z.object({
    hex: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
    rgba: rgbaSchema,
  }),
  dark: z.object({
    hex: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
    rgba: rgbaSchema,
  }),
});

const typographySchema = z.object({
  fontFamily: z.string(),
  fontSize: z.string(),
  fontWeight: z.string(),
  lineHeight: z.string(),
  letterSpacing: z.string(),
});

const shadowOffsetSchema = z.object({
  width: z.number(),
  height: z.number(),
});

const shadowSchema = z.object({
  elevation: z.string(),
  shadowColor: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
  shadowOpacity: z.number(),
  shadowOffset: shadowOffsetSchema,
  shadowRadius: z.number(),
});

const primitiveSizeSchema = z.object({
  fontSize: z.string(),
  padding: z.string(),
  borderRadius: z.string(),
});

const primitiveVariantSchema = z.object({
  backgroundColor: z.string(),
  color: z.string(),
  borderColor: z.string(),
});

const primitiveSchema = z.object({
  default: z.object({
    fontSize: z.string(),
    padding: z.string(),
    borderRadius: z.string(),
  }).partial(),
  size: z.record(primitiveSizeSchema).optional(),
  variant: z.record(primitiveVariantSchema).optional(),
});

const designSystemSchema = z.object({
  id: z.string(),
  meta: z.object({
    name: z.string(),
    description: z.string(),
  }),
  colors: z.record(colorSchema).optional(),
  typography: z.record(typographySchema).optional(),
  spacing: z.record(z.string()).optional(),
  borders: z.object({
    radius: z.record(z.string()).optional(),
    width: z.string().optional(),
    style: z.string().optional(),
  }).optional(),
  shadows: z.record(shadowSchema).optional(),
  primitives: z.object({
    button: primitiveSchema,
  }).optional(),
});

export default designSystemSchema;
