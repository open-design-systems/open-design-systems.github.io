import { Meta, Ref } from '@opends/schema'

type RefValue =
  | Ref.ColorRefSchema
  | Ref.TypographyRefSchema
  | Ref.SpacingRefSchema
  | Ref.SurfaceRefSchema
  | Ref.ShadowRefSchema

type Schema = {} & { meta: Meta.MetaSchema }
type SystemRef = Record<string, Schema>

export function findReference(systemRef: SystemRef, value: RefValue) {
  return Object.keys(systemRef).find((key: string) => systemRef[key].meta.id === value.$ref)
}
