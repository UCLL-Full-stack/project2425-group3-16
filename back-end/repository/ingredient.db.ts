import { Ingredient } from '../model/ingredient';
import database from './database';


const creatIngredient = async ({ ingredient }: { ingredient: Ingredient }): Promise<Ingredient | null> => {
    try {
        const ingredientPrisma = await database.ingredient.create({
            data: {
                name: ingredient.getName(),
                description: ingredient.getDescription(),
                caloriesPerUnit: ingredient.getCaloriesPerUnit(),
                fatPerUnit: ingredient.getFatPerUnit(),
                carbsPerUnit: ingredient.getCarbsPerUnit(),
                proteinPerUnit: ingredient.getProteinPerUnit()
            }
        });
        return ingredientPrisma ? Ingredient.from(ingredientPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateIngredient = async (
    { ingredientId }: { ingredientId: number },
    { ingredient }: { ingredient: Ingredient }
): Promise<Ingredient | null> => {
    try {
        const ingredientPrisma = await database.ingredient.update({
            where: { ingredientId: ingredientId },
            data: {
                name: ingredient.getName(),
                description: ingredient.getDescription(),
                caloriesPerUnit: ingredient.getCaloriesPerUnit(),
                fatPerUnit: ingredient.getFatPerUnit(),
                carbsPerUnit: ingredient.getCarbsPerUnit(),
                proteinPerUnit: ingredient.getProteinPerUnit()
            }
        });
        return ingredientPrisma ? Ingredient.from(ingredientPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllIngredients = async (): Promise<Ingredient[]> => {
    try {
        const ingredientsPrisma = await database.ingredient.findMany();
        return ingredientsPrisma.map(i => Ingredient.from(i));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getIngredientById = async ({ ingredientId }: { ingredientId: number }): Promise<Ingredient | null> => {
    try {
        const ingredientPrisma = await database.ingredient.findUnique({
            where: { ingredientId: ingredientId }
        });
        return ingredientPrisma ? Ingredient.from(ingredientPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteIngredients = async ({ ingredientsId }: { ingredientsId: number }): Promise<Boolean> => {
    try{
        const ingredientPrisma = await database.ingredient.delete({
            where: { ingredientId: ingredientsId }
        })
        return !!ingredientPrisma;
    }catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    creatIngredient,
    updateIngredient,
    getAllIngredients,
    getIngredientById,
    deleteIngredients
};