import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, INCREASE_COUNTER, DECREASE_COUNTER } from '../actions/ingredients';

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsData: []
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsData: action.ingredientsData,
                ingredientsRequest: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            };
        }
        case INCREASE_COUNTER: {
            return {
                ...state,
                ingredientsData: [...state.ingredientsData, action.ingredient.__v += 1],
            };
        }
        case DECREASE_COUNTER: {
            return {
                ...state,
                ingredientsData: [...state.ingredientsData, action.ingredient.__v -= 1],
            };
        }
        default: {
            return state
        }
    }
}