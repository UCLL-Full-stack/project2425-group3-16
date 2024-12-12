import { RecipeIngredient } from "../../model/recipeingredient"
import ingredientDb from "../../repository/ingredient.db"

const recipeIngredientId = 1
const recipeId = 1
const ingredientId = 1
const unit = "grams"
const quantity = 200
const recipeIngredient = new RecipeIngredient({
    recipeIngredientId: 1,
    recipeId: 1,
    ingredientId: 1,
    unit: unit,
    quantity: quantity
})

let mockRecipeIngredientGetRecipeIngredientById: jest.Mock;

beforeEach(() => {
    mockRecipeIngredientGetRecipeIngredientById = jest.fn()
})

afterEach(() => {
    jest.clearAllMocks()
})

test('given existing recipeIngredient, when fetching an existing recipeIngredient by id, then return the correct recipeIngredient', () => {
    //given
    const recipeIngredient1 = new RecipeIngredient({ recipeIngredientId: 1, recipeId: 1, ingredientId: 1, unit: "grams", quantity: 250 })
    ingredientDb.getRecipeIngredientById = mockRecipeIngredientGetRecipeIngredientById.mockReturnValue(recipeIngredient1)
    //when
    const result = ingredientDb.getRecipeIngredientById({ id: 1 })
    //then
    expect(result).toEqual(recipeIngredient1)
})
