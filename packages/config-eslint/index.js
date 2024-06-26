/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: [
      "turbo",
      "eslint:recommended",
      "plugin:jest/recommended",
      "plugin:@typescript-eslint/strict-type-checked",
      "plugin:@typescript-eslint/stylistic-type-checked",
      "plugin:deprecation/recommended",
      "prettier",
    ],
    env: {
      es2022: true,
      node: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: true,
    },
    plugins: ["@typescript-eslint", "import", "jest", "@stylistic", "only-warn"],
    rules: {
      "no-console": ["error", { allow: ["debug", "warn", "error"] }],
  
      "jest/expect-expect": [
        "error",
        {
          assertFunctionNames: ["expect", "expect*"],
        },
      ],
  
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
  
      // This requires us to first enable this tsconfig rule: https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
  
      // A concentrated effort is required to enable this prefer-promise-reject-errors rule.
      // It's definitely worth the effort, but requires some thought into how to handle the cases where the linter fails.
      "@typescript-eslint/prefer-promise-reject-errors": "off",
  
      "@typescript-eslint/prefer-reduce-type-parameter": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "prefer-template": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["classMethod"],
          format: ["camelCase"],
        },
      ],
      // Ideally prettier would handle this, but currently it doesn't offer this feature.
      "@stylistic/lines-between-class-members": [
        "error",
        {
          enforce: [
            { blankLine: "always", prev: "*", next: "method" },
            { blankLine: "always", prev: "method", next: "*" },
            { blankLine: "never", prev: "field", next: "field" },
          ],
        },
      ],
    },
    overrides: [
      {
        files: ["**/__tests__/**"],
        rules: {
          // Unbound methods are common in jest tests. It's unmanageable to enable this rule for tests.
          "@typescript-eslint/unbound-method": "off",
        },
      },
    ],
    ignorePatterns: [
      "**/.eslintrc.cjs",
      "**/.eslintrc.js",
      "**/*.config.js",
      "**/*.config.cjs",
      "**/reportGeneration.mjs",
      "config/eslint-config-custom/**",
      ".next",
      "dist",
      "pnpm-lock.yaml",
    ],
    reportUnusedDisableDirectives: true,
  };