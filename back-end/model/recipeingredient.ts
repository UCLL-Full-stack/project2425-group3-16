import {Ingredient} from "./ingredient";
import {Recipe} from "./recipe";

export class RecipeIngredient {
    private recipeIngredientId?: number;
    private recipe: Recipe;
    private ingredient: Ingredient;
    private unit: string;
    private quantity: number;



    constructor(recipeIngredient: {
        recipeIngredientId?: number;
        recipe: Recipe
        ingredient: Ingredient
        unit: string;
        quantity: number;

    }) {
        this.recipeIngredientId = recipeIngredient.recipeIngredientId;
        this.recipe = recipeIngredient.recipe;
        this.unit = recipeIngredient.unit;
        this.quantity = recipeIngredient.quantity;
        this.ingredient = recipeIngredient.ingredient;
    }

    getRecipeIngredientId(): number| undefined {
        return this.recipeIngredientId;
    }

    getRecipe(): Recipe {
        return this.recipe;
    }


    getUnit(): string {
        return this.unit;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getIngredient():Ingredient {
        return this.ingredient;
    }

    /**
    equals({ recipeingredientId, recipeId, ingredientId, unit, quantity }): boolean {
        return (
            this.recipeingredientId === recipeingredientId &&
            this.recipeId === recipeId &&
            this.ingredientId === ingredientId &&
            this.unit === unit &&
            this.quantity === quantity
        )
    }
    */
}

