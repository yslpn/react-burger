import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, INCREASE_COUNTER, DECREASE_COUNTER, RESET_COUNTER } from '../actions/ingredients';

const initialState = {
    ingredientsRequest: false,
    ingredientsRequestSuccess: false,
    ingredientsFailed: false,
    ingredientsData: []
}

const resetCounters = (data) => {
    return data.map((item) => {
        item.__v = 0;
        return item
    });
};

const changeCounter = (data, elem, option) => {
    return data.map((item) => {
        if (elem._id === item._id) {
            option === 'plus' ? item.__v += 1 : item.__v -= 1;
        }
        return item;
    });
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
                ingredientsRequestSuccess: false
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsData: action.ingredientsData,
                ingredientsRequest: false,
                ingredientsRequestSuccess: true
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false,
                ingredientsRequestSuccess: false
            };
        }
        case INCREASE_COUNTER: {
            return {
                ...state,
                ingredientsData: changeCounter(state.ingredientsData, action.ingredient, 'plus'),
            };
        }
        case DECREASE_COUNTER: {
            return {
                ...state,
                ingredientsData: changeCounter(state.ingredientsData, action.ingredient, 'minus'),
            };
        }
        case RESET_COUNTER: {
            return {
                ...state,
                ingredientsData: resetCounters(state.ingredientsData)
            };
        }
        default: {
            return state
        }
    }
}