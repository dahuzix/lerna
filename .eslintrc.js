module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'semi': [2, 'always'], // 语句强制分号结尾
    'no-console': 0, // 禁止使用console
    'prefer-const': 0 // 使用const 代替let
  },
};
