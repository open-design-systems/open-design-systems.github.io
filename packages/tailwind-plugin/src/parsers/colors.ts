import { Colors } from '@opends/schema'

export function parseColors(colors: Colors.ColorsSchema) {
  const lightColors = Object.keys(colors).reduce(
    (acc, key) => {
      if (colors[key].light) {
        acc[`--color-${key}`] =
          `rgba(${colors[key].light.rgba.red}, ${colors[key].light.rgba.green}, ${colors[key].light.rgba.blue}, ${colors[key].light.rgba.alpha})`
      }
      return acc
    },
    {} as Record<string, string>
  )

  const darkColors = Object.keys(colors).reduce(
    (acc, key) => {
      if (colors[key].dark) {
        acc[`--color-${key}`] =
          `rgba(${colors[key].dark.rgba.red}, ${colors[key].dark.rgba.green}, ${colors[key].dark.rgba.blue}, ${colors[key].dark.rgba.alpha})`
      }
      return acc
    },
    {} as Record<string, string>
  )

  return {
    lightColors,
    darkColors,
  }
}

export function makeColorVariables(colors: Colors.ColorsSchema) {
  return {
    ...Object.keys(colors).reduce(
      (acc, key) => {
        acc[key] = `var(--color-${key})`
        return acc
      },
      {} as Record<string, string>
    ),
  }
}
