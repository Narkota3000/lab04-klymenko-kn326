import js from "@eslint/js"
import globals from "globals"
import eslintConfigPrettier from "eslint-config-prettier/flat"

export default [
  {
    ignores: ["node_modules/**", "legacy/**", "reports/**"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "object-shorthand": ["warn", "always"],
      "max-params": ["error", 3],
      "prefer-arrow-callback": "error",
      "no-nested-ternary": "warn",
      "logical-assignment-operators": ["warn", "always"],
      "max-lines-per-function": ["error", { max: 30, skipBlankLines: true, skipComments: true }],
    },
  },
  eslintConfigPrettier,
]
