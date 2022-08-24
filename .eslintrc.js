module.exports = {
  root: true,
  env: {
    node: true,
    // TODO
    'vue/setup-compiler-macros': true,
  },
  globals: { defineOptions: 'writable' },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    '@vue/prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'no-console': 1,
    'no-param-reassign': 0,
    'func-names': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    // import规则目前未添加 vite.config.js
    // fix: 'vite' should be listed in the project's dependencies, not devDependencies.
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/vite.config.ts', '**/mock/index.ts'] },
    ],
    'import/prefer-default-export': 0,
    // 引用ts和js文件不用添加后缀
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        arrowParens: 'always',
        endOfLine: 'auto',
        htmlWhitespaceSensitivity: 'ignore',
      },
    ],

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',

    'vue/multi-word-component-names': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.vue', '.js', '.ts'],
      },
    },
  },
};
