// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['dist/**', 'node_modules/**'], // Ignore built and vendor files
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            // You can add custom rules or override defaults here
            // e.g., "@typescript-eslint/no-unused-vars": "warn"
        },
    }
);