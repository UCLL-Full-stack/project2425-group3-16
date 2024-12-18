import { Ingredient } from '../model/ingredient';

const ingredients: Ingredient[] = [
    new Ingredient({
        ingredientId: 1,
        name: 'Tomato',
        description: 'A red, edible fruit commonly used in salads and cooking',
        caloriesPerUnit: 18,
        fatPerUnit: 0.2,
        carbsPerUnit: 3.9,
        proteinPerUnit: 0.9
    }),
    new Ingredient({
        ingredientId: 2,
        name: 'Egg',
        description: 'A versatile ingredient used in many dishes',
        caloriesPerUnit: 155,
        fatPerUnit: 11,
        carbsPerUnit: 1.1,
        proteinPerUnit: 13
    })
];

const creatIngredient = ({ingredient}: {ingredient: Ingredient}): Ingredient => {
    const newIngredient: Ingredient = new Ingredient({
        ingredientId: ingredients.length + 1,
        name: ingredient.getName(),
        description: ingredient.getDescription(),
        caloriesPerUnit: ingredient.getCaloriesPerUnit(),
        fatPerUnit: ingredient.getFatPerUnit(),
        carbsPerUnit: ingredient.getFatPerUnit(),
        proteinPerUnit: ingredient.getProteinPerUnit()
    })
    ingredients.push(newIngredient)
    return newIngredient
}

const updateIngredient = (
    {ingredientId}: {ingredientId: number},
    {ingredient}: {ingredient: Ingredient}
): Ingredient | null => {
    const originalIngredient: Ingredient | null = getIngredientById({ingredientId: ingredientId})
    if(originalIngredient == null){return  null}

    const newIngredient: Ingredient = new Ingredient({
        ingredientId: originalIngredient.getIngredientId(),
        name: ingredient.getName() ?? originalIngredient.getName(),
        description: ingredient.getDescription() ?? originalIngredient.getDescription(),
        caloriesPerUnit: ingredient.getCaloriesPerUnit() ?? originalIngredient.getCaloriesPerUnit(),
        fatPerUnit: ingredient.getFatPerUnit() ?? originalIngredient.getFatPerUnit(),
        carbsPerUnit: ingredient.getFatPerUnit() ?? originalIngredient.getCarbsPerUnit(),
        proteinPerUnit: ingredient.getProteinPerUnit() ?? originalIngredient.getProteinPerUnit()
    })

    const index: number = ingredients.findIndex(i => i.getIngredientId() === ingredientId)
    if(index !== -1){
        ingredients[index] = newIngredient;
    }
    return  newIngredient ?? null;
}

const getAllIngredients = (): Ingredient[] => {
    return ingredients;
}

const getIngredientById = ({ingredientId}: {ingredientId: number}): Ingredient | null => {
    return ingredients.find(i => i.getIngredientId() === ingredientId) ?? null;
}

const deleteIngredients = ({ingredientsId}: {ingredientsId: number}): boolean => {
    const index: number = ingredients.findIndex(i => i.getIngredientId() === ingredientsId)
    if(index == -1){return false}
    ingredients.splice(index, 1)
    return true

}

export default {
    creatIngredient,
    updateIngredient,
    getAllIngredients,
    getIngredientById,
    deleteIngredient: deleteIngredients
}