import { Type, type Static } from '@sinclair/typebox'
import { MetaSchema } from './meta'
import { SurfaceRefSchema, TypographyRefSchema, SpacingRefSchema } from './ref'

export const ButtonTypeSchema = Type.Object({
  type: Type.Literal('button'),
  meta: MetaSchema,
  surfaceId: SurfaceRefSchema,
  typographyId: TypographyRefSchema,
  spacingId: SpacingRefSchema,
})

export type ButtonTypeSchema = Static<typeof ButtonTypeSchema>

export const TextTypeSchema = Type.Object({
  type: Type.Literal('text'),
  meta: MetaSchema,
  typographyId: TypographyRefSchema,
})

export type TextTypeSchema = Static<typeof TextTypeSchema>

export const PrimitivesTypeObjectSchema = Type.Union([ButtonTypeSchema, TextTypeSchema])

export type PrimitivesTypeObjectSchema = Static<typeof PrimitivesTypeObjectSchema>

export const PrimitivesSchema = Type.Record(Type.String(), PrimitivesTypeObjectSchema, {
  $id: 'primitives',
})

export type PrimitivesSchema = Static<typeof PrimitivesSchema>
