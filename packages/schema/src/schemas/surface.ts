import { Type, type Static } from '@sinclair/typebox'
import { MetaSchema } from './meta'
import { ColorRefSchema, ShadowRefSchema } from './ref'
import { Nullable } from '../utils'

export const SurfaceTypeObjectSchema = Type.Object(
  {
    meta: MetaSchema,
    borderColor: Type.Optional(ColorRefSchema),
    borderRadius: Type.Optional(Type.Number()), // move to spacings?
    borderWidth: Type.Optional(Type.Number()),
    boxShadow: Type.Optional(ShadowRefSchema),
    backgroundColor: Type.Optional(ColorRefSchema),
  },
  {}
)

export type SurfaceTypeObjectSchema = Static<typeof SurfaceTypeObjectSchema>

export const SurfaceSchema = Type.Record(Type.String(), SurfaceTypeObjectSchema, { $id: 'surface' })

export type SurfaceSchema = Static<typeof SurfaceSchema>
