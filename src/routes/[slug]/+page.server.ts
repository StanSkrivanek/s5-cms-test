import { getRecipeBySlug } from '$lib/server/sanityClient';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const recipe = await getRecipeBySlug(params.slug);

		if (!recipe) {
			throw error(404, `Recipe "${params.slug}" not found`);
		}

		return {
			recipe
		};
	} catch (err) {
		console.error('Error loading recipe:', err);
		throw error(500, 'Error loading recipe');
	}
};
