import { defineConfig } from 'vite';
import {resolve, dirname} from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	build: {
		outDir: './dist'
	},
	plugins: [react()],
});
