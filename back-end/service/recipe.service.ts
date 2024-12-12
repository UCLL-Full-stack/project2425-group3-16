import recipeDb from "../repository/recipe.db"
import userService from "./user.service";
import {Recipe} from "../model/recipe";
import {RecipeInput} from "../types";
import {Tag} from "../model/tags";
import tagServerice from "./tag.serverice";

const getAllRecipes =  (): Recipe[] => {
    return recipeDb.getAllRecipes();
}

const getRecipeById = ({id}: {id: number}) =>{
    const recipe = recipeDb.getRecipeById({id: id})
    if(!recipe){
        throw new Error(`We could not find a recipe with the id: ${id}`)
    }
    return recipe
}

const createRecipe = ({
                          user: userInput,
                          ingredients: recipeIngredientInputs,
                          title,
                          description,
                          instructions,
                          nutritionFacts,
                          cookingTips,
                          extraNotes,
                          createdAt,
                          updatedAt,
                          tags: tagInput
}: RecipeInput): Recipe => {
    if (!userInput.userId) throw new Error('User id is required')


    //check if the other feels are filled in
    if (!title || !description || !instructions) {
        throw new Error('We require all the feels to be filled in.')
    }

    // Check if the user exists:
    // the userService.getUserById should throw an error if the user does not exist
    const user = userService.getUserById({userId: userInput.userId ?? -1})



    let tags: Tag[] = [];
    tagInput.forEach((tagInput) => {
        const tag = tagServerice.getTagById({tagId: tagInput.tagId ?? -1})
        if(tag){
            tags.push(tag)
        }
    })

    //we will now check if we already have the same recipe saved
    const existingRecipe = recipeDb.getRecipeByTitle({title: title})
    if (existingRecipe) {
        throw new Error(`We already have a recipe by this tile: ${title}`)
    }

    //we need to creat a new recipe to go true that validation logic
    let recipe;
    try {
        recipe = new Recipe({
            user,
            title,
            description,
            instructions,
            nutritionFacts,
            cookingTips,
            extraNotes,
            createdAt,
            updatedAt,
            tags,
            recipeIngredients: []
        })
    } catch (error) {
        throw new Error(`you did not provide use with a valid Recipe error: ${error}`)
    }

    return recipeDb.createRecipe(recipe)
}

export default {createRecipe, getAllRecipes, getRecipeById}
