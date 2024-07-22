import { ObjectOptions, Type, type Static } from '@sinclair/typebox'
import { MetaSchema } from './meta'
import { ColorsSchema } from './colors'
import { TypographySchema } from './typography'
import { PrimitivesSchema } from './primitives'
import { SpacingSchema } from './spacing'
import { SurfaceSchema } from './surface'
import { ShadowsSchema } from './shadows'

const metadata: ObjectOptions = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Open Design System',
  description: 'Open Design System',
  version: '0.1.0',
} as const

export const OpenDesignSystemSchema = Type.Object(
  {
    id: Type.String({
      default: 'open-design-system',
      description: 'The unique identifier for the design system',
    }),
    meta: MetaSchema,
    colors: ColorsSchema,
    typography: TypographySchema,
    spacing: SpacingSchema,
    surface: SurfaceSchema,
    shadows: ShadowsSchema,
    primitives: PrimitivesSchema,
  },
  metadata
)
export type OpenDesignSystemSchema = Static<typeof OpenDesignSystemSchema>
