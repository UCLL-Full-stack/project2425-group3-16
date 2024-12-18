type ApplianceInput = {
    applianceId?: number
    name: string
    description: string
    created_at: Date
    updated_at?: Date
}
type IngredientsInput = {
    ingredientId?: number;
    name: string;
    description: string;
    caloriesPerUnit: number;
    fatPerUnit: number
    carbsPerUnit: number;
    proteinPerUnit: number;
}

type RecipeIngredientInput = {
    recipeIngredientId?: number;
    ingredient: IngredientsInput;
    unit: string;
    quantity: number;
};

type RecipeInput = {
    id?: number;
    ingredients: RecipeIngredientInput[];
    user: UserInput;
    title: string;
    description: string;
    instructions: string;
    nutritionFacts: string,
    cookingTips: string,
    extraNotes: string,
    createdAt: Date,
    updatedAt: Date,
    tags: TagInput[]
}

type Role = 'admin' | 'user' | 'guest';

type UserInput = {
    userId?: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

type TagInput = {
    tagId?: number
    name: string
    description:string
}


export { ApplianceInput, IngredientsInput, RecipeIngredientInput, Role, RecipeInput, UserInput, TagInput };