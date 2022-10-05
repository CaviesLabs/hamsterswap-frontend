module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
  ignorePatterns: [".storybook", "**/*.stories.*"],
};
