import { Ingredient } from './ingredient';
import {
    RecipeIngredient as RecipeIngredientPrisma,
    Ingredient as IngredientPrisma
} from '@prisma/client';

export class RecipeIngredient {
    private recipeIngredientId?: number;
    private ingredient: Ingredient;
    private unit: string;
    private quantity: number;


    constructor(recipeIngredient: {
        recipeIngredientId?: number;
        ingredient: Ingredient
        unit: string;
        quantity: number;

    }) {
        this.recipeIngredientId = recipeIngredient.recipeIngredientId;
        this.unit = recipeIngredient.unit;
        this.quantity = recipeIngredient.quantity;
        this.ingredient = recipeIngredient.ingredient;
    }

    getRecipeIngredientId(): number | undefined {
        return this.recipeIngredientId;
    }

    getUnit(): string {
        return this.unit;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getIngredient(): Ingredient {
        return this.ingredient;
    }

    equals(recipeIngredient: RecipeIngredient): boolean {
        return (
            this.ingredient.equals(recipeIngredient.ingredient) &&
            this.unit === recipeIngredient.getUnit() &&
            this.quantity === recipeIngredient.getQuantity()
        );
    }

    static from(
        {
            recipeIngredientId,
            unit,
            quantity,
            ingredient
        }: RecipeIngredientPrisma & { ingredient: IngredientPrisma }): RecipeIngredient {
        return new RecipeIngredient({
            recipeIngredientId,
            unit,
            quantity,
            ingredient: Ingredient.from(ingredient)
        });
    }
}

