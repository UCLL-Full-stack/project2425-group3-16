import { RecipeIngredientInput, IngredientsInput } from "../../types";
import { RecipeIngredient } from "../../model/recipeingredient";
import recipeIngredientDb from "../../repository/recipeIngredient.db";
import recipeIngredientService from "../../service/recipeIngredient.service";
import { Ingredient } from "../../model/ingredient";
import ingredientService from "../../service/ingredient.service";
import ingredientDb from '../../repository/ingredient.db';

let recipeIngredientInput: RecipeIngredientInput;
let recipeIngredient: RecipeIngredient;
let ingredient: Ingredient;

// db Mocks
let mockRecipeIngredientDbCreateRecipeIngredient: jest.SpyInstance<
    Promise<RecipeIngredient | null>, [{ recipeIngredient: RecipeIngredient }]>;

let mockRecipeIngredientDbUpdateRecipeIngredient: jest.SpyInstance<
    Promise<RecipeIngredient | null>, [{ recipeIngredientId: number }, { recipeIngredient: RecipeIngredient }]>;

let mockRecipeIngredientDbGetAllRecipeIngredients: jest.SpyInstance<Promise<RecipeIngredient[]>>;

let mockRecipeIngredientDbGetRecipeIngredientById: jest.SpyInstance<
    Promise<RecipeIngredient | null>, [{ recipeIngredientId: number }]>;

let mockRecipeIngredientDbDeleteRecipeIngredient: jest.SpyInstance<Promise<boolean>, [{ recipeIngredientId: number }]>;
let mockIngredientServiceGetIngredientById: jest.SpyInstance<Promise<Ingredient | null>, [{ ingredientId: number }]>;

let mockIngredientDbGetIngredientById: jest.SpyInstance<Promise<Ingredient | null>, [{ ingredientId: number }]>;

beforeEach(() => {
    ingredient  = new Ingredient({
        ingredientId: 1,
        name: 'Tomato',
        description: 'A red vegetable',
        caloriesPerUnit: 18,
        fatPerUnit: 0.2,
        carbsPerUnit: 3.9,
        proteinPerUnit: 0.9
    });

    const ingredientsInput = {
        ingredientId: 1,
        name: 'Tomato',
        description: 'A red vegetable',
        caloriesPerUnit: 18,
        fatPerUnit: 0.2,
        carbsPerUnit: 3.9,
        proteinPerUnit: 0.9
    }

    recipeIngredientInput = {
        ingredient: ingredientsInput,
        unit: 'kg',
        quantity: 2
    };

    recipeIngredient = new RecipeIngredient({
        ingredient: ingredient,
        unit: 'kg',
        quantity: 2
    });

    jest.resetModules(); // Reset module registry
    // db Mocks
    mockRecipeIngredientDbCreateRecipeIngredient = jest.spyOn(recipeIngredientDb, 'creatRecipeIngredient').mockResolvedValue(recipeIngredient);
    mockRecipeIngredientDbGetRecipeIngredientById = jest.spyOn(recipeIngredientDb, 'getRecipeIngredientById').mockResolvedValue(recipeIngredient);
    mockRecipeIngredientDbGetAllRecipeIngredients = jest.spyOn(recipeIngredientDb, 'getAllRecipeIngredients').mockResolvedValue([recipeIngredient]);
    mockRecipeIngredientDbUpdateRecipeIngredient = jest.spyOn(recipeIngredientDb, 'updateRecipeIngredient').mockResolvedValue(recipeIngredient);
    mockRecipeIngredientDbDeleteRecipeIngredient = jest.spyOn(recipeIngredientDb, 'deleteRecipeIngredient').mockResolvedValue(true);
    mockIngredientServiceGetIngredientById = jest.spyOn(ingredientService, 'getIngredientById').mockResolvedValue(ingredient);
    mockIngredientDbGetIngredientById = jest.spyOn(ingredientDb, 'getIngredientById').mockResolvedValue(ingredient);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a valid recipeIngredient, when a recipeIngredient is created, then a recipeIngredient is created with those values', async () => {
    // given
    mockRecipeIngredientDbGetAllRecipeIngredients.mockResolvedValue([]);
    mockIngredientDbGetIngredientById.mockResolvedValue(ingredient);
    mockRecipeIngredientDbCreateRecipeIngredient.mockResolvedValue(recipeIngredient);

    // when
    const result = await recipeIngredientService.createRecipeIngredient(recipeIngredientInput);

    // then
    expect(mockRecipeIngredientDbCreateRecipeIngredient).toHaveBeenCalledTimes(1);
    expect(mockRecipeIngredientDbCreateRecipeIngredient).toHaveBeenCalledWith({
        recipeIngredient: expect.objectContaining({
            ingredient: ingredient,
            unit: 'kg',
            quantity: 2
        })
    });
    expect(result).toEqual(recipeIngredient);
});

test('given an invalid recipeIngredientInput, when a recipeIngredient is created, then an error is thrown.', async () => {
    // given
    const ingredientsInput: IngredientsInput = {
        ingredientId: 1,
        name: 'Tomato',
        description: 'A red vegetable',
        caloriesPerUnit: 18,
        fatPerUnit: 0.2,
        carbsPerUnit: 3.9,
        proteinPerUnit: 0.9
    };

    const invalidRecipeIngredientInput: RecipeIngredientInput = {
        ingredient: ingredientsInput,
        unit: '  ', // Invalid unit
        quantity: 2
    };

    // when
    const createRecipeIngredient = async () => await recipeIngredientService.createRecipeIngredient(invalidRecipeIngredientInput);

    // then
    await expect(createRecipeIngredient).rejects.toThrow('Unit cannot be empty');
});

test('given: a valid recipeIngredientInput but one we already have in the Db, when: we try to save a recipeIngredient, then: an error is thrown', async () => {
    // given
    mockRecipeIngredientDbGetAllRecipeIngredients.mockResolvedValue([recipeIngredient]);
    jest.spyOn(recipeIngredient, 'equals').mockReturnValue(true);

    // when
    const createRecipeIngredient = async () => await recipeIngredientService.createRecipeIngredient(recipeIngredientInput);

    // then
    await expect(createRecipeIngredient).rejects.toThrow('We can\'t save this recipeIngredient');
});

test('given: valid recipeIngredientInput, when: we try to update a recipeIngredient, then: we update the recipeIngredient', async () => {
    // given
    const recipeIngredientId: number = 1;
    mockRecipeIngredientDbGetRecipeIngredientById.mockResolvedValue(recipeIngredient);
    mockIngredientServiceGetIngredientById.mockResolvedValue(ingredient);
    mockRecipeIngredientDbGetAllRecipeIngredients.mockResolvedValue([]);
    jest.spyOn(recipeIngredient, 'equals').mockReturnValue(false);
    const newRecipeIngredient: RecipeIngredient = new RecipeIngredient({
        ingredient: ingredient,
        unit: 'kg',
        quantity: 2
    });
    mockRecipeIngredientDbUpdateRecipeIngredient.mockResolvedValue(newRecipeIngredient);

    // when
    const result = await recipeIngredientService.updateRecipeIngredient(
        { recipeIngredientId: recipeIngredientId },
        recipeIngredientInput
    );

    // then
    expect(mockRecipeIngredientDbUpdateRecipeIngredient).toHaveBeenCalledTimes(1);
    expect(mockRecipeIngredientDbUpdateRecipeIngredient).toHaveBeenCalledWith(
        { recipeIngredientId: recipeIngredientId },
        { recipeIngredient: newRecipeIngredient }
    );
    expect(result).toEqual(newRecipeIngredient);
});

test('given: an invalid recipeIngredientInput, when: we try to update a recipeIngredient, then an error is thrown', async () => {
    // given
    const ingredientsInput: IngredientsInput = {
        ingredientId: 1,
        name: 'Tomato',
        description: 'A red vegetable',
        caloriesPerUnit: 18,
        fatPerUnit: 0.2,
        carbsPerUnit: 3.9,
        proteinPerUnit: 0.9
    };

    const invalidRecipeIngredientInput: RecipeIngredientInput = {
        ingredient: ingredientsInput,
        unit: "Kg", // Invalid unit
        quantity: -2
    };

    // when
    const updateRecipeIngredient = async () => await recipeIngredientService.updateRecipeIngredient(
        { recipeIngredientId: 1 },
        invalidRecipeIngredientInput
    );

    // then
    await expect(updateRecipeIngredient).rejects.toThrow('Quantity must be a positive number');
});

test('given: an invalid recipeIngredientId, when: trying to update a recipeIngredient, then: an error is thrown', async () => {
    // given
    const recipeIngredientId: number = -1;
    mockRecipeIngredientDbGetRecipeIngredientById.mockResolvedValue(null);

    // when
    const updateRecipeIngredient = async () => await recipeIngredientService.updateRecipeIngredient(
        { recipeIngredientId: recipeIngredientId },
        recipeIngredientInput
    );

    // then
    await expect(updateRecipeIngredient).rejects.toThrow(`RecipeIngredient with id: ${recipeIngredientId} can't be found.`);
});

test('given: we try to have a recipeIngredient we already have, when: we try to update a recipeIngredient, then an error is thrown', async () => {
    // given
    mockRecipeIngredientDbGetRecipeIngredientById.mockResolvedValue(recipeIngredient);
    mockRecipeIngredientDbGetAllRecipeIngredients.mockResolvedValue([recipeIngredient]);
    jest.spyOn(recipeIngredient, 'equals').mockReturnValue(true);

    // when
    const updateRecipeIngredient = async () => await recipeIngredientService.updateRecipeIngredient(
        { recipeIngredientId: 1 },
        recipeIngredientInput
    );

    // then
    await expect(updateRecipeIngredient).rejects.toThrow('We can\'t save this recipeIngredient');
});

test('given: a problem in the db when: we call updateRecipeIngredient, then: an error is thrown.', async () => {
    // given
    mockRecipeIngredientDbGetRecipeIngredientById.mockResolvedValue(recipeIngredient);
    mockRecipeIngredientDbGetAllRecipeIngredients.mockResolvedValue([recipeIngredient]);
    jest.spyOn(recipeIngredient, 'equals').mockReturnValue(false);
    mockRecipeIngredientDbUpdateRecipeIngredient.mockResolvedValue(null);

    // when
    const updateRecipeIngredient = async () => await recipeIngredientService.updateRecipeIngredient(
        { recipeIngredientId: 1 },
        recipeIngredientInput
    );

    // then
    await expect(updateRecipeIngredient).rejects.toThrow('something when wrong in the database.');
});

test('given a working backend, when we try to call getAllRecipeIngredients, then we return all recipeIngredients in the db.', async () => {
    // given
    mockRecipeIngredientDbGetAllRecipeIngredients.mockResolvedValue([recipeIngredient]);

    // when
    const getAllRecipeIngredients = await recipeIngredientService.getAllRecipeIngredients();

    // then
    expect(mockRecipeIngredientDbGetAllRecipeIngredients).toHaveBeenCalledTimes(1);
    expect(getAllRecipeIngredients).toEqual([recipeIngredient]);
});

test('given: a valid recipeIngredientId, when: getRecipeIngredientById is called, then: the recipeIngredient is returned.', async () => {
    // given
    const recipeIngredientId: number = 1;
    mockRecipeIngredientDbGetRecipeIngredientById.mockResolvedValue(recipeIngredient);

    // when
    const getRecipeIngredientById = await recipeIngredientService.getRecipeIngredientById({ recipeIngredientId: recipeIngredientId });

    // then
    expect(mockRecipeIngredientDbGetRecipeIngredientById).toHaveBeenCalledTimes(1);
    expect(mockRecipeIngredientDbGetRecipeIngredientById).toHaveBeenCalledWith({ recipeIngredientId: recipeIngredientId });
    expect(getRecipeIngredientById).toEqual(recipeIngredient);
});

test('given: an invalid recipeIngredientId, when: getRecipeIngredientById is called, then: an error is thrown', async () => {
    // given
    const invalidRecipeIngredientId: number = -1;
    mockRecipeIngredientDbGetRecipeIngredientById.mockResolvedValue(null);

    // when
    const getRecipeIngredientById = async () => await recipeIngredientService.getRecipeIngredientById({ recipeIngredientId: invalidRecipeIngredientId });

    // then
    await expect(getRecipeIngredientById).rejects.toThrow(`RecipeIngredient with id: ${invalidRecipeIngredientId} can't be found.`);
});

test('given: a valid recipeIngredientId, when: deleteRecipeIngredient is called, then: the recipeIngredient is deleted.', async () => {
    // given
    const recipeIngredientId: number = 1;
    mockRecipeIngredientDbGetRecipeIngredientById.mockResolvedValue(recipeIngredient);

    // when
    const deleteRecipeIngredient = recipeIngredientService.deleteRecipeIngredient({ recipeIngredientId: recipeIngredientId });

    // then
    await expect(deleteRecipeIngredient).resolves.not.toThrow();
});

test('given: an invalidRecipeIngredientId, when deleteRecipeIngredient is called, then: an error is thrown', async () => {
    // given
    const invalidRecipeIngredientId: number = -1;
    mockRecipeIngredientDbGetRecipeIngredientById.mockResolvedValue(null);

    // when
    const deleteRecipeIngredient = async () => await recipeIngredientService.deleteRecipeIngredient({ recipeIngredientId: invalidRecipeIngredientId });

    // then
    await expect(deleteRecipeIngredient).rejects.toThrow(`RecipeIngredient with id: ${invalidRecipeIngredientId} can't be found.`);
});