import {Recipe} from '../../model/recipe';
import {User} from '../../model/user';
import {Tag} from '../../model/tags';
import {RecipeIngredient} from "../../model/recipeingredient";


const recipeId: number | undefined = undefined;
const user = new User({
    id: undefined,
    username: '@BobHope',
    firstName: 'Bob',
    lastName: 'Hope',
    email: 'bobhope@gmail.com',
    password: 'bob123',
    role: 'user',
});
const title: string = 'spaghetti';
const description: string = 'A delicious spaghetti recipe.';
const instructions: string = '1. Boil water. 2. Cook pasta. 3. Prepare sauce. 4. Mix pasta and sauce.';
const nutritionFacts: string = 'Calories: 200, Protein: 7g, Carbs: 30g, Fat: 5g';
const cookingTips: string = 'Use fresh tomatoes for the sauce.';
const extraNotes: string = 'Can be stored in the fridge for up to 3 days.';
const createdAt: Date = new Date('2023-01-01T00:00:00Z');
const updatedAt: Date = new Date('2023-01-02T00:00:00Z');
const tags: Tag[] = [new Tag({name: 'Italian', description: 'Food from Italy'})];
const recipeIngredients: RecipeIngredient[] = []

test(`given: valid values for recipe, when: recipe is created, then: recipe is created with those values`, () => {
    // given
    // when
    const recipe = new Recipe({
        recipeId,
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
        recipeIngredients
    });

    // then
    expect(recipe.getRecipeId()).toBe(recipeId);
    expect(recipe.getUser()).toEqual(user);
    expect(recipe.getTitle()).toBe(title);
    expect(recipe.getDescription()).toBe(description);
    expect(recipe.getInstructions()).toBe(instructions);
    expect(recipe.getNutritionFacts()).toBe(nutritionFacts);
    expect(recipe.getCookingTips()).toBe(cookingTips);
    expect(recipe.getExtraNotes()).toBe(extraNotes);
    expect(recipe.getCreationDate()).toEqual(createdAt);
    expect(recipe.getUpdateAt()).toEqual(updatedAt);
});

test(`given: two equal recipe's, when: the recipe.equals method is called, then: the method will return true`, () => {
    //given
    const recipe = new Recipe({
        recipeId,
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
        recipeIngredients
    });

    //when
    const isEqual = recipe.equals(recipe);

    //then
    expect(isEqual).toBe(true);
});

test(`given: two different recipe's ,when: the recipe.equals method is called, then: the method will return false`, () => {
    //given
    const recipe1 = new Recipe({
        recipeId,
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
        recipeIngredients
    });

    const recipe2 = new Recipe({
        recipeId,
        user,
        title: 'DifferentTile',
        description,
        instructions,
        nutritionFacts,
        cookingTips,
        extraNotes,
        createdAt,
        updatedAt,
        tags,
        recipeIngredients
    });

    //when
    const isEqual = recipe1.equals(recipe2);

    //then
    expect(isEqual).toBe(false);
});