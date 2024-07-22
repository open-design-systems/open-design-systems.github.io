import { Type, type Static } from '@sinclair/typebox'
import { MetaSchema } from './meta'
import { ColorRefSchema } from './ref'

export const ShadowTypeObjectSchema = Type.Object({
  meta: MetaSchema,
  elevation: Type.Number(),
  shadowColor: ColorRefSchema,
  shadowOpacity: Type.Number(),
  shadowOffset: Type.Object({
    width: Type.Number(),
    height: Type.Number(),
  }),
  shadowRadius: Type.Number(), // move to spacings?
})

export const ShadowsSchema = Type.Record(Type.String(), ShadowTypeObjectSchema, { $id: 'shadows' })

export type ShadowsSchema = Static<typeof ShadowsSchema>
