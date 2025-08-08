import path from 'node:path';
import { fileURLToPath } from 'node:url';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/lib/**'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: [
          path.resolve(__dirname, 'apps/web/tsconfig.json'),
          path.resolve(__dirname, 'apps/functions/tsconfig.json'),
        ],
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...tseslint.configs['recommended'].rules,
      ...prettierConfig.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    rules: {
      ...reactPlugin.configs['recommended'].rules,
      ...hooksPlugin.configs['recommended'].rules,
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
