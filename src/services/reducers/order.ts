import {
    ADD_ITEM_TO_ORDER,
    REMOVE_ITEM_FROM_ORDER,
    CLEAR_ORDER_ITEMS,
    ADD_FULL_ORDER_LIST
} from '../actions/order';
import { TOrder } from 'types';
interface IinitialState {
    orderItems: TOrder[] | [],
}
const initialState: IinitialState = {
    orderItems: []
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_ORDER: {
            return {
                orderItems: [...state.orderItems, action.orderItems],
            };
        }
        case REMOVE_ITEM_FROM_ORDER: {
            const removeItemOnce = (arr: TOrder[], value: TOrder) => {
                const index = arr.indexOf(value);
                if (index > -1) {
                    arr.splice(index, 1);
                }
                return arr;
            }
            return {
                orderItems: removeItemOnce(state.orderItems, action.orderItems),
            };
        }
        case CLEAR_ORDER_ITEMS: {
            return {
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