import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Include Node.js globals
      },
      parserOptions: {
        ecmaVersion: 2021, // Ensure compatibility with modern JavaScript features
        sourceType: "module", // If using ES modules
      },
    },
  },
  pluginJs.configs.recommended,
];
