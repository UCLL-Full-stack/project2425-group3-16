import { IngredientsInput } from "../../types";
import { Ingredient } from "../../model/ingredient";
import ingredientDb from "../../repository/ingredient.db";
import ingredientService from "../../service/ingredient.service";

let ingredientInput: IngredientsInput;
let ingredient: Ingredient;

// db Mocks
let mockIngredientDbCreateIngredient: jest.SpyInstance<Promise<Ingredient | null>, [{ ingredient: Ingredient }]>;
let mockIngredientDbUpdateIngredient: jest.SpyInstance<Promise<Ingredient | null>, [{ ingredientId: number }, { ingredient: Ingredient }]>;
let mockIngredientDbGetAllIngredients: jest.SpyInstance<Promise<Ingredient[]>>;
let mockIngredientDbGetIngredientById: jest.SpyInstance<Promise<Ingredient | null>, [{ ingredientId: number }]>;
let mockIngredientDbDeleteIngredient: jest.SpyInstance<Promise<boolean>, [{ingredientId : number }]>;

beforeEach(() => {
    ingredientInput = {
        name: 'Tomato',
        description: 'A red vegetable',
        caloriesPerUnit: 18,
        fatPerUnit: 0.2,
        carbsPerUnit: 3.9,
        proteinPerUnit: 0.9
    };

    ingredient = new Ingredient({
        name: 'Tomato',
        description: 'A red vegetable',
        caloriesPerUnit: 18,
        fatPerUnit: 0.2,
        carbsPerUnit: 3.9,
        proteinPerUnit: 0.9
    });

    jest.resetModules(); // Reset module registry
    // db Mocks
    mockIngredientDbCreateIngredient = jest.spyOn(ingredientDb, 'creatIngredient').mockResolvedValue(ingredient);
    mockIngredientDbGetIngredientById = jest.spyOn(ingredientDb, 'getIngredientById').mockResolvedValue(ingredient);
    mockIngredientDbGetAllIngredients = jest.spyOn(ingredientDb, 'getAllIngredients').mockResolvedValue([ingredient]);
    mockIngredientDbUpdateIngredient = jest.spyOn(ingredientDb, 'updateIngredient').mockResolvedValue(ingredient);
    mockIngredientDbDeleteIngredient = jest.spyOn(ingredientDb, 'deleteIngredients').mockResolvedValue(true);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a valid ingredient, when an ingredient is created, then an ingredient is created with those values', async () => {
    // given
    mockIngredientDbGetAllIngredients.mockResolvedValue([]);
    mockIngredientDbCreateIngredient.mockResolvedValue(ingredient);

    // when
    const result = await ingredientService.creatIngredient(ingredientInput);

    // then
    expect(mockIngredientDbCreateIngredient).toHaveBeenCalledTimes(1);
    expect(mockIngredientDbCreateIngredient).toHaveBeenCalledWith({
        ingredient: expect.objectContaining({
            name: 'Tomato',
            description: 'A red vegetable',
            caloriesPerUnit: 18,
            fatPerUnit: 0.2,
            carbsPerUnit: 3.9,
            proteinPerUnit: 0.9
        })
    });
    expect(result).toEqual(ingredient);
});

test('given an invalid ingredientInput, when an ingredient is created, then an error is thrown.', async () => {
    // given
    const invalidIngredientInput: IngredientsInput = {
        name: '  ', // Invalid name
        description: 'A red vegetable',
        caloriesPerUnit: 18,
        fatPerUnit: 0.2,
        carbsPerUnit: 3.9,
        proteinPerUnit: 0.9
    };

    // when
    const createIngredient = async () => await ingredientService.creatIngredient(invalidIngredientInput);

    // then
    await expect(createIngredient).rejects.toThrow('Name is required');
});

test('given: a valid ingredientInput but one we already have in the Db, when: we try to save an ingredient, then: an error is thrown', async () => {
    // given
    mockIngredientDbGetAllIngredients.mockResolvedValue([ingredient]);
    jest.spyOn(ingredient, 'equals').mockReturnValue(true);

    // when
    const createIngredient = async () => await ingredientService.creatIngredient(ingredientInput);

    // then
    await expect(createIngredient).rejects.toThrow(`we can't save this ingredient.`);
});

test('given: valid ingredientInput, when: we try to update an ingredient, then: we update the ingredient', async () => {
    // given
    const ingredientId: number = 1;
    mockIngredientDbGetIngredientById.mockResolvedValue(ingredient);
    mockIngredientDbGetAllIngredients.mockResolvedValue([]);
    jest.spyOn(ingredient, 'equals').mockReturnValue(false);
    const newIngredient: Ingredient = new Ingredient({
        name: ingredientInput.name,
        description: ingredientInput.description,
        caloriesPerUnit: ingredientInput.caloriesPerUnit,
        fatPerUnit: ingredientInput.fatPerUnit,
        carbsPerUnit: ingredientInput.carbsPerUnit,
        proteinPerUnit: ingredientInput.proteinPerUnit
    });
    mockIngredientDbUpdateIngredient.mockResolvedValue(newIngredient);

    // when
    const result = await ingredientService.updateIngredient(
        { ingredientId: ingredientId },
        ingredientInput
    );

    // then
    expect(mockIngredientDbUpdateIngredient).toHaveBeenCalledTimes(1);
    expect(mockIngredientDbUpdateIngredient).toHaveBeenCalledWith(
        { ingredientId: ingredientId },
        { ingredient: newIngredient }
    );
    expect(result).toEqual(newIngredient);
});

test('given: an invalid ingredientInput, when: we try to update an ingredient, then an error is thrown', async () => {
    // given
    const invalidIngredientInput: IngredientsInput = {
        name: '  ', // Invalid name
        description: 'A red vegetable',
        caloriesPerUnit: 18,
        fatPerUnit: 0.2,
        carbsPerUnit: 3.9,
        proteinPerUnit: 0.9
    };

    // when
    const updateIngredient = async () => await ingredientService.updateIngredient(
        { ingredientId: 1 },
        invalidIngredientInput
    );

    // then
    await expect(updateIngredient).rejects.toThrow('Name is required');
});

test('given: an invalid ingredientId, when: trying to update an ingredient, then: an error is thrown', async () => {
    // given
    const ingredientId: number = -1;
    mockIngredientDbGetIngredientById.mockResolvedValue(null);

    // when
    const updateIngredient = async () => await ingredientService.updateIngredient(
        { ingredientId: ingredientId },
        ingredientInput
    );

    // then
    await expect(updateIngredient).rejects.toThrow(`Ingredient whit id: ${ingredientId} can't be found`);
});

test('given: we try to have an ingredient we already have, when: we try to update an ingredient, then an error is thrown', async () => {
    // given
    mockIngredientDbGetIngredientById.mockResolvedValue(ingredient);
    mockIngredientDbGetAllIngredients.mockResolvedValue([ingredient]);
    jest.spyOn(ingredient, 'equals').mockReturnValue(true);

    // when
    const updateIngredient = async () => await ingredientService.updateIngredient(
        { ingredientId: 1 },
        ingredientInput
    );

    // then
    await expect(updateIngredient).rejects.toThrow(`we can't save this ingredient.`);
});

test('given: a problem in the db when: we call updateIngredient, then: an error is thrown.', async () => {
    // given
    mockIngredientDbGetIngredientById.mockResolvedValue(ingredient);
    mockIngredientDbGetAllIngredients.mockResolvedValue([ingredient]);
    jest.spyOn(ingredient, 'equals').mockReturnValue(false);
    mockIngredientDbUpdateIngredient.mockResolvedValue(null);

    // when
    const updateIngredient = async () => await ingredientService.updateIngredient(
        { ingredientId: 1 },
        ingredientInput
    );

    // then
    await expect(updateIngredient).rejects.toThrow('Something when wrong in the database.');
});

test('given a working backend, when we try to call getAllIngredients, then we return all ingredients in the db.', async () => {
    // given
    mockIngredientDbGetAllIngredients.mockResolvedValue([ingredient]);

    // when
    const getAllIngredients = await ingredientService.getAllIngredients();

    // then
    expect(mockIngredientDbGetAllIngredients).toHaveBeenCalledTimes(1);
    expect(getAllIngredients).toEqual([ingredient]);
});

test('given: a valid ingredientId, when: getIngredientById is called, then: the ingredient is returned.', async () => {
    // given
    const ingredientId: number = 1;
    mockIngredientDbGetIngredientById.mockResolvedValue(ingredient);

    // when
    const getIngredientById = await ingredientService.getIngredientById({ ingredientId: ingredientId });

    // then
    expect(mockIngredientDbGetIngredientById).toHaveBeenCalledTimes(1);
    expect(mockIngredientDbGetIngredientById).toHaveBeenCalledWith({ ingredientId: ingredientId });
    expect(getIngredientById).toEqual(ingredient);
});

test('given: an invalid ingredientId, when: getIngredientById is called, then: an error is thrown', async () => {
    // given
    const invalidIngredientId: number = -1;
    mockIngredientDbGetIngredientById.mockResolvedValue(null);

    // when
    const getIngredientById = async () => await ingredientService.getIngredientById({ ingredientId: invalidIngredientId });

    // then
    await expect(getIngredientById).rejects.toThrow(`Ingredient whit id: ${invalidIngredientId} can't be found`);
});

test('given: a valid ingredientId, when: deleteIngredient is called, then: the ingredient is deleted.', async () => {
    // given
    const ingredientId: number = 1;
    mockIngredientDbGetIngredientById.mockResolvedValue(ingredient);

    // when
    const deleteIngredient = ingredientService.deleteIngredient({ ingredientId: ingredientId });

    // then
    await expect(deleteIngredient).resolves.not.toThrow();
});

test('given: an invalidIngredientId, when deleteIngredient is called, then: an error is thrown', async () => {
    // given
    const invalidIngredientId: number = -1;
    mockIngredientDbGetIngredientById.mockResolvedValue(null);

    // when
    const deleteIngredient = async () => await ingredientService.deleteIngredient({ ingredientId: invalidIngredientId });

    // then
    await expect(deleteIngredient).rejects.toThrow(`Ingredient whit id: ${invalidIngredientId} can't be found`);
});