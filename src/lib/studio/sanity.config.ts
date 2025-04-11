import { schemaTypes } from '$lib/studio/schemaTypes';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
	projectId: '45tneue6',
	dataset: 'production',
	basePath: '/studio',
	unstable_noAuthBoundary: true,
	apiVersion: '2025-04-11',
	title: 'Yummy recipes',
	plugins: [
		structureTool(),
		visionTool({
			defaultApiVersion: '2025-04-11',
			defaultDataset: 'production'
		})
	],
	schema: {
		types: schemaTypes
	},
	websocketOptions: {
		// apiVersion: '2023-05-03', // Explicitly set for WebSockets
		// Add reconnection options to help with initial connection issues
		reconnect: {
			initialDelay: 100,
			maxDelay: 2000,
			maxAttempts: 5
		}
	},
	description: 'A Sanity Studio for Yummy Recipes'
});
