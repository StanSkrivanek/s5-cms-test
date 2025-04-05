import type { Rule } from 'sanity';

interface MealField {
	name: string;
	title: string;
	type: string;
	validation?: (Rule: Rule) => Rule;
}

interface MealSchema {
	name: string;
	title: string;
	type: string;
	fields: MealField[];
}

const mealSchema: MealSchema = {
	name: 'meal',
	title: 'Meal Type',
	type: 'document',
	fields: [
		{
			name: 'name',
			title: 'Meal Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		}
	]
};

export default mealSchema;
