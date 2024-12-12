import { Recipe } from "../model/recipe";
import { User } from "../model/user";
import {Tag} from "../model/tags";

const recipes: Recipe[] = [
    new Recipe({
        recipeId: 1,
        user: new User({
            id: undefined,
            username: '@BobHope',
            firstName: 'Bob',
            lastName: 'Hope',
            email: 'bobhope@gmail.com',
            password: 'bob123',
            role: 'user',
        }),
        title: 'spaghetti',
        description: 'A delicious spaghetti recipe.',
        instructions: '1. Boil water. 2. Cook pasta. 3. Prepare sauce. 4. Mix pasta and sauce.',
        nutritionFacts: 'Calories: 200, Protein: 7g, Carbs: 30g, Fat: 5g',
        cookingTips: 'Use fresh tomatoes for the sauce.',
        extraNotes: 'Can be stored in the fridge for up to 3 days.',
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-02T00:00:00Z'),
        tags: [
            new Tag({
                tagId: 1,
                name: 'Dessert',
                description: 'Sweet dishes typically served as the last course of a meal.',
            }),
            new Tag({
                tagId: 2,
                name: 'Vegetarian',
                description: 'Dishes that do not contain meat or fish.',
            })
        ],
        recipeIngredients: []
    }),
    new Recipe({
        recipeId: 2,
        user: new User({
            id: undefined,
            username: '@JaneDoe',
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'janedoe@gmail.com',
            password: 'jane123',
            role: 'user',
        }),
        title: 'Chocolate Cake',
        description: 'A rich and moist chocolate cake.',
        instructions: '1. Preheat oven. 2. Mix ingredients. 3. Bake for 30 minutes.',
        nutritionFacts: 'Calories: 300, Protein: 5g, Carbs: 40g, Fat: 15g',
        cookingTips: 'Use high-quality cocoa powder.',
        extraNotes: 'Can be frozen for up to 2 months.',
        createdAt: new Date('2023-02-01T00:00:00Z'),
        updatedAt: new Date('2023-02-02T00:00:00Z'),
        tags: [
            new Tag({
                tagId: 1,
                name: 'Dessert',
                description: 'Sweet dishes typically served as the last course of a meal.',
            }),
            new Tag({
                tagId: 2,
                name: 'Vegetarian',
                description: 'Dishes that do not contain meat or fish.',
            })
        ],
        recipeIngredients: []
    }),
    new Recipe({
        recipeId: 3,
        user: new User({
            id: undefined,
            username: '@ChefMike',
            firstName: 'Mike',
            lastName: 'Smith',
            email: 'chefmike@gmail.com',
            password: 'mike123',
            role: 'guest',
        }),
        title: 'Grilled Chicken',
        description: 'Juicy grilled chicken with herbs.',
        instructions: '1. Marinate chicken. 2. Preheat grill. 3. Grill for 10 minutes.',
        nutritionFacts: 'Calories: 250, Protein: 30g, Carbs: 0g, Fat: 10g',
        cookingTips: 'Let the chicken rest before serving.',
        extraNotes: 'Best served with a side of vegetables.',
        createdAt: new Date('2023-03-01T00:00:00Z'),
        updatedAt: new Date('2023-03-02T00:00:00Z'),
        tags: [
            new Tag({
                tagId: 1,
                name: 'Dessert',
                description: 'Sweet dishes typically served as the last course of a meal.',
            }),
            new Tag({
                tagId: 2,
                name: 'Vegetarian',
                description: 'Dishes that do not contain meat or fish.',
            })
        ],
        recipeIngredients: []
    }),
    new Recipe({
        recipeId: 4,
        user: new User({
            id: undefined,
            username: '@HealthyEater',
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarahj@gmail.com',
            password: 'sarah123',
            role: 'user',
        }),
        title: 'Quinoa Salad',
        description: 'A healthy quinoa salad with vegetables.',
        instructions: '1. Cook quinoa. 2. Chop vegetables. 3. Mix together.',
        nutritionFacts: 'Calories: 200, Protein: 8g, Carbs: 30g, Fat: 5g',
        cookingTips: 'Use fresh lemon juice for dressing.',
        extraNotes: 'Can be stored in the fridge for up to 3 days.',
        createdAt: new Date('2023-04-01T00:00:00Z'),
        updatedAt: new Date('2023-04-02T00:00:00Z'),
        tags: [
            new Tag({
                tagId: 1,
                name: 'Dessert',
                description: 'Sweet dishes typically served as the last course of a meal.',
            }),
            new Tag({
                tagId: 2,
                name: 'Vegetarian',
                description: 'Dishes that do not contain meat or fish.',
            }),
            new Tag({
                tagId: 1,
                name: 'Dessert',
                description: 'Sweet dishes typically served as the last course of a meal.',
            }),
            new Tag({
                tagId: 2,
                name: 'Vegetarian',
                description: 'Dishes that do not contain meat or fish.',
            }),
            new Tag({
                tagId: 1,
                name: 'Dessert',
                description: 'Sweet dishes typically served as the last course of a meal.',
            }),
            new Tag({
                tagId: 2,
                name: 'Vegetarian',
                description: 'Dishes that do not contain meat or fish.',
            })
        ],
        recipeIngredients: []
    })
]

const getAllRecipes = (): Recipe[] => {
    return recipes;
}

const getRecipeByTitle = ({title}: {title:string}): Recipe | null => {
    return recipes.find((recipe) => recipe.getTitle() === title) || null ;
}

const getRecipeById = ({id}: {id: number}): Recipe | null => {
    return recipes.find((recipe) => recipe.getRecipeId() === id) || null;
}

const createRecipe = (recipe: Recipe): Recipe => {
    recipes.push(recipe);
    return recipe
}

export default {
    getAllRecipes,
    getRecipeByTitle,
    createRecipe,
    getRecipeById
}