type RecipeIngredientInput = {
    recipeingredientId?: number;
    recipeId: number;
    ingredientId: number;
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

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: Role
};


export { RecipeIngredientInput, Role, RecipeInput, UserInput, TagInput, AuthenticationResponse };