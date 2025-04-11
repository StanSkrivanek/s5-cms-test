// All queries are defined here
import { env } from '$env/dynamic/private';
import { createClient } from '@sanity/client';

const client = createClient({
	projectId: '45tneue6',
	dataset: 'production',
	// apiVersion: '2025-02-19',
	token: env.SANITY_API_TOKEN, // use a token for authentication
	useCdn: true // `true` for faster, cached responses
});

export const getAllRecipes = async () => {
	const query = `*[_type == "recipe"]{
        _id,
        title,
        "slug": slug.current,
        "mealTypeName": mealType->name,
        "image": mainImage.asset->url,
        featured,
        "cuisineInfo": cuisine->name,
        "cuisineFlag": cuisine->flag{
          asset->{
            _id,
            url
          }
        },
        prepTime,
        cookTime,
        
        }`;
        try {
	const recipes = await client.fetch(query);
	// console.log('recipes', recipes);
	return recipes;
}
catch (err) {
  console.error('Error fetching recipes:', err);
  return [];
}
};

export const getRecipeBySlug = async (slug: string) => {
	const query = `*[_type == "recipe" && slug.current == $slug][0]{
            _id,
            title,
            "slug": slug.current,
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
            cookTime,
            ingredients,
            instructions[]{
                _key,
                _type,
                style,
                level,
                listItem,
                markDefs,
                children
            }
        }`;
	try {
		const recipe = await client.fetch(query, { slug });
		return recipe;
	} catch (err) {
		console.error('Error fetching recipe by slug:', err);
		return null;
	}
};

// export const getFeaturedRecipes = async () => {
// 	const query = `*[_type == "recipe" && featured == true]{
//         _id,
//         title,
//        "slug": slug.current,
//         "image": mainImage.asset->url,
//         featured,
//         "cuisineInfo": cuisine->name,
//         "cuisineFlag": cuisine->flag{
//           asset->{
//             _id,
//             url
//           }
//         },
//         "mealTypeName": mealType->name,
//         prepTime,
//         cookTime
//     }`;
// 	const recipes = await client.fetch(query);
// 	return recipes;
// };
// export const getAllMeals = async () => {
// 	const query = `*[_type == "meal"]{
//         _id,
//         name
//     }`;
// 	const meals = await client.fetch(query);
// 	return meals;
// };

// export const getAllCuisines = async () => {
// 	const query = `*[_type == "cuisine"]{
//         _id,
//         name
//     }`;
// 	const cuisines = await client.fetch(query);
// 	return cuisines;
// };

// export const getRecipeById = async (id: string) => {
// 	const query = `*[_type == "recipe" && _id == $id][0]{
//         _id,
//         title,
//         "slug": slug.current,
//         "image": mainImage.asset->url,
//         featured,
//         "cuisineInfo": cuisine->name,
//         "cuisineFlag": cuisine->flag{
//           asset->{
//             _id,
//             url
//           }
//         },
//         "mealTypeName": mealType->name,
//         prepTime,
//         cookTime
//     }`;
// 	const recipe = await client.fetch(query, { id });
// 	return recipe;
// };

// export const getRecipeByMealType = async (mealType: string) => {
// 	const query = `*[_type == "recipe" && mealType->name == $mealType]{
//         _id,
//         title,
//         "slug": slug.current,
//         "image": mainImage.asset->url,
//         featured,
//         "cuisineInfo": cuisine->name,
//         "cuisineFlag": cuisine->flag{
//           asset->{
//             _id,
//             url
//           }
//         },
//         "mealTypeName": mealType->name,
//         prepTime,
//         cookTime
//     }`;
// 	const recipes = await client.fetch(query, { mealType });
// 	return recipes;
// };

// export const getRecipeByCuisine = async (cuisine: string) => {
// 	const query = `*[_type == "recipe" && cuisine->name == $cuisine]{
//         _id,
//         title,
//         "slug": slug.current,
//         "image": mainImage.asset->url,
//         featured,
//         "cuisineInfo": cuisine->name,
//         "cuisineFlag": cuisine->flag{
//           asset->{
//             _id,
//             url
//           }
//         },
//         "mealTypeName": mealType->name,
//         prepTime,
//         cookTime
//     }`;
// 	const recipes = await client.fetch(query, { cuisine });
// 	return recipes;
// };
