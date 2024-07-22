import { Type, type Static } from '@sinclair/typebox'
import { MetaSchema } from './meta'

export const SpacingTypeObjectSchema = Type.Object({
  meta: MetaSchema,
  value: Type.Number(),
})

export type SpacingTypeObjectSchema = Static<typeof SpacingTypeObjectSchema>

export const SpacingSchema = Type.Record(Type.String(), SpacingTypeObjectSchema, { $id: 'spacing' })

export type SpacingSchema = Static<typeof SpacingSchema>
