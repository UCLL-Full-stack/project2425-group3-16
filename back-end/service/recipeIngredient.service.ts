import { RecipeIngredientInput } from '../types';
import { RecipeIngredient } from '../model/recipeingredient';
import recipeIngredientDb from '../repository/recipeIngredient.db';
import { Ingredient } from '../model/ingredient';
import ingredientService from './Ingredient.service';
import assert from 'node:assert';
import ingredientDb from '../repository/ingredient.db';
const createRecipeIngredient = async (
    { ingredient: ingredientInput, unit, quantity }: RecipeIngredientInput
): Promise<RecipeIngredient> => {
    const ingredient: Ingredient | null = await ingredientDb.getIngredientById({ ingredientId: ingredientInput.ingredientId ?? -1 });
    assert(ingredient !== null, `Ingredient with id ${ingredientInput.ingredientId} not found`);

    const recipeIngredient = new RecipeIngredient({ ingredient, unit, quantity });

    const recipeIngredients: RecipeIngredient[] = await recipeIngredientDb.getAllRecipeIngredients();
    recipeIngredients.forEach(r => {
        const equals: boolean = r.equals(recipeIngredient);
        if (equals) {
            throw new Error(`We can't save this recipeIngredient`);
        }
    });

    return await recipeIngredientDb.creatRecipeIngredient({ recipeIngredient });
};

const updateRecipeIngredient = async (
    { recipeIngredientId }: { recipeIngredientId: number },
    { ingredient: ingredientInput, unit, quantity }: RecipeIngredientInput
): Promise<RecipeIngredient|null> => {
    await getRecipeIngredientById({ recipeIngredientId: recipeIngredientId });

    const ingredient: Ingredient | null = await ingredientService.getIngredientById({ ingredientId: ingredientInput.ingredientId ?? -1 });
    assert(ingredient !== null, `Ingredient with id ${ingredientInput.ingredientId} not found`);

    const recipeIngredient = new RecipeIngredient({ ingredient, unit, quantity });

    const recipeIngredients: RecipeIngredient[] = await recipeIngredientDb.getAllRecipeIngredients();
    recipeIngredients.forEach(r => {
        const equals: boolean = r.equals(recipeIngredient);
        if (equals) {
            throw new Error(`We can't save this recipeIngredient`);
        }
    });

    const result: RecipeIngredient | null = await recipeIngredientDb.updateRecipeIngredient(
        { recipeIngredientId: recipeIngredientId },
        { recipeIngredient: recipeIngredient }
    );
    assert(result !== null, `something when wrong in the database.`);

    return result;

};

const getAllRecipeIngredients = async (): Promise<RecipeIngredient[]> => {
    return  await recipeIngredientDb.getAllRecipeIngredients();
};

const getRecipeIngredientById = async (
    { recipeIngredientId }: { recipeIngredientId: number }
): Promise<RecipeIngredient | null> => {
    const recipeIngredient: RecipeIngredient | null = await recipeIngredientDb.getRecipeIngredientById(
        { recipeIngredientId: recipeIngredientId }
    );
    if (recipeIngredient == null) {
        throw new Error(`RecipeIngredient with id: ${recipeIngredientId} can't be found.`);
    }
    return recipeIngredient;
};

const deleteRecipeIngredient = async  (
    { recipeIngredientId }: { recipeIngredientId: number }
): Promise<void> => {
    await getRecipeIngredientById({ recipeIngredientId: recipeIngredientId });
    await recipeIngredientDb.deleteRecipeIngredient({ recipeIngredientId: recipeIngredientId });
};

export default {
    createRecipeIngredient,
    updateRecipeIngredient,
    getAllRecipeIngredients,
    getRecipeIngredientById,
    deleteRecipeIngredient
};