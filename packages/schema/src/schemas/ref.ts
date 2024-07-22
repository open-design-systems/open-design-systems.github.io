import { Static, Type } from '@sinclair/typebox'

export type RefType = 'colors' | 'shadows' | 'surface' | 'typography' | 'spacing'

export const ColorRefSchema = Type.Object({
  $ref: Type.String(),
  $refType: Type.Literal('colors'),
})

export const ShadowRefSchema = Type.Object({
  $ref: Type.String(),
  $refType: Type.Literal('shadows'),
})

export const SurfaceRefSchema = Type.Object({
  $ref: Type.String(),
  $refType: Type.Literal('surface'),
})

export const TypographyRefSchema = Type.Object({
  $ref: Type.String(),
  $refType: Type.Literal('typography'),
})
export const SpacingRefSchema = Type.Object({
  $ref: Type.String(),
  $refType: Type.Literal('spacing'),
})

export type ColorRefSchema = Static<typeof ColorRefSchema>
export type ShadowRefSchema = Static<typeof ShadowRefSchema>
export type SurfaceRefSchema = Static<typeof SurfaceRefSchema>
export type TypographyRefSchema = Static<typeof TypographyRefSchema>
export type SpacingRefSchema = Static<typeof SpacingRefSchema>
