import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
	},
	resolve: {
		alias: {
			schemas: path.resolve(__dirname, './src/schemas'),
			types: path.resolve(__dirname, './src/types'),
			utils: path.resolve(__dirname, './src/utils'),
			repositories: path.resolve(__dirname, './src/repositories'),
			services: path.resolve(__dirname, './src/services'),
			middleware: path.resolve(__dirname, './src/middleware'),
			sanitizers: path.resolve(__dirname, './src/sanitizers'),
			validations: path.resolve(__dirname, './src/validations'),
		},
	},
})
