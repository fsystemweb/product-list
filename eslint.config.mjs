// eslint.config.js
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import typescriptEnum from 'eslint-plugin-typescript-enum';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  // Ignore patterns
  {
    ignores: ['*.spec.ts']
  },
  
  // TypeScript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@angular-eslint': angular,
      '@typescript-eslint': typescriptEslint,
      'import': importPlugin,
      'unused-imports': unusedImports,
      'typescript-enum': typescriptEnum
    },
    rules: {
      // Angular rules
      '@angular-eslint/directive-selector': [
        'error',
        {
          'type': 'attribute',
          'prefix': 'app',
          'style': 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          'type': 'element',
          'prefix': 'app',
          'style': 'kebab-case'
        }
      ],
      '@angular-eslint/use-lifecycle-interface': 'error',
      
      // TypeScript rules
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          'accessibility': 'no-public',
          'overrides': {
            'constructors': 'off'
          }
        }
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          'default': ['field', 'constructor', 'public-method', 'protected-method', 'private-method']
        }
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      
      // Import rules
      'import/exports-last': 'error',
      'import/group-exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      
      // General rules
      'eqeqeq': ['error', 'smart'],
      'max-depth': ['error', 4],
      'prefer-const': 'error',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always']
    },
    // Including all the extends as individual configs would be complex in flat config
    // This is a simplified approach that applies their rules directly
  },
  
  // JavaScript files
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {}
  },
  
  // Angular templates
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplate
    },
    languageOptions: {
      parser: angularTemplateParser
    },
    rules: {}
  }
];