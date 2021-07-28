import { ADD_ITEM_TO_ORDER, REMOVE_ITEM_FROM_ORDER, CLEAR_ORDER_ITEMS, ADD_FULL_ORDER_LIST } from '../actions/order';

const initialState = {
    orderItems: []
}

const removeItemOnce = (arr, value) => {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_ORDER: {
            return {
                ...state,
                modalIsOpened: false,
                orderItems: [...state.orderItems, action.orderItems],
            };
        }
        case REMOVE_ITEM_FROM_ORDER: {
            return {
                ...state,
                modalIsOpened: false,
                orderItems: removeItemOnce(state.orderItems, action.orderItems),     
            };
        }
        case CLEAR_ORDER_ITEMS: {
            return {
                ...state,
                orderItems: []
            };
        }
        case ADD_FULL_ORDER_LIST: {
            return {
                ...state,
                orderItems: action.orderItems
            };
        }
        default: {
            return state
        }
    }
}