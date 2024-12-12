import {RecipeIngredient} from "../../model/recipeingredient";
import {Ingredient} from "../../model/ingredient";


const ingredientId: number | undefined = undefined;
const name: string = "apple"
const description: string = "a delicious fruit"
const caloriesPerUnit: number = 52;
const fatPerUnit: number = 0.2;
const carbsPerUnit: number = 14;
const proteinPerUnit: number = 0.3;
const recipeIngredients: RecipeIngredient[] = []

test(`given: valid values for ingredient, when: ingredient is created, then: ingredient is created with those values` , () => {
    //given
    //when
    const ingredient = new Ingredient({
        ingredientId,
        name,
        description,
        caloriesPerUnit,
        fatPerUnit,
        carbsPerUnit,
        proteinPerUnit,
        recipeIngredients
    })

    //then
    expect(ingredient.getIngredientId()).toBe(ingredientId)
    expect(ingredient.getName()).toBe(name)
    expect(ingredient.getDescription()).toBe(description)
    expect(ingredient.getCaloriesPerUnit()).toBeCloseTo(caloriesPerUnit)
    expect(ingredient.getFatPerUnit()).toBeCloseTo(fatPerUnit)
    expect(ingredient.getCarbsPerUnit()).toBeCloseTo(carbsPerUnit)
    expect(ingredient.getProteinPerUnit()).toBeCloseTo(proteinPerUnit)
    expect(ingredient.getRecipeIngredients()?.sort()).toEqual(recipeIngredients.sort())
})