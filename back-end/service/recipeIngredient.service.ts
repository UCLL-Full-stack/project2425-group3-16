import { RecipeIngredientInput } from '../types';
import { RecipeIngredient } from '../model/recipeingredient';
import recipeIngredientDb from '../repository/recipeIngredient.db';
import { Ingredient } from '../model/ingredient';
import ingredientService from './Ingredient.service';
import assert from 'node:assert';

const createRecipeIngredient = (
    { ingredient: ingredientInput, unit, quantity }: RecipeIngredientInput
): RecipeIngredient => {
    const ingredient: Ingredient | null = ingredientService.getIngredientById({ ingredientId: ingredientInput.ingredientId ?? -1 });
    assert(ingredient !== null, `Ingredient with id ${ingredientInput.ingredientId} not found`);

    const recipeIngredient = new RecipeIngredient({ ingredient, unit, quantity });

    const recipeIngredients: RecipeIngredient[] = recipeIngredientDb.getAllRecipeIngredients();
    recipeIngredients.forEach(r => {
        const equals: boolean = r.equals(recipeIngredient);
        if (equals) {
            throw new Error(`We can't save this recipeIngredient`);
        }
    });

    return recipeIngredientDb.creatRecipeIngredient({ recipeIngredient: recipeIngredient });

};

const updateRecipeIngredient = (
    { recipeIngredientId }: { recipeIngredientId: number },
    { ingredient: ingredientInput, unit, quantity }: RecipeIngredientInput
): RecipeIngredient | null => {
    getRecipeIngredientById({ recipeIngredientId: recipeIngredientId });

    const ingredient: Ingredient | null = ingredientService.getIngredientById({ ingredientId: ingredientInput.ingredientId ?? -1 });
    assert(ingredient !== null, `Ingredient with id ${ingredientInput.ingredientId} not found`);

    const recipeIngredient = new RecipeIngredient({ ingredient, unit, quantity });

    const recipeIngredients: RecipeIngredient[] = recipeIngredientDb.getAllRecipeIngredients();
    recipeIngredients.forEach(r => {
        const equals: boolean = r.equals(recipeIngredient);
        if (equals) {
            throw new Error(`We can't save this recipeIngredient`);
        }
    });

    const result: RecipeIngredient | null = recipeIngredientDb.updateRecipeIngredient(
        { recipeIngredientId: recipeIngredientId },
        { recipeIngredient: recipeIngredient }
    );
    assert(result !== null, `something when wrong in the database.`);

    return result;

};

const getAllRecipeIngredients = (): RecipeIngredient[] => {
    return recipeIngredientDb.getAllRecipeIngredients();
};

const getRecipeIngredientById = ({ recipeIngredientId }: { recipeIngredientId: number }): RecipeIngredient | null => {
    const recipeIngredient: RecipeIngredient | null = recipeIngredientDb.getRecipeIngredientById({ recipeIngredientId: recipeIngredientId });
    if (recipeIngredient == null) {
        throw new Error(`RecipeIngredient with id: ${recipeIngredientId} can't be found.`);
    }
    return recipeIngredient;
};

const deleteRecipeIngredient = ({ recipeIngredientId }: { recipeIngredientId: number }): void => {
    getRecipeIngredientById({ recipeIngredientId: recipeIngredientId });
    recipeIngredientDb.deleteRecipeIngredient({ recipeIngredientId: recipeIngredientId });
};

export default {
    createRecipeIngredient,
    updateRecipeIngredient,
    getAllRecipeIngredients,
    getRecipeIngredientById,
    deleteRecipeIngredient
};