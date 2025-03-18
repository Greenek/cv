import js from '@eslint/js';
import markdown from '@eslint/markdown';
import html from 'eslint-plugin-html';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';

export default [
  js.configs.recommended,
  ...markdown.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 2022,
        projectService: true,
        sourceType: 'module',
      },
    },
  },
  {
    files: ['src/**/*.js'],
  },
  {
    files: ['src/**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        extraFileExtensions: ['.svelte'],
      },
    },
  },
  {
    files: ['**/*.md'],
    rules: {
      'markdown/heading-increment': 'off',
      'no-irregular-whitespace': 'off',
    },
  },
  {
    files: ['**/*.html'],
    plugins: { html },
  },
];
