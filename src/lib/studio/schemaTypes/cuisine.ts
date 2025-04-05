// import type { Rule } from "sanity" is importing the TypeScript type definition for the validation rule builder that's referenced throughout the documentation.
import type { Rule } from 'sanity';

interface CuisineField {
	name: string;
	title: string;
	type: string;
	validation?: (Rule: Rule) => Rule;
	options?: { hotspot: boolean };
}

interface CuisineSchema {
	name: string;
	title: string;
	type: string;
	fields: CuisineField[];
}

const cuisineSchema: CuisineSchema = {
	name: 'cuisine',
	title: 'Cuisine',
	type: 'document',
	fields: [
		{
			name: 'name',
			title: 'Cuisine Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'flag',
			title: 'Flag',
			type: 'image',
			options: { hotspot: true }
		}
	]
};

export default cuisineSchema;
