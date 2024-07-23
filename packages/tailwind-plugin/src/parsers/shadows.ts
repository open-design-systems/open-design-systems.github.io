import { Colors, Shadows } from '@opends/schema'
import { findReference } from '../utils'

export function parseShadows(shadows: Shadows.ShadowsSchema, colors: Colors.ColorsSchema) {
  return Object.keys(shadows).reduce(
    (acc, key) => {
      const shadowConfig = shadows[key]

      const color = findReference(colors, shadowConfig.shadowColor)

      acc.styles = {
        ...acc.styles,
        [`--shadows-${key}`]: `${shadowConfig.shadowOffset.width || 0}px ${shadowConfig.shadowOffset.height || 0}px ${shadowConfig.shadowRadius || 0}px var(--color-${color})`,
      }

      return acc
    },
    {} as { styles: Record<string, string> }
  )
}

export function makeShadowVariables(shadows: Shadows.ShadowsSchema) {
  return {
    ...Object.keys(shadows).reduce(
      (acc, key) => {
        acc[key] = `var(--shadows-${key})`
        return acc
      },
      {} as Record<string, string>
    ),
  }
}
