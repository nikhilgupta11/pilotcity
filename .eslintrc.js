module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended' // add prettier-eslint plugin which will uses the `.prettierrc.js` config
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser', // the typescript-parser for eslint, instead of tslint
    ecmaVersion: 2020
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-underscore-dangle': 'off',
    'vue/no-unused=vars': 'off',
    'vue/valid-v-slot': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'vue/component-tags-order': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/no-lone-template': 'off',
    'vue/no-template-shadow': 'off',
    'no-shadow': 'off',
    'vue/require-prop-types': 'off',
    'vue/no-v-html': 'off',
    camelcase: 'off',
    'import/no-extraneous-dependencies': 'off'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
};
