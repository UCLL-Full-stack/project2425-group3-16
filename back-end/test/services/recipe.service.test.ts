import {User} from "../../model/user";
import {UserInput, RecipeIngredientInput} from "../../types";
import recipeDb from "../../repository/recipe.db";
import {Recipe} from "../../model/recipe";
import { set } from 'date-fns';
import recipeService from "../../service/recipe.service";

const title = "4/4 cake"
const user: UserInput = {
    userId: 1,
    username: '@BobHope',
    firstName: 'Bob',
    lastName: 'Hope',
    email: 'bobhope@gmail.com',
    password: 'bob123',
    role: 'user',
}
const description= "a basic cake"
const instructions= "Throw all ingredients together and mix. Then put in the oven on 180°C for 30 minutes."
const created = set(new Date(), { hours: 8, minutes: 30 });
const updated = set(new Date(), {hours: 8, minutes:59});


const recipe = new Recipe({
    recipeId: 1,
    user: new User({
        id: 1,
        username: '@BobHope',
        firstName: 'Bob',
        lastName: 'Hope',
        email: 'bobhope@gmail.com',
        password: 'bob123',
        role: 'user',
    }),
    title: title,
    description: description,
    instructions: instructions,
    nutritionFacts: "",
    cookingTips: "",
    extraNotes: "",
    createdAt: created,
    updatedAt: updated,
    tags: [],
    recipeIngredients: []
})

let createRecipeMock: jest.Mock;
let mockRecipeGetRecipeById: jest.Mock;

beforeEach(() => {
    createRecipeMock: jest.spyOn(recipeDb, 'createRecipe');
})

afterEach(() => {
    jest.clearAllMocks();
})

test('given a valid recipe, when recipe is created, then recipe is created with those values', () => {
    //given
    mockRecipeGetRecipeById = jest.fn().mockReturnValue(recipe)
    createRecipeMock = jest.fn().mockReturnValue((new Recipe({
        recipeId: 1,
        user:
            new User({id: 1, username: '@BobHope', firstName: 'Bob', lastName: 'Hope', email: 'bobhope@gmail.com', password: 'bob123', role: 'user',}),
        title: title,
        description: description,
        instructions: instructions,
        nutritionFacts: "",
        cookingTips: "",
        extraNotes: "",
        createdAt: created,
        updatedAt: updated,
        tags: [],
        recipeIngredients: []
    })))
    jest.spyOn(recipeService, 'createRecipe').mockImplementation(createRecipeMock)
    //when
    recipeService.createRecipe({user: user, ingredients: new Array<RecipeIngredientInput>, title: title, description: description, instructions: instructions, nutritionFacts: "", cookingTips: "", extraNotes: "", createdAt: created, updatedAt: updated, tags: [], })
    //then
    expect(createRecipeMock).toHaveBeenCalledTimes(1);
    expect(createRecipeMock).toHaveBeenCalledWith({user: user, ingredients: new Array<RecipeIngredientInput>, title: title, description: description, instructions: instructions, nutritionFacts: "", cookingTips: "", extraNotes: "", createdAt: created, updatedAt: updated, tags: [], })
})