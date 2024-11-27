module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['prettier', 'plugin:prettier/recommended', 'plugin:json/recommended'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js'],
      },
    },
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'filename-rules'],
  rules: {
    'jest/no-done-callback': 0,
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    '@typescript-eslint/naming-convention': 0,
    'prettier/prettier': 'error',
    'no-underscore-dangle': ['error', { allow: ['_getHeaders', '_getData', '_unsafeUnwrap', '_unsafeUnwrapErr'] }],
    'no-unused-expressions': [
      2,
      {
        allowTernary: true,
      },
    ],
    '@typescript-eslint/no-floating-promises': 0,
  },
  ignorePatterns: ['__mocks__/', 'jest.setup.ts'],
};
