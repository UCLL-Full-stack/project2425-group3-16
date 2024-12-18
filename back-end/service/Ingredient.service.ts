import {IngredientsInput} from '../types';
import {Ingredient} from '../model/ingredient';
import ingredientDb from '../repository/ingredient.db';
import assert from 'node:assert';

const creatIngredient = (
    {name, description, caloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit }: IngredientsInput
): Ingredient => {
    const ingredient: Ingredient = new Ingredient({
        ingredientId: undefined,
        name,
        description,
        caloriesPerUnit,
        fatPerUnit,
        carbsPerUnit,
        proteinPerUnit
    })

    const ingredients: Ingredient[] = ingredientDb.getAllIngredients()
    ingredients.forEach( i =>{
       const equals : Boolean =  i.equals(ingredient)
        if(equals){
            throw new Error(`we can't save this ingredient.`)
        }
    })
    return ingredientDb.creatIngredient({ingredient: ingredient});
}

const updateIngredient = (
    {ingredientId}:{ingredientId: number},
    {name, description, caloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit }: IngredientsInput
): Ingredient =>{
    const ingredient: Ingredient = new Ingredient({
        name,
        description,
        caloriesPerUnit,
        fatPerUnit,
        carbsPerUnit,
        proteinPerUnit
    })

    getIngredientById({ingredientId: ingredientId})

    const ingredients: Ingredient[] = ingredientDb.getAllIngredients()
    ingredients.forEach( i =>{
        const equals : Boolean =  i.equals(ingredient)
        if(equals){
            throw new Error(`we can't save this ingredient.`)
        }
    })

    const  result: Ingredient | null  = ingredientDb.updateIngredient(
        {ingredientId: ingredientId},
        {ingredient: ingredient}
    )
    assert(result, 'Something when wrong in the database.')
    return result
}

const getAllIngredients = (): Ingredient[] => {return ingredientDb.getAllIngredients()}

const getIngredientById=({ingredientId}: {ingredientId: number}): Ingredient | null => {
    const ingredient: Ingredient | null = ingredientDb.getIngredientById({ ingredientId: ingredientId })
    if (ingredient == null) {
        throw new Error(`Ingredient whit id: ${ingredientId} can't be found`)
    }
    return ingredient
}

const deleteIngredient = ({ingredientId}: {ingredientId: number}): void => {
    getIngredientById({ingredientId: ingredientId})
    ingredientDb.deleteIngredient({ingredientsId: ingredientId})
}

export default {
    creatIngredient,
    updateIngredient,
    getAllIngredients,
    getIngredientById,
    deleteIngredient
}


