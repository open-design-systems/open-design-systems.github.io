const plugin = require("tailwindcss/plugin");
const fs = require("fs");
const path = require("path");

function getOpenDesignSystemConfig(configFile) {
  const designSystemPath = path.resolve(process.cwd(), configFile);

  try {
    const designSystemData = fs.readFileSync(designSystemPath, "utf8");
    console.log("Open Design System config loaded!");
    return JSON.parse(designSystemData);
  } catch (error) {
    console.error("Error reading Open Design System config:", error);
  }
}

function parseColors(colors) {
  const lightColors = Object.keys(colors).reduce((acc, key) => {
    if (colors[key].light) {
      acc[`--color-${key}`] =
        `rgba(${colors[key].light.rgba.red}, ${colors[key].light.rgba.green}, ${colors[key].light.rgba.blue}, ${colors[key].light.rgba.alpha})`;
    }
    return acc;
  }, {});

  const darkColors = Object.keys(colors).reduce((acc, key) => {
    if (colors[key].dark) {
      acc[`--color-${key}`] =
        `rgba(${colors[key].dark.rgba.red}, ${colors[key].dark.rgba.green}, ${colors[key].dark.rgba.blue}, ${colors[key].dark.rgba.alpha})`;
    }
    return acc;
  }, {});

  return {
    lightColors,
    darkColors,
  };
}

function getDarkModeSelector(darkMode) {
  return darkMode === "class" ? ".dark" : "@media (prefers-color-scheme: dark)";
}

function findReference(systemRef, value) {
  return Object.keys(systemRef).find((key) => systemRef[key].meta.id === value);
}

function parseSurfaceComponents(surface, colors, shadows) {
  return Object.keys(surface).reduce((acc, key) => {
    const surfaceConfig = surface[key];

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
    };

    acc.components = {
      ...acc.components,
      ...componentClass,
    };
    acc.styles = {
      ...acc.styles,
      ...(surfaceConfig.borderRadius && {
        [`--surface-${key}-border-radius`]: `${surfaceConfig.borderRadius}px`,
      }),
      ...(surfaceConfig.borderWidth && {
        [`--surface-${key}-border-width`]: `${surfaceConfig.borderWidth}px`,
      }),
      ...(surfaceConfig.boxShadow && {
        [`--surface-${key}-box-shadow`]: surfaceConfig.boxShadow,
      }),
    };

    return acc;
  }, {});
}

function parseShadows(shadows, colors) {
  return Object.keys(shadows).reduce((acc, key) => {
    const shadowConfig = shadows[key];

    const color = findReference(colors, shadowConfig.shadowColor);

    acc.styles = {
      ...acc.styles,
      [`--shadows-${key}`]: `${shadowConfig.shadowOffset.width || 0}px ${shadowConfig.shadowOffset.height || 0}px ${shadowConfig.shadowRadius || 0}px var(--color-${color})`,
    };

    return acc;
  }, {});
}

module.exports = plugin.withOptions(
  ({ designSystemConfig = "open-design-system.json" } = {}) => {
    return function ({ addBase, addComponents, config }) {
      const openDesignSystem = getOpenDesignSystemConfig(designSystemConfig);

      const colors = openDesignSystem.colors || {};
      const surface = openDesignSystem.surface || {};
      const shadows = openDesignSystem.shadows || {};

      const { darkColors, lightColors } = parseColors(colors);

      const { styles: surfaceStyles, components: surfaceComponets } =
        parseSurfaceComponents(surface, colors, shadows);

      const { styles: shadowsStyle } = parseShadows(shadows, colors);

      addComponents(surfaceComponets);

      addBase({
        ":root": {
          ...lightColors,
          ...surfaceStyles,
          ...shadowsStyle,
        },
        [getDarkModeSelector(config("darkMode"))]: {
          ":root": darkColors,
        },
      });
    };
  },
  function ({ designSystemConfig = "open-design-system.json" } = {}) {
    const openDesignSystem = getOpenDesignSystemConfig(designSystemConfig);

    const systemColors = openDesignSystem.colors || {};
    const systemSpacing = openDesignSystem.spacing || {};
    const systemShadows = openDesignSystem.shadows || {};
    const systemTypography = openDesignSystem.typography || {};

    const colors = {
      ...Object.keys(systemColors).reduce((acc, key) => {
        acc[key] = `var(--color-${key})`;
        return acc;
      }, {}),
    };
    const spacing = {
      ...Object.keys(systemSpacing).reduce((acc, key) => {
        acc[key] = `${systemSpacing[key].value}px`;

        return acc;
      }, {}),
    };

    const shadows = {
      ...Object.keys(systemShadows).reduce((acc, key) => {
        acc[key] = `var(--shadows-${key})`;

        return acc;
      }, {}),
    };

    const typography = {
      ...Object.keys(systemTypography).reduce(
        (acc, key) => {
          const typographyConfig = systemTypography[key];
          return {
            fontFamily: {
              ...acc.fontFamily,
              [key]: typographyConfig.fontFamily,
            },
            fontSize: {
              ...acc.fontSize,
              [key]: [
                `${typographyConfig.fontSize}px`,
                `${typographyConfig.lineHeight}px`,
              ],
            },
            fontWeight: {
              ...acc.fontWeight,
              [key]: typographyConfig.fontWeight,
            },
            letterSpacing: {
              ...acc.letterSpacing,
              [key]: typographyConfig.letterSpacing,
            },
          };
        },
        {
          fontFamily: {},
          fontSize: {},
          fontWeight: {},
          letterSpacing: {},
        },
      ),
    };

    return {
      theme: {
        extend: {
          colors,
          spacing,
          boxShadow: shadows,
          ...typography,
        },
      },
    };
  },
);
