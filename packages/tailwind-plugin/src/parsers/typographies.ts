import { Typographies } from '@opends/schema'

export function makeTypographyVariables(typographies: Typographies.TypographySchema) {
  return {
    ...Object.keys(typographies).reduce(
      (acc, key) => {
        const typographyConfig = typographies[key]
        return {
          fontFamily: {
            ...acc.fontFamily,
            [key]: typographyConfig.fontFamily,
          },
          fontSize: {
            ...acc.fontSize,
            [key]: [`${typographyConfig.fontSize}px`, `${typographyConfig.lineHeight}px`],
          },
          fontWeight: {
            ...acc.fontWeight,
            [key]: typographyConfig.fontWeight,
          },
          letterSpacing: {
            ...acc.letterSpacing,
            [key]: typographyConfig.letterSpacing,
          },
        }
      },
      {
        fontFamily: {},
        fontSize: {},
        fontWeight: {},
        letterSpacing: {},
      }
    ),
  }
}
