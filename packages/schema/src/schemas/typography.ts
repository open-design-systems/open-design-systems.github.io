import { Type, type Static } from '@sinclair/typebox'
import { MetaSchema } from './meta'

export const TypographyTypeObjectSchema = Type.Object({
  meta: MetaSchema,
  fontFamily: Type.String(),
  fontSize: Type.Number(),
  fontWeight: Type.Number(),
  lineHeight: Type.Number(),
  letterSpacing: Type.Number(),
})

export type TypographyTypeObjectSchema = Static<typeof TypographyTypeObjectSchema>

export const TypographySchema = Type.Record(Type.String(), TypographyTypeObjectSchema, {
  $id: 'typography',
})

export type TypographySchema = Static<typeof TypographySchema>
