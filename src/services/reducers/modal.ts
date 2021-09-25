import { 
    OPEN_MODAL, 
    LOADING_MODAL, 
    CLOSE_MODAL 
} from '../actions/modal';

const initialState = {
    modalIsOpened: false,
    modalIsLoading: false,
    ingredientDetails: {},
    orderDetails: {},
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                modalIsOpened: true,
                modalIsLoading: false,
                ingredientDetails: action.ingredientDetails ? action.ingredientDetails : undefined,
                orderDetails: action.orderDetails ? action.orderDetails : undefined,
            };
        }
        case LOADING_MODAL: {
            return {
                ...state,
                modalIsLoading: true
            };
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                modalIsOpened: false,
                modalIsLoading: false,
                ingredientDetails: {},
            };
        }
        default: {
            return state
        }
    }
}