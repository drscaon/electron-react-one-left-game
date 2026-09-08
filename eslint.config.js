module.exports = [
  {
    ignores: [
      'dist/**',
      'release/**',
      'resources/**',
      'node_modules/**',
      'internals/**',
      'flow-typed/**',
      'webpack.config.*.js',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        browser: 'readonly',
        document: 'readonly',
        window: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
    },
  },
];
