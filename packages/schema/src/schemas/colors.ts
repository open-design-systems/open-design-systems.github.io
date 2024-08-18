import { Type, type Static } from '@sinclair/typebox'
import { MetaSchema } from './meta'

export const ColorObjectSchema = Type.Object({
  hex: Type.String({
    pattern: '^#(?:[0-9a-fA-F]{3,4}){1,2}$',
    errorMessage: 'Invalid hex color',
  }),
  rgba: Type.Object({
    red: Type.Number({ maximum: 255, minimum: 0 }),
    blue: Type.Number({ maximum: 255, minimum: 0 }),
    green: Type.Number({ maximum: 255, minimum: 0 }),
    alpha: Type.Number({ maximum: 1, minimum: 0, default: 1 }),
  }),
})

export const ColorTypeObjectSchema = Type.Object({
  meta: MetaSchema,
  light: ColorObjectSchema,
  dark: ColorObjectSchema,
})

export type ColorTypeObjectSchema = Static<typeof ColorTypeObjectSchema>

export const ColorsSchema = Type.Record(Type.String(), ColorTypeObjectSchema, { $id: 'colors' })

export type ColorsSchema = Static<typeof ColorsSchema>
