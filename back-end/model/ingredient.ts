import { Ingredient as IngredientPrisma } from '@prisma/client';

export class Ingredient {
    private ingredientId?: number;
    private name: string;
    private description: string;
    private caloriesPerUnit: number;
    private fatPerUnit: number;
    private carbsPerUnit: number;
    private proteinPerUnit: number;


    constructor(ingredient: {
        ingredientId?: number,
        name: string,
        description: string,
        caloriesPerUnit: number,
        fatPerUnit: number,
        carbsPerUnit: number,
        proteinPerUnit: number
    }) {
        this.validate(ingredient);

        this.ingredientId = ingredient.ingredientId;
        this.name = ingredient.name;
        this.description = ingredient.description;
        this.caloriesPerUnit = ingredient.caloriesPerUnit;
        this.fatPerUnit = ingredient.fatPerUnit;
        this.carbsPerUnit = ingredient.carbsPerUnit;
        this.proteinPerUnit = ingredient.proteinPerUnit;
    }

    getIngredientId(): number | undefined {
        return this.ingredientId;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getCaloriesPerUnit(): number {
        return this.caloriesPerUnit;
    }

    getFatPerUnit(): number {
        return this.fatPerUnit;
    }

    getCarbsPerUnit(): number {
        return this.carbsPerUnit;
    }

    getProteinPerUnit(): number {
        return this.proteinPerUnit;
    }


    validate(i: {
        ingredientId?: number,
        name: string,
        description: string,
        caloriesPerUnit: number,
        fatPerUnit: number,
        carbsPerUnit: number,
        proteinPerUnit: number
    }): void {
        if (!i.name?.trim()) {
            throw new Error('Name is required');
        }
        if (!i.description?.trim()) {
            throw new Error('Description is required');
        }
        if (i.caloriesPerUnit <= 0) {
            throw new Error('Calories per unit must be greater than 0');
        }
        if (i.fatPerUnit < 0) {
            throw new Error('Fat per unit cannot be negative');
        }
        if (i.carbsPerUnit < 0) {
            throw new Error('Carbs per unit cannot be negative');
        }
        if (i.proteinPerUnit < 0) {
            throw new Error('Protein per unit cannot be negative');
        }
    }

    equals(ingredient: Ingredient): boolean {
        return (
            this.name === ingredient.getName() &&
            this.description === ingredient.getDescription() &&
            this.caloriesPerUnit === ingredient.getCaloriesPerUnit() &&
            this.fatPerUnit === ingredient.getFatPerUnit() &&
            this.carbsPerUnit === ingredient.getCarbsPerUnit() &&
            this.proteinPerUnit === ingredient.getProteinPerUnit()
        );
    }

    static from(
        { ingredientId, name, description, caloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit }: IngredientPrisma
    ): Ingredient {
        return new Ingredient(
            { ingredientId, name, description, caloriesPerUnit, fatPerUnit, carbsPerUnit, proteinPerUnit }
        );
    }

}