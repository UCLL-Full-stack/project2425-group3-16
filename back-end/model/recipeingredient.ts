export class RecipeIngredient {
    private _recipeingredientId?: number;
    private _recipeId: number;
    private _ingredientId: number;
    private _unit: string;
    private _quantity: number;


    constructor(recipeIngredient: {
        recipeingredientId?: number;
        recipeId: number;
        ingredientId: number;
        unit: string;
        quantity: number;
    }) {
        this._recipeingredientId = recipeIngredient.recipeingredientId;
        this._recipeId = recipeIngredient.recipeId;
        this._ingredientId = recipeIngredient.ingredientId;
        this._unit = recipeIngredient.unit;
        this._quantity = recipeIngredient.quantity;
    }

    getRecipeIngredientId(): number| undefined {
        return this._recipeingredientId;
    }

    getRecipeId(): number {
        return this._recipeId;
    }

    getIngredientId(): number {
        return this._ingredientId;
    }

    getUnit(): string {
        return this._unit;
    }

    getQuantity(): number {
        return this._quantity;
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
