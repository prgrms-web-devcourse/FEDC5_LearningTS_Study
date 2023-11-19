// Write your createKitchen function here! ✨
// You'll need to export it so the tests can run it.
export type Cleaner = (dirt: number, time?: number) => number;

export type Ingredients = {
	breads: number;
	fruits: number;
	sauces: number;
	vegetables: number;
};

export type RecipeFailed = {
	succeeded: false;
};

export type RecipeSucceeded = {
	succeeded: true;
	newStock: Ingredients;
};

export type RecipeResult = RecipeSucceeded | RecipeFailed;

export type Recipe = (ingredients: Ingredients) => RecipeResult;

export type Supplier = (expense: number) => Ingredients;

export type Kitchen = {
	announce(): string;
	clean(time?: number): void;
	purchase(expense: number): boolean;
	prepare(recipe: Recipe): boolean;
};

export function createKitchen(
	budget: number,
	cleaner: Cleaner,
	supplier: Supplier
): Kitchen {
	let dirt = 0;
	let stock = {
		breads: 0,
		fruits: 0,
		sauces: 0,
		vegetables: 0,
	};

	return {
		announce() {
			return `I have ${dirt} much dirt, ${budget} budget, ${stock.breads} bread(s), ${stock.fruits} fruit(s), ${stock.sauces} sauce(s), and ${stock.vegetables} vegetable(s).`;
		},
		clean(time?: number) {
			dirt = cleaner(dirt, time);
		},
		purchase(expense: number) {
			if (budget < expense) {
				return false;
			}

			const ingredients = supplier(expense);

			stock.breads += ingredients.breads;
			stock.fruits += ingredients.fruits;
			stock.sauces += ingredients.sauces;
			stock.vegetables += ingredients.vegetables;

			budget -= expense;

			return true;
		},
		prepare(recipe: Recipe) {
			if (dirt >= 100) {
				return false;
			}

			const result = recipe(stock);
			dirt += 1;

			if (result.succeeded) {
				stock = result.newStock;
			}

			return result.succeeded;
		},
	};
}
