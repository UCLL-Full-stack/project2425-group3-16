export class RecipeDetail {
    private recipeDetailId?: number;
    private totalLikes: number;
    private difficulty: number;
    private cookingTime: number;

    constructor(recipeDetail: {
        recipeDetailId?: number,
        totalLikes: number,
        difficulty: number,
        cookingTime: number
    }) {
        this.recipeDetailId = recipeDetail.recipeDetailId;
        this.totalLikes = recipeDetail.totalLikes;
        this.difficulty = recipeDetail.difficulty;
        this.cookingTime = recipeDetail.cookingTime;
    }

    getRecipeDetailId(): number | undefined {
        return this.recipeDetailId;
    }

    getTotalLikes(): number {
        return this.totalLikes;
    }

    getDifficulty(): number {
        return this.difficulty;
    }

    getCookingTime(): number {
        return this.cookingTime;
    }

    equals(recipeDetail: RecipeDetail): boolean {
        return (
            this.totalLikes === recipeDetail.getTotalLikes() &&
            this.difficulty === recipeDetail.getDifficulty() &&
            this.cookingTime === recipeDetail.getCookingTime()
        )
    }

    public addLike(): void {
        this.totalLikes += 1;
    }

    public subtractLike(): void {
        this.totalLikes -= 1;
    }
}