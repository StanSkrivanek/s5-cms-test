import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: 'localhost',
		port: 5173,
		strictPort: true,
		hmr: {
			protocol: 'ws', // Ensure WebSocket protocol is used
			host: 'localhost',
			port: 5173
		}
	}
});
