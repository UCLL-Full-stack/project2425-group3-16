export type Appliance = {
    applianceId?: number
    name: string
    description: string
    created_at: Date
    updated_at?: Date
}

export type RecipeIngredient = {
    recipeingredientId?: number;
    recipeId: number;
    ingredientId: number;
    unit: string;
    quantity: number;
};

export type Recipe = {
    _recipeId?: number;
    ingredients: RecipeIngredient[];
    _user: User;
    _title: string;
    _description: string;
    _instructions: string;
    _nutritionFacts: string;
    _cookingTips: string;
    _extraNotes: string;
    _createdAt: Date;
    _updatedAt: Date;
    _tags: Tag[];
}

export type Role = 'admin' | 'user' | 'guest';

export type User = {
    _username: string;
    _firstName: string;
    _lastName: string;
    _email: string;
    _password: string;
    _role: Role;
}

export type Tag = {
    _tagId?: number;
    _name: string;
    _description: string;
}

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};