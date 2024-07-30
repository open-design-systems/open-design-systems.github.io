import plugin from 'tailwindcss/plugin'
import { Config } from 'tailwindcss'
import fs from 'fs'
import path from 'path'
import { makeColorVariables, parseColors } from './parsers/colors'
import { makeShadowVariables, parseShadows } from './parsers/shadows'
import { parseSurfaceComponents } from './parsers/surface'
import { OpenDesignSystemSchema, Validator, OpenDSValidationError } from '@opends/schema'
import { makeSpacingVariables } from './parsers/spacings'
import { makeTypographyVariables } from './parsers/typographies'

function getOpenDesignSystemConfig(configFile: string): OpenDesignSystemSchema | undefined {
  const designSystemPath = path.resolve(process.cwd(), configFile)

  try {
    const designSystemData = fs.readFileSync(designSystemPath, 'utf8')
    console.log('Open Design System config loaded!')
    return Validator(JSON.parse(designSystemData))
  } catch (error) {
    if (error instanceof OpenDSValidationError) {
      console.error('Open Design System config validation error:', error.errors)
      return
    }

    console.error('Error reading Open Design System config:', error)
  }
}

function getDarkModeSelector(darkMode: Config['darkMode']) {
  return darkMode === 'class' ? '.dark' : '@media (prefers-color-scheme: dark)'
}

const DEFAULT_CONFIG_FILE = 'open-design-system.json'

type PluginOptions = {
  designSystemConfig?: string
}

const DEFAULT_OPTIONS: PluginOptions = { designSystemConfig: DEFAULT_CONFIG_FILE }

module.exports = plugin.withOptions(
  (pluginOptions: PluginOptions) => {
    return function ({ addBase, addComponents, config }) {
      const { designSystemConfig } = pluginOptions ?? DEFAULT_OPTIONS
      if (!designSystemConfig) {
        console.error('Open Design System config file not provided. Skipping Tailwind CSS plugin.')
        return
      }
      const openDesignSystem = getOpenDesignSystemConfig(designSystemConfig)
      if (!openDesignSystem) {
        console.info(
          'Open Design System config not found or error while validating it. Skipping Tailwind CSS plugin.'
        )
        return
      }

      const colors = openDesignSystem.colors || {}
      const surface = openDesignSystem.surface || {}
      const shadows = openDesignSystem.shadows || {}

      const { darkColors, lightColors } = parseColors(colors)

      const { styles: surfaceStyles, components: surfaceComponets } = parseSurfaceComponents(
        surface,
        colors,
        shadows
      )

      const { styles: shadowsStyle } = parseShadows(shadows, colors)

      addComponents(surfaceComponets)

      addBase({
        ':root': {
          ...lightColors,
          ...surfaceStyles,
          ...shadowsStyle,
        },
        [getDarkModeSelector(config('darkMode'))]: {
          ':root': darkColors,
        },
      })
    }
  },
  (pluginOptions: PluginOptions) => {
    const { designSystemConfig } = pluginOptions ?? DEFAULT_OPTIONS
    if (!designSystemConfig) {
      console.error('Open Design System config file not provided. Skipping Tailwind CSS plugin.')
      return {}
    }
    const openDesignSystem = getOpenDesignSystemConfig(designSystemConfig)

    if (!openDesignSystem) {
      console.info(
        'Open Design System config not found or error while validating it. Skipping Tailwind CSS plugin.'
      )
      return {}
    }

    const systemColors = openDesignSystem.colors || {}
    const systemSpacing = openDesignSystem.spacing || {}
    const systemShadows = openDesignSystem.shadows || {}
    const systemTypography = openDesignSystem.typography || {}

    const colors = makeColorVariables(systemColors)
    const spacing = makeSpacingVariables(systemSpacing)
    const shadows = makeShadowVariables(systemShadows)
    const typography = makeTypographyVariables(systemTypography)

    return {
      theme: {
        extend: {
          colors,
          spacing,
          boxShadow: shadows,
          ...typography,
        },
      },
    }
  }
)
