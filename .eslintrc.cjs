/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },

  rules: {
    semi: "error",
    indent: ["error", 2],
    quotes: ["error", "double"],
    "prefer-const": "error"
  },

  // Base config
  extends: ["eslint:recommended"],

  overrides: [
    // React
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended"
      ],
      settings: {
        react: {
          version: "detect"
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" }
        ],
        "import/resolver": {
          typescript: {}
        }
      },
      rules: {
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/alt-text": "off",
        "jsx-a11y/media-has-caption": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off"
      }
    },

    // Typescript
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"]
          },
          typescript: {
            alwaysTryTypes: true
          }
        }
      },
      rules: {
        "import/no-named-as-default-member": "off",
        "import/no-named-as-default": "off"
      },
      extends: ["plugin:@typescript-eslint/recommended", "plugin:import/recommended", "plugin:import/typescript"]
    },

    // Node
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true
      }
    }
  ]
};
