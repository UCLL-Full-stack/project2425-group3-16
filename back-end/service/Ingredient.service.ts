import {IngredientsInput} from '../types';
import {Ingredient} from '../model/ingredient';
import ingredientDb from '../repository/ingredient.db';
import assert from 'node:assert';

const creatIngredient = async (
    {name, description, caloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit }: IngredientsInput
): Promise<Ingredient | null> => {
    const ingredient: Ingredient = new Ingredient({
        ingredientId: undefined,
        name,
        description,
        caloriesPerUnit,
        fatPerUnit,
        carbsPerUnit,
        proteinPerUnit
    })

    const ingredients: Ingredient[] = await ingredientDb.getAllIngredients()
    ingredients.forEach( i =>{
       const equals : Boolean =  i.equals(ingredient)
        if(equals){
            throw new Error(`we can't save this ingredient.`)
        }
    })
    return await ingredientDb.creatIngredient({ingredient: ingredient});
}

const updateIngredient = async  (
    {ingredientId}:{ingredientId: number},
    {name, description, caloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit }: IngredientsInput
): Promise < Ingredient | null > =>{
    const ingredient: Ingredient = new Ingredient({
        name,
        description,
        caloriesPerUnit,
        fatPerUnit,
        carbsPerUnit,
        proteinPerUnit
    })

    await getIngredientById({ingredientId: ingredientId})

    const ingredients: Ingredient[] = await ingredientDb.getAllIngredients()
    ingredients.forEach( i =>{
        const equals : Boolean =  i.equals(ingredient)
        if(equals){
            throw new Error(`we can't save this ingredient.`)
        }
    })

    const  result: Ingredient | null  = await ingredientDb.updateIngredient(
        {ingredientId: ingredientId},
        {ingredient: ingredient}
    )
    assert(result, 'Something when wrong in the database.')
    return result
}

const getAllIngredients = async (): Promise<Ingredient[]> => {
    return await ingredientDb.getAllIngredients()
}

const getIngredientById= async ({ingredientId}: {ingredientId: number}): Promise<Ingredient | null> => {
    const ingredient: Ingredient | null =  await ingredientDb.getIngredientById({ ingredientId: ingredientId })
    if (ingredient == null) {
        throw new Error(`Ingredient whit id: ${ingredientId} can't be found`)
    }
    return ingredient
}

const deleteIngredient = async ({ingredientId}: {ingredientId: number}): Promise<void> => {
    await getIngredientById({ingredientId: ingredientId})
    await ingredientDb.deleteIngredients({ingredientId: ingredientId})
}

export default {
    creatIngredient,
    updateIngredient,
    getAllIngredients,
    getIngredientById,
    deleteIngredient
}


