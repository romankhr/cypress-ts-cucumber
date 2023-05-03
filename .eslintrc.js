/** @type {import("eslint").Linter.Config} */
const config = {
  extends: ["prettier", "eslint:recommended"],
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["**/*.ts", "**/*.tsx"],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json", "./cypress/tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-call": "off",
      },
    },
  ],
  root: true,
  reportUnusedDisableDirectives: true,
  ignorePatterns: [".eslintrc.js", "**/*.config.js", "**/*.config.cjs"],
};

module.exports = config;
