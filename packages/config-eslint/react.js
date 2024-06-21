/** @type {import('eslint').Linter.Config} */
const config = {
    extends: [
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:@tanstack/eslint-plugin-query/recommended",
    ],
    plugins: ["testing-library"],
    rules: {
      "react/prop-types": "off",
    },
    overrides: [
      {
        files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)"],
        extends: ["plugin:testing-library/react"],
      },
    ],
    globals: {
      React: "writable",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    env: {
      browser: true,
    },
  };
  
  module.exports = config;