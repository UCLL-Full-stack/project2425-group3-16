import { RecipeIngredient } from '../../model/recipeingredient';
import { Ingredient } from '../../model/ingredient';

const ingredient = new Ingredient({
    ingredientId: 1,
    name: 'apple',
    description: 'a delicious fruit',
    caloriesPerUnit: 52,
    fatPerUnit: 0.2,
    carbsPerUnit: 14,
    proteinPerUnit: 0.3
});

const recipeIngredientId: number | undefined = 1;
const unit: string = 'grams';
const quantity: number = 250;

test('given: valid values for recipeIngredient, when: recipeIngredient is created, then: recipeIngredient is created with those values', () => {
    // when
    const recipeIngredient = new RecipeIngredient({ recipeIngredientId, ingredient, unit, quantity });

    // then
    expect(recipeIngredient.getRecipeIngredientId()).toBe(recipeIngredientId);
    expect(recipeIngredient.getIngredient()).toBe(ingredient);
    expect(recipeIngredient.getUnit()).toBe(unit);
    expect(recipeIngredient.getQuantity()).toBe(quantity);
});

test('given: two equal recipeIngredients, when: the recipeIngredient.equals method is called, then: the method will return true', () => {
    // given
    const recipeIngredient1 = new RecipeIngredient({ recipeIngredientId, ingredient, unit, quantity });
    const recipeIngredient2 = new RecipeIngredient({ recipeIngredientId, ingredient, unit, quantity });

    // when
    const isEqual = recipeIngredient1.equals(recipeIngredient2);

    // then
    expect(isEqual).toBe(true);
});

test('given: two different recipeIngredients, when: the recipeIngredient.equals method is called, then: the method will return false', () => {
    // given
    const recipeIngredient1 = new RecipeIngredient({ recipeIngredientId, ingredient, unit, quantity });
    const differentIngredient = new Ingredient({
        ingredientId: 2,
        name: 'banana',
        description: 'a yellow fruit',
        caloriesPerUnit: 89,
        fatPerUnit: 0.3,
        carbsPerUnit: 23,
        proteinPerUnit: 1.1
    });
    const recipeIngredient2 = new RecipeIngredient({ recipeIngredientId, ingredient: differentIngredient, unit, quantity });

    // when
    const isEqual = recipeIngredient1.equals(recipeIngredient2);

    // then
    expect(isEqual).toBe(false);
});

test('given: invalid values (empty unit) for recipeIngredient, when: recipeIngredient is created, then: an error is thrown', () => {
    // given
    const invalidUnit: string = '  ';

    // when
    const recipeIngredient = () => new RecipeIngredient({ recipeIngredientId, ingredient, unit: invalidUnit, quantity });

    // then
    expect(recipeIngredient).toThrow('Unit cannot be empty');
});

test('given: invalid values (negative quantity) for recipeIngredient, when: recipeIngredient is created, then: an error is thrown', () => {
    // given
    const invalidQuantity: number = -1;

    // when
    const recipeIngredient = () => new RecipeIngredient({ recipeIngredientId, ingredient, unit, quantity: invalidQuantity });

    // then
    expect(recipeIngredient).toThrow('Quantity must be a positive number');
});
