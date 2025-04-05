import type { Rule } from 'sanity';

interface RecipeField {
	name: string;
	title: string;
	type: string;
	validation?: (Rule: Rule) => Rule;
	options?: {
		source?: string;
		maxLength?: number;
		hotspot?: boolean;
		list?: { title: string; value: string }[];
	};
	of?: { type: string }[];
	to?: { type: string }[];
	initialValue?: boolean | string | number;
}

interface RecipeSchema {
	name: string;
	title: string;
	type: string;
	fields: RecipeField[];
}

const recipeSchema: RecipeSchema = {
	name: 'recipe',
	title: 'Recipe',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (Rule) => Rule.required()
		},
		{
			name: 'mealType',
			title: 'Meal Type',
			type: 'reference', // reference to another type document (meals)
			to: [{ type: 'meal' }]
		},
		{
			name: 'cuisine',
			title: 'Country of Origin',
			type: 'reference', // reference to another type document (cuisine)
			to: [{ type: 'cuisine' }]
		},
		{
			title: 'Featured',
			name: 'featured',
			type: 'boolean',
			initialValue: false
		},
		{
			name: 'mainImage',
			title: 'Main Image',
			type: 'image',
			options: { hotspot: true }
		},
		{
			name: 'ingredients',
			title: 'Ingredients',
			type: 'array',
			of: [{ type: 'string' }]
		},
		{
			name: 'instructions',
			title: 'Instructions',
			type: 'array',
			of: [{ type: 'block' }]
		},
		{
			name: 'dietaryRestrictions',
			title: 'Dietary Restrictions',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				list: [
					{ title: 'Vegetarian', value: 'vegetarian' },
					{ title: 'Vegan', value: 'vegan' },
					{ title: 'Gluten-Free', value: 'gluten-free' },
					{ title: 'Dairy-Free', value: 'dairy-free' }
				]
			}
		},
		{
			name: 'prepTime',
			title: 'Prep Time (mins)',
			type: 'number'
		},
		{
			name: 'cookTime',
			title: 'Cook Time (mins)',
			type: 'number'
		}
		// {
		// 	name: 'servings',
		// 	title: 'Servings',
		// 	type: 'number'
		// }
	]
};

export default recipeSchema;
