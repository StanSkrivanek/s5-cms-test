import { getAllRecipes } from '$lib/server/sanity';

export async function load() {


	const recipes = await getAllRecipes();
    console.log('Fetched recipes:', recipes);
	return {
        isLoading: false,
		recipes,
	};
}
