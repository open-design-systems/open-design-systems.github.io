import { Spacings } from '@opends/schema'

export function makeSpacingVariables(spacings: Spacings.SpacingSchema) {
  return {
    ...Object.keys(spacings).reduce(
      (acc, key) => {
        acc[key] = `${spacings[key].value}px`

        return acc
      },
      {} as Record<string, string>
    ),
  }
}
