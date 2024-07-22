import { Type, type Static } from '@sinclair/typebox'

export const MetaSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    description: Type.String(),
  },
  { $id: 'meta' }
)

export type MetaSchema = Static<typeof MetaSchema>
