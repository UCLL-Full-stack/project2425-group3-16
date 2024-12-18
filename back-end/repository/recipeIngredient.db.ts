import { RecipeIngredient } from '../model/recipeingredient';
import { Ingredient } from '../model/ingredient';

const recipeIngredients: RecipeIngredient[] = [
    new RecipeIngredient({
        recipeIngredientId: 1,
        ingredient:  new Ingredient({
            ingredientId: 1,
            name: 'Tomato',
            description: 'A red, edible fruit commonly used in salads and cooking',
            caloriesPerUnit: 18,
            fatPerUnit: 0.2,
            carbsPerUnit: 3.9,
            proteinPerUnit: 0.9
        }),
        unit: "Tomato",
        quantity: 10
    }),
    new RecipeIngredient({
        recipeIngredientId: 2,
        ingredient: new Ingredient({
            ingredientId: 2,
            name: 'Egg',
            description: 'A versatile ingredient used in many dishes',
            caloriesPerUnit: 155,
            fatPerUnit: 11,
            carbsPerUnit: 1.1,
            proteinPerUnit: 13
        }),
        unit: "egg",
        quantity: 15
    })
]

const creatRecipeIngredient = ({recipeIngredient}: {recipeIngredient: RecipeIngredient}): RecipeIngredient => {
    const newRecipeIngredient: RecipeIngredient = new RecipeIngredient({
        recipeIngredientId: recipeIngredients.length + 1,
        ingredient: recipeIngredient.getIngredient(),
        unit: recipeIngredient.getUnit(),
        quantity: recipeIngredient.getQuantity()
    })
    recipeIngredients.push(newRecipeIngredient)
    return recipeIngredient;
}

const updateRecipeIngredient = (
    {recipeIngredientId}: {recipeIngredientId: number},
    {recipeIngredient}: {recipeIngredient: RecipeIngredient}
): RecipeIngredient | null => {
    const oldRecipeIngredient: RecipeIngredient | null = getRecipeIngredientById({recipeIngredientId})

    const newRecipeIngredient: RecipeIngredient = new RecipeIngredient({
        recipeIngredientId: oldRecipeIngredient?.getRecipeIngredientId(),
        ingredient: recipeIngredient.getIngredient() ?? oldRecipeIngredient?.getIngredient(),
        unit: recipeIngredient.getUnit() ?? oldRecipeIngredient?.getUnit(),
        quantity: recipeIngredient.getQuantity() ?? oldRecipeIngredient?.getQuantity()
    })

    const index: number = recipeIngredients.findIndex(r => r.getRecipeIngredientId() === recipeIngredientId);
    if(index == -1){return  null}
    recipeIngredients[index] = newRecipeIngredient
    return newRecipeIngredient ?? null;
}

const getAllRecipeIngredients = (): RecipeIngredient[] => {
    return recipeIngredients
}

const getRecipeIngredientById = ({recipeIngredientId}: {recipeIngredientId: number}): RecipeIngredient | null => {
    return  recipeIngredients.find(r => r.getRecipeIngredientId() === recipeIngredientId) ?? null;
}

const deleteRecipeIngredient = ({recipeIngredientId}: {recipeIngredientId: number}): void | null => {
    const index: number = recipeIngredients.findIndex(r => r.getRecipeIngredientId() === recipeIngredientId)
    if(index == -1){return null }
    recipeIngredients.splice(index, 1)
}

export default {
    creatRecipeIngredient,
    updateRecipeIngredient,
    getAllRecipeIngredients,
    getRecipeIngredientById,
    deleteRecipeIngredient
}