import {RecipeDetail} from "../../model/recipedetail";

let recipeDetailId: number | undefined = undefined;
let totalLikes: number = 1586;
let difficulty: number = 3
let cookingTime: number = 30;

test('given: valid values for recipeDetail, when: RecipeDetail is created, then: RecipeDetail is created with those values', () => {
    //given
    //when
    const recipeDetail: RecipeDetail = new RecipeDetail({recipeDetailId, totalLikes, difficulty, cookingTime})

    //then
    expect(recipeDetailId).toBe(recipeDetail.getRecipeDetailId())
    expect(totalLikes).toBe(recipeDetail.getTotalLikes())
    expect(difficulty).toBe(recipeDetail.getDifficulty())
    expect(cookingTime).toBe(recipeDetail.getCookingTime())
})

test('given: two equal RecipeDetail object, when: the recipeDetail.equals method is called, then: the method will return true', () => {
    // given
    const recipeDetail: RecipeDetail = new RecipeDetail({recipeDetailId, totalLikes, difficulty, cookingTime})

    // when
    const isEqual: boolean = recipeDetail.equals(recipeDetail)

    // then
    expect(isEqual).toBe(true);
})

test('given: two different RecipeDetail object, when: the recipeDetail.equals method is called, then: the method will return false', () => {
    // given
    const recipeDetail1: RecipeDetail = new RecipeDetail({recipeDetailId, totalLikes, difficulty, cookingTime})
    const recipeDetail2: RecipeDetail = new RecipeDetail({recipeDetailId, totalLikes: 0, difficulty, cookingTime})

    // when
    const isEqual: boolean = recipeDetail1.equals(recipeDetail2)

    // then
    expect(isEqual).toBe(false);
})

test('given: the add totalLikes has a value, when we call the recipeDetail.addLike methode the value is incremented by one  ', () => {
    // given
    const recipeDetail: RecipeDetail = new RecipeDetail({recipeDetailId, totalLikes: 5, difficulty, cookingTime})

    // when
    recipeDetail.addLike()

    // then

    expect(recipeDetail.getTotalLikes()).toBe(6)

});

test('given: the totalLikes has a value, when we call the recipeDetail.removeLike methode the value is decremented by one', () => {
    // given
    const recipeDetail: RecipeDetail = new RecipeDetail({recipeDetailId, totalLikes: 5, difficulty, cookingTime})

    // when
    recipeDetail.subtractLike()

    // then

    expect(recipeDetail.getTotalLikes()).toBe(4)

});