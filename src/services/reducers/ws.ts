import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_GET_FEED_ORDERS,
    WS_CONNECTION_GET_USER_ORDERS
} from '../actions/ws';
import { TOrder } from 'types';

interface IinitialState {
    wsConnected: boolean,
    feedOrdersSuccess: boolean,
    profileOrdersSuccess: boolean,
    feedOrders: TOrder[],
    profileOrders: TOrder[],
    total: null | number,
    totalToday: null | number
}

const initialState: IinitialState = {
    wsConnected: false,
    feedOrdersSuccess: false,
    profileOrdersSuccess: false,
    feedOrders: [],
    profileOrders: [],
    total: null,
    totalToday: null,
};

const sortingByDate = (a: TOrder, b: TOrder): number => {
    const result = new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
    return result;
}

export const wsReducer = (state = initialState, action): any => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true,
                feedOrdersSuccess: false,
                profileOrdersSuccess: false
            }
        }
        case WS_CONNECTION_ERROR: {
            return {
                initialState
            };
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false,
                feedOrdersSuccess: false,
                profileOrdersSuccess: false
            };
        }
        case WS_CONNECTION_GET_FEED_ORDERS: {
            return {
                ...state,
                feedOrders: action.payload.orders?.sort(sortingByDate),
                total: action.payload.total,
                totalToday: action.payload.totalToday,
                feedOrdersSuccess: true,
            }
        }
        case WS_CONNECTION_GET_USER_ORDERS: {
            return {
                ...state,
                profileOrders: action.payload.orders?.sort(sortingByDate),
                total: action.payload.total,
                totalToday: action.payload.totalToday,
                profileOrdersSuccess: true,
            }
        }
        default: {
            return state;
        }
    }
}