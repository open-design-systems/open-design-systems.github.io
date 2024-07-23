import { Colors, Shadows, Surfaces } from '@opends/schema'
import { findReference } from '../utils'

export function parseSurfaceComponents(
  surface: Surfaces.SurfaceSchema,
  colors: Colors.ColorsSchema,
  shadows: Shadows.ShadowsSchema
) {
  return Object.keys(surface).reduce(
    (acc, key) => {
      const surfaceConfig = surface[key]

      const componentClass = {
        [`.${key}`]: {
          ...(surfaceConfig.borderRadius && {
            borderRadius: `var(--surface-${key}-border-radius)`,
          }),
          ...(surfaceConfig.borderWidth && {
            borderWidth: `var(--surface-${key}-border-width)`,
          }),
          ...(surfaceConfig.boxShadow && {
            boxShadow: `var(--shadows-${findReference(shadows, surfaceConfig.boxShadow)})`,
          }),
          ...(surfaceConfig.borderColor && {
            borderColor: `var(--color-${findReference(colors, surfaceConfig.borderColor)})`,
          }),
          ...(surfaceConfig.backgroundColor && {
            backgroundColor: `var(--color-${findReference(colors, surfaceConfig.backgroundColor)})`,
          }),
        },
      }

      acc.components = {
        ...acc.components,
        ...componentClass,
      }
      acc.styles = {
        ...acc.styles,
        ...(surfaceConfig.borderRadius && {
          [`--surface-${key}-border-radius`]: `${surfaceConfig.borderRadius}px`,
        }),
        ...(surfaceConfig.borderWidth && {
          [`--surface-${key}-border-width`]: `${surfaceConfig.borderWidth}px`,
        }),
        ...(surfaceConfig.boxShadow && {
          [`--surface-${key}-box-shadow`]:
            findReference(shadows, surfaceConfig.boxShadow) || 'inherit',
        }),
      }

      return acc
    },
    { components: {}, styles: {} } as {
      components: Record<string, Record<string, any>>
      styles: Record<string, string>
    }
  )
}
