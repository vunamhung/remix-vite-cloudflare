/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: ['!**/.server', '!**/.client'],

  // Base config
  extends: ['eslint:recommended', 'plugin:valtio/recommended', 'prettier'],

  overrides: [
    // React
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: ['react', 'jsx-a11y'],
      extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended', 'plugin:jsx-a11y/recommended'],
      settings: {
        react: {
          version: 'detect',
        },
        formComponents: ['Form'],
        linkComponents: [
          { name: 'Link', linkAttribute: 'to' },
          { name: 'NavLink', linkAttribute: 'to' },
        ],
        'import/resolver': {
          typescript: {},
        },
      },
    },

    // Typescript
    {
      files: ['**/*.{ts,tsx}'],
      plugins: ['@typescript-eslint', 'import'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/internal-regex': '^~/',
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        'valtio/state-snapshot-rule': 1,
        'valtio/avoid-this-in-proxy': 1,
        'no-console': [1, { allow: ['warn', 'error'] }],
        'no-unused-vars': 1,
        '@typescript-eslint/no-unused-vars': 0,
        'no-new-object': 1,
        'no-array-constructor': 1,
        'no-new-func': 1,
        'no-var': 1,
        'object-shorthand': 1,
        'no-prototype-builtins': 1,
        'no-eval': 1,
        'prefer-spread': 1,
        'no-param-reassign': 1,
        'prefer-arrow-callback': 1,
        'no-confusing-arrow': 1,
        'no-useless-constructor': 1,
        'no-dupe-class-members': 1,
        'prefer-const': 1,
        'no-multi-assign': 1,
        'no-plusplus': 1,
        eqeqeq: 1,
      },
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/recommended', 'plugin:import/typescript'],
    },

    // Node
    {
      files: ['.eslintrc.cjs'],
      env: {
        node: true,
      },
    },
  ],
};
