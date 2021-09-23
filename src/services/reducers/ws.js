import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_GET_FEED_ORDERS,
    WS_CONNECTION_GET_USER_ORDERS
} from '../actions/ws';

export const sortingByDate = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
}

export const initialState = {
    wsConnected: false,
    getOrdersSuccess: false,
    feedOrders: [],
    profileOrders: [],
    total: null,
    totalToday: null,
};

export const wsReducer = ( state=initialState, action ) => {
    switch(action.type) {
        case  WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true,
                getOrdersSuccess: false,
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
                getOrdersSuccess: false,
            };
        }
        case WS_CONNECTION_GET_FEED_ORDERS: {
            return {
                ...state,
                feedOrders: action.payload.orders?.sort(sortingByDate),
                total: action.payload.total,
                totalToday: action.payload.totalToday,
                getOrdersSuccess: true,
            }
        }
        case WS_CONNECTION_GET_USER_ORDERS: {
            return {
                ...state,
                profileOrders: action.payload.orders?.sort(sortingByDate),
                total: action.payload.total,
                totalToday: action.payload.totalToday,
                getOrdersSuccess: true,
            }
        }
        default: {
            return state;
        }
    }
}