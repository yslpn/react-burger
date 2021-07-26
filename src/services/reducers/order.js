import { ADD_ITEM_TO_ORDER, REMOVE_ITEM_FROM_ORDER, CLEAR_ORDER_ITEMS } from '../actions/order';

const initialState = {
    orderAmount: 0,
    orderNumberElems: 0,
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
                orderNumberElems: state.orderNumberElems + 1
            };
        }
        case REMOVE_ITEM_FROM_ORDER: {
            return {
                ...state,
                modalIsOpened: false,
                orderItems: removeItemOnce(state.orderItems, action.orderItems),
                orderNumberElems: state.orderNumberElems - 1
            };
        }
        case CLEAR_ORDER_ITEMS: {
            return {
                ...state,
                orderItems: [],
                orderAmount: 0
            };
        }
        default: {
            return state
        }
    }
}