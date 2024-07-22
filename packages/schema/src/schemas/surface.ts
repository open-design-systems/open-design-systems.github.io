import { Type, type Static } from '@sinclair/typebox'
import { MetaSchema } from './meta'
import { ColorRefSchema, ShadowRefSchema } from './ref'

export const SurfaceTypeObjectSchema = Type.Object({
  meta: MetaSchema,
  borderColor: ColorRefSchema,
  borderRadius: Type.Number(), // move to spacings?
  borderWidth: Type.Number(),
  boxShadow: ShadowRefSchema,
  backgroundColor: ColorRefSchema,
})

export type SurfaceTypeObjectSchema = Static<typeof SurfaceTypeObjectSchema>

export const SurfaceSchema = Type.Record(Type.String(), SurfaceTypeObjectSchema, { $id: 'surface' })

export type SurfaceSchema = Static<typeof SurfaceSchema>
