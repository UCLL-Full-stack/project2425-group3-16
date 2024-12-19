import {Ingredient} from "../../model/ingredient";

const ingredientId: number | undefined = undefined;
const name: string = "apple"
const description: string = "a delicious fruit"
const caloriesPerUnit: number = 52;
const fatPerUnit: number = 0.2;
const carbsPerUnit: number = 14;
const proteinPerUnit: number = 0.3;

test('given: valid values for ingredient, when: ingredient is created, then: ingredient is created with those values', () => {
    // when
    const ingredient = new Ingredient({ ingredientId, name, description, caloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit });

    // then
    expect(ingredient.getIngredientId()).toBe(ingredientId);
    expect(ingredient.getName()).toBe(name);
    expect(ingredient.getDescription()).toBe(description);
    expect(ingredient.getCaloriesPerUnit()).toBeCloseTo(caloriesPerUnit);
    expect(ingredient.getFatPerUnit()).toBeCloseTo(fatPerUnit);
    expect(ingredient.getCarbsPerUnit()).toBeCloseTo(carbsPerUnit);
    expect(ingredient.getProteinPerUnit()).toBeCloseTo(proteinPerUnit);
});

test('given: two equal ingredients, when: the ingredient.equals method is called, then: the method will return true', () => {
    // given
    const ingredient1 = new Ingredient({ ingredientId, name, description, caloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit });

    // when
    const isEqual = ingredient1.equals(ingredient1);

    // then
    expect(isEqual).toBe(true);
});

test('given: two different ingredients, when: the ingredient.equals method is called, then: the method will return false', () => {
    // given
    const ingredient1 = new Ingredient({ ingredientId, name, description, caloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit });
    const ingredient2 = new Ingredient({ ingredientId, name: "banana", description, caloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit });

    // when
    const isEqual = ingredient1.equals(ingredient2);

    // then
    expect(isEqual).toBe(false);
});

test('given: invalid values (empty name) for ingredient, when: ingredient is created, then: an error is thrown', () => {
    // given
    const invalidName: string = '  ';

    // when
    const ingredient = () => new Ingredient({ ingredientId, name: invalidName, description, caloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit });

    // then
    expect(ingredient).toThrow('Name is required');
});

test('given: invalid values (empty description) for ingredient, when: ingredient is created, then: an error is thrown', () => {
    // given
    const invalidDescription: string = '  ';

    // when
    const ingredient = () => new Ingredient({ ingredientId, name, description: invalidDescription, caloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit });

    // then
    expect(ingredient).toThrow('Description is required');
});

test('given: invalid values (zero or negative calories per unit) for ingredient, when: ingredient is created, then: an error is thrown', () => {
    // given
    const invalidCaloriesPerUnit: number = 0;

    // when
    const ingredient = () => new Ingredient({ ingredientId, name, description, caloriesPerUnit: invalidCaloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit });

    // then
    expect(ingredient).toThrow('Calories per unit must be greater than 0');
});

test('given: invalid values (negative fat per unit) for ingredient, when: ingredient is created, then: an error is thrown', () => {
    // given
    const invalidFatPerUnit: number = -0.1;

    // when
    const ingredient = () => new Ingredient({ ingredientId, name, description, caloriesPerUnit, fatPerUnit: invalidFatPerUnit, carbsPerUnit, proteinPerUnit });

    // then
    expect(ingredient).toThrow('Fat per unit cannot be negative');
});

test('given: invalid values (negative carbs per unit) for ingredient, when: ingredient is created, then: an error is thrown', () => {
    // given
    const invalidCarbsPerUnit: number = -1;

    // when
    const ingredient = () => new Ingredient({ ingredientId, name, description, caloriesPerUnit, fatPerUnit, carbsPerUnit: invalidCarbsPerUnit, proteinPerUnit });

    // then
    expect(ingredient).toThrow('Carbs per unit cannot be negative');
});

test('given: invalid values (negative protein per unit) for ingredient, when: ingredient is created, then: an error is thrown', () => {
    // given
    const invalidProteinPerUnit: number = -0.1;

    // when
    const ingredient = () => new Ingredient({ ingredientId, name, description, caloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit: invalidProteinPerUnit });

    // then
    expect(ingredient).toThrow('Protein per unit cannot be negative');
});