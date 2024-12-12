import { Tag } from './tags';
import { User } from './user';
import {RecipeIngredient} from "./recipeingredient";

export class Recipe {
    private recipeId?: number;
    private user: User;
    private title: string;
    private description: string;
    private instructions: string;
    private nutritionFacts: string;
    private cookingTips: string;
    private extraNotes: string;
    private createdAt: Date;
    private updatedAt: Date;
    private tags: Tag[];
    private recipeIngredients: RecipeIngredient[];

    constructor(recipe: {
        recipeId?: number;
        user: User;
        title: string;
        description: string;
        instructions: string;
        nutritionFacts: string;
        cookingTips: string;
        extraNotes: string;
        createdAt: Date;
        updatedAt: Date;
        tags: Tag[];
        recipeIngredients: RecipeIngredient[]
    }) {
        this.validate(recipe);

        this.recipeId = recipe.recipeId;
        this.user = recipe.user;
        this.title = recipe.title;
        this.description = recipe.description;
        this.instructions = recipe.instructions;
        this.nutritionFacts = recipe.nutritionFacts;
        this.cookingTips = recipe.cookingTips;
        this.extraNotes = recipe.extraNotes;
        this.createdAt = recipe.createdAt;
        this.updatedAt = recipe.updatedAt;
        this.tags = recipe.tags;
        this.recipeIngredients = recipe.recipeIngredients
    }

    public getRecipeId(): number | undefined {
        return this.recipeId;
    }

    public getUser(): User {
        return this.user;
    }
    public getTitle(): string {
        return this.title;
    }
    public getDescription(): string {
        return this.description;
    }
    public getInstructions(): string {
        return this.instructions;
    }
    public getNutritionFacts(): string {
        return this.nutritionFacts;
    }
    public getCookingTips(): string {
        return this.cookingTips;
    }
    public getExtraNotes(): string {
        return this.extraNotes;
    }
    public getCreationDate(): Date {
        return this.createdAt;
    }
    public getUpdateAt(): Date {
        return this.updatedAt;
    }
    public getTags(): Tag[] {
        return this.tags;
    }
    public getRecipeIngredients (): RecipeIngredient[] {
        return this.recipeIngredients
    }

    private validate(recipe: {
        user: User;
        title: string;
        description: string;
        instructions: string;
        nutritionFacts: string;
        cookingTips: string;
        extraNotes: string;
        createdAt: Date;
        updatedAt: Date;
        tags: Tag[];
    }) {
        if (!recipe.user) {
            throw new Error('User is required');
        }
        if (!recipe.title) {
            throw new Error('Title is required');
        }
        if (!recipe.description) {
            throw new Error('Description is required');
        }
        if (!recipe.instructions) {
            throw new Error('Instructions are required');
        }
        if (!recipe.nutritionFacts) {
            throw new Error('Nutrition facts are required');
        }
        if (!recipe.cookingTips) {
            throw new Error('Cooking tips are required');
        }
        if (!recipe.extraNotes) {
            throw new Error('Extra notes are required');
        }
        if (!recipe.createdAt) {
            throw new Error('Creation date is required');
        }
        if (!recipe.updatedAt) {
            throw new Error('Update date is required');
        }
        if (!recipe.tags || recipe.tags.length === 0) {
            throw new Error('At least one tag is required');
        }
    }

    equals(recipe: Recipe): boolean {
        return (
            this.recipeId === recipe.recipeId &&
            this.user === recipe.user &&
            this.title === recipe.title &&
            this.description === recipe.description &&
            this.instructions === recipe.instructions &&
            this.nutritionFacts === recipe.nutritionFacts &&
            this.cookingTips === recipe.cookingTips &&
            this.extraNotes === recipe.extraNotes &&
            this.createdAt === recipe.createdAt &&
            this.updatedAt === recipe.updatedAt &&
            this.tags.every((tag, index) => tag.equals(recipe.getTags()[index]))
        );
    }
}
