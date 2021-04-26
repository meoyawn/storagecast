module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
  },
  plugins: [
    '@typescript-eslint',
    "react",
    "jsx-a11y",
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "eqeqeq": ["error", "always"],
    "no-console": "error",

    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": ["error", {
      'ts-expect-error': true,
      'ts-ignore': 'allow-with-description',
      'ts-nocheck': true,
      'ts-check': 'allow-with-description',
      "minimumDescriptionLength": 1,
    }],
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

    "jsx-a11y/media-has-caption": "off",
  },
}
