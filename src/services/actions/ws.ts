export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_END: 'WS_CONNECTION_END' = 'WS_CONNECTION_END';
export const WS_USER_CONNECTION_START: 'WS_USER_CONNECTION_START' = 'WS_USER_CONNECTION_START';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_CONNECTION_GET_FEED_ORDERS: 'WS_CONNECTION_GET_FEED_ORDERS'= 'WS_CONNECTION_GET_FEED_ORDERS';
export const WS_CONNECTION_GET_USER_ORDERS: 'WS_CONNECTION_GET_USER_ORDERS' = 'WS_CONNECTION_GET_USER_ORDERS';
import { TOrder } from "types";

interface IWithPayload {
    type: string;
    payload: TOrder[] | TOrder;
}
interface IWithOutPayload {
    type: string;
}

export const getFeedOrders = (message: TOrder[]): IWithPayload => {
    return {
        type: WS_CONNECTION_GET_FEED_ORDERS,
        payload: message
    }
};

export const getProfileOrders = (message: TOrder[]): IWithPayload => {
    return {
        type: WS_CONNECTION_GET_USER_ORDERS,
        payload: message
    }
};

export const wsConnectionSuccess = (): IWithOutPayload => {
    return {
        type: WS_CONNECTION_SUCCESS
    };
};

export const wsConnectionError = (): IWithOutPayload => {
    return {
        type: WS_CONNECTION_ERROR
    };
};

export const wsConnectionClosed = (): IWithOutPayload => {
    return {
        type: WS_CONNECTION_CLOSED
    };
};

export const wsSendMessage = (message): IWithPayload => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message
    }
}