import { RecipeIngredient } from '../model/recipeingredient';
import database from './database';
const creatRecipeIngredient = async (
    { recipeIngredient }: { recipeIngredient: RecipeIngredient }
): Promise<RecipeIngredient> => {
    try {
        const recipeIngredientPrisma = await database.recipeIngredient.create({
            data: {
                ingredientId: recipeIngredient.getIngredient().getIngredientId() as number,
                quantity: recipeIngredient.getQuantity(),
                unit: recipeIngredient.getUnit(),
            },
            include: { ingredient: true }
        });
        return RecipeIngredient.from(recipeIngredientPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error see server log for details');
    }
};

const updateRecipeIngredient = async (
    {recipeIngredientId}: {recipeIngredientId: number},
    {recipeIngredient}: {recipeIngredient: RecipeIngredient}
): Promise <RecipeIngredient | null> => {
    try {
        const recipeIngredientPrisma = await database.recipeIngredient.update({
            where: { recipeIngredientId: recipeIngredientId },
            data: {
                ingredientId: recipeIngredient.getIngredient().getIngredientId() as number,
                quantity: recipeIngredient.getQuantity(),
                unit: recipeIngredient.getUnit()
            },
            include: { ingredient: true }
        });
        return recipeIngredientPrisma ? RecipeIngredient.from(recipeIngredientPrisma) : null;
    } catch (error) {
        console.log(error);
        throw new Error('Database error see server log for details');
    }
}

const getAllRecipeIngredients = async (): Promise<RecipeIngredient[]> => {
    try {
        const recipeIngredients = await database.recipeIngredient.findMany({
            include: { ingredient: true }
        });
        return recipeIngredients.map(r => RecipeIngredient.from(r));
    } catch (e) {
        console.log(e);
        throw new Error('Database error see server log for details');
    }
}

const getRecipeIngredientById = async (
    {recipeIngredientId}: {recipeIngredientId: number}
): Promise<RecipeIngredient | null> => {
    try {
        const recipeIngredient = await database.recipeIngredient.findUnique({
            where: { recipeIngredientId: recipeIngredientId },
            include: { ingredient: true }
        });
        return recipeIngredient ? RecipeIngredient.from(recipeIngredient) : null;
    } catch (e) {
        console.log(e);
        throw new Error('Database error see server log for details');
    }
}


const deleteRecipeIngredient = async ({recipeIngredientId}: {recipeIngredientId: number}): Promise<Boolean> => {
    try {
        const recipeIngredient = await database.recipeIngredient.delete({
            where: { recipeIngredientId: recipeIngredientId }
        });
        return !!recipeIngredient;
    } catch (error) {
        console.log(error);
        throw new Error('Database error see server log for details');
    }
}

export default {
    creatRecipeIngredient,
    updateRecipeIngredient,
    getAllRecipeIngredients,
    getRecipeIngredientById,
    deleteRecipeIngredient
}