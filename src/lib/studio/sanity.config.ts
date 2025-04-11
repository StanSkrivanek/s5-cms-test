import { schemaTypes } from '$lib/studio/schemaTypes';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { env } from '$env/dynamic/private';

export default defineConfig({
	projectId: env.VITE_PUBLIC_SANITY_PROJECT_ID,
	dataset: env.VITE_PUBLIC_SANITY_DATASET,
	basePath: '/studio',

	unstable_noAuthBoundary: true,
	apiVersion: env.VITE_PUBLIC_SANITY_API_VERSION,
	title: 'Yummy recipes',

	plugins: [
		structureTool(),
		visionTool({
			defaultApiVersion: env.VITE_PUBLIC_SANITY_API_VERSION,
			defaultDataset: env.VITE_PUBLIC_SANITY_DATASET
		})
	],

	schema: {
		types: schemaTypes
	},

	websocketOptions: {
		apiVersion: '2025-04-11', // Explicitly set for WebSockets
		// Add reconnection options to help with initial connection issues
		reconnect: {
			initialDelay: 100,
			maxDelay: 2000,
			maxAttempts: 5
		}
	},

	description: 'A Sanity Studio for Yummy Recipes'
});
