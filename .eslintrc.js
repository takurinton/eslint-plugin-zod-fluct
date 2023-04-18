module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["local-rules", "@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    "no-extra-semi": "error",
    quotes: ["error", "double"],
    "space-before-blocks": ["error", { functions: "always" }],
    "no-undef": ["off"],
    "local-rules/number": "error",
    "local-rules/string": "error",
    "local-rules/utils": "error",
  },
};
