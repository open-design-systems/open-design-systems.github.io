import { Static, Type } from '@sinclair/typebox'
import { Nullable } from '../utils'

export type RefType = 'colors' | 'shadows' | 'surface' | 'typography' | 'spacing'

export const ColorRefSchema = Type.Optional(
  Type.Object({
    $ref: Type.String(),
    $refType: Type.Literal('colors'),
  })
)

export const ShadowRefSchema = Type.Optional(
  Type.Object({
    $ref: Type.String(),
    $refType: Type.Literal('shadows'),
  })
)

export const SurfaceRefSchema = Type.Optional(
  Type.Object({
    $ref: Type.String(),
    $refType: Type.Literal('surface'),
  })
)

export const TypographyRefSchema = Type.Optional(
  Type.Object({
    $ref: Type.String(),
    $refType: Type.Literal('typography'),
  })
)
export const SpacingRefSchema = Type.Optional(
  Type.Object({
    $ref: Type.String(),
    $refType: Type.Literal('spacing'),
  })
)

export type ColorRefSchema = Static<typeof ColorRefSchema>
export type ShadowRefSchema = Static<typeof ShadowRefSchema>
export type SurfaceRefSchema = Static<typeof SurfaceRefSchema>
export type TypographyRefSchema = Static<typeof TypographyRefSchema>
export type SpacingRefSchema = Static<typeof SpacingRefSchema>
