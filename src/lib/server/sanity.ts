// All queries are defined here
import { env } from '$env/dynamic/private';
import { createClient } from '@sanity/client';

const client = createClient({
	projectId: env.VITE_PUBLIC_SANITY_PROJECT_ID,
	dataset: env.VITE_PUBLIC_SANITY_DATASET || 'production',
	apiVersion: env.VITE_PUBLIC_SANITY_API_VERSION || '2023-05-03',
	useCdn: true // `true` for faster, cached responses
    // token: env.SANITY_TOKEN // Uncomment this line if you need to use a token for authentication
});

// export default client;

export const getAllRecipes = async () => {
    const query = `*[_type == "recipe"]{
        _id,
        title,
        slug,
        "image": mainImage.asset->url,
        featured,
        "cuisineInfo": cuisine->name,
        "cuisineFlag": cuisine->flag{
          asset->{
            _id,
            url
          }
        },
        "mealTypeName": mealType->name,
        prepTime,
        cookTime
        }`;
    const recipes = await client.fetch(query);
    console.log('recipes', recipes);
    return recipes;
};
export const getAllMeals = async () => {
    const query = `*[_type == "meal"]{
        _id,
        name
    }`;
    const meals = await client.fetch(query);
    return meals;
};

export const getAllCuisines = async () => {
    const query = `*[_type == "cuisine"]{
        _id,
        name
    }`;
    const cuisines = await client.fetch(query);
    return cuisines;
}
export const getRecipeBySlug = async (slug: string) => {
    const query = `*[_type == "recipe" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        "image": mainImage.asset->url,
        featured,
        "cuisineInfo": cuisine->name,
        "cuisineFlag": cuisine->flag{
          asset->{
            _id,
            url
          }
        },
        "mealTypeName": mealType->name,
        prepTime,
        cookTime
    }`;
    const recipe = await client.fetch(query, { slug });
    return recipe;
}
export const getRecipeById = async (id: string) => {
    const query = `*[_type == "recipe" && _id == $id][0]{
        _id,
        title,
        slug,
        "image": mainImage.asset->url,
        featured,
        "cuisineInfo": cuisine->name,
        "cuisineFlag": cuisine->flag{
          asset->{
            _id,
            url
          }
        },
        "mealTypeName": mealType->name,
        prepTime,
        cookTime
    }`;
    const recipe = await client.fetch(query, { id });
    return recipe;
}
export const getRecipeByMealType = async (mealType: string) => {
    const query = `*[_type == "recipe" && mealType->name == $mealType]{
        _id,
        title,
        slug,
        "image": mainImage.asset->url,
        featured,
        "cuisineInfo": cuisine->name,
        "cuisineFlag": cuisine->flag{
          asset->{
            _id,
            url
          }
        },
        "mealTypeName": mealType->name,
        prepTime,
        cookTime
    }`;
    const recipes = await client.fetch(query, { mealType });
    return recipes;
}   

export const getRecipeByCuisine = async (cuisine: string) => {
    const query = `*[_type == "recipe" && cuisine->name == $cuisine]{
        _id,
        title,
        slug,
        "image": mainImage.asset->url,
        featured,
        "cuisineInfo": cuisine->name,
        "cuisineFlag": cuisine->flag{
          asset->{
            _id,
            url
          }
        },
        "mealTypeName": mealType->name,
        prepTime,
        cookTime
    }`;
    const recipes = await client.fetch(query, { cuisine });
    return recipes;
}
