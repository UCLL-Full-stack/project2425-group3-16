export class Ingredient {
    private ingredientId?: number;
    private name: string;
    private description: string;
    private caloriesPerUnit: number;
    private fatPerUnit: number
    private carbsPerUnit: number;
    private proteinPerUnit: number;

    constructor(ingredient: {
        ingredientId?: number,
        name: string,
        description: string,
        caloriesPesUnit: number,
        fatPerUnit: number,
        carbsPerUnit: number,
        proteinPerUnit:number
    }) {
        this.ingredientId= ingredient.ingredientId
        this.name = ingredient.name
        this.description = ingredient.description
        this.caloriesPerUnit = ingredient.caloriesPesUnit
        this.fatPerUnit = ingredient.fatPerUnit
        this.carbsPerUnit = ingredient.carbsPerUnit
        this.proteinPerUnit = ingredient.proteinPerUnit
    }

    getName(): string {
        return  this.name
    }

    getDescription(): string {
        return this.description
    }

    getCaloriesPerUnit(): number {
        return this.caloriesPerUnit
    }

    getFatPerUnit(): number {
        return  this.fatPerUnit
    }

    getCarbsPerUnit(): number {
        return  this.carbsPerUnit
    }

    getProteinPerUnit(): number {
        return this.proteinPerUnit
    }


    equals(ingredient: Ingredient): boolean {
        return (
            this.name === ingredient.getName() &&
            this.description === ingredient.getDescription() &&
            this.caloriesPerUnit === ingredient.getCaloriesPerUnit() &&
            this.fatPerUnit === ingredient.getFatPerUnit() &&
            this.carbsPerUnit === ingredient.getCarbsPerUnit() &&
            this.proteinPerUnit === ingredient.getProteinPerUnit()
        )
    }

}