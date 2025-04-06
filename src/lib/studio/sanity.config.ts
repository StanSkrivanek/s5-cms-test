import { schemaTypes } from '$lib/studio/schemaTypes';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
	basePath: '/studio',
	projectId: import.meta.env.VITE_PUBLIC_SANITY_PROJECT_ID,
	dataset: import.meta.env.VITE_PUBLIC_SANITY_DATASET || 'production',
	apiVersion: import.meta.env.VITE_PUBLIC_SANITY_API_VERSION || '2023-05-03',
	websocketOptions: {
		apiVersion: '2022-06-30'
	},
	title: 'Beloved recipes',
	description: 'A Sanity Studio for Beloved Recipes',
	plugins: [structureTool(), visionTool()],
	schema: {
		types: schemaTypes
	}
});
