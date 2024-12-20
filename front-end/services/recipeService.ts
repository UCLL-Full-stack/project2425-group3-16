const getAllRecipes = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/recipes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const getRecipeById = ({ id }: { id: string }) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/recipes/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const recipeService = {
    getAllRecipes,
    getRecipeById
}

export default recipeService;