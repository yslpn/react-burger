import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';

const initialState = {
    modalIsOpened: false,
    ingredientDetails: {},
    orderDetails: {}
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                modalIsOpened: true,
                ingredientDetails: action.ingredientDetails,
                orderDetails: action.orderDetails,
            };
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                modalIsOpened: false,
                ingredientDetails: {},
            };
        }
        default: {
            return state
        }
    }
}