import { apiURL } from '../../utils/constants';
import { getCookie } from 'utils/cookie';
import { AppThunk } from 'index';
import { TIngredient } from 'types';
import { AppDispatch } from 'index';

export const ADD_ITEM_TO_ORDER: 'ADD_ITEM_TO_ORDER' = 'ADD_ITEM_TO_ORDER';
export const REMOVE_ITEM_FROM_ORDER: 'REMOVE_ITEM_FROM_ORDER' = 'REMOVE_ITEM_FROM_ORDER';
export const CLEAR_ORDER_ITEMS: 'CLEAR_ORDER_ITEMS' = 'CLEAR_ORDER_ITEMS';
export const ADD_FULL_ORDER_LIST: 'ADD_FULL_ORDER_LIST' = 'ADD_FULL_ORDER_LIST';

const sendResource = (url: string, data: { "ingredients": TIngredient[] }) => {
    return fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie('token'),
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, received ${response.status}`)
            };
            return response.json();
        })
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
};

export const makeOrder = (sendData: TIngredient[]): AppThunk => {
    return async function (dispatch: AppDispatch) {
        try {
            const res = await sendResource(`${apiURL}/orders`, { "ingredients": sendData });
            dispatch({ type: 'OPEN_MODAL', orderDetails: res });
        } catch (err) {
            console.log(err);
        }
    }
};

export const dropToCart = (itemId: { _id?: string; }, ingredientsData: TIngredient[], orderItems: TIngredient[]): AppThunk => {
    return function (dispatch: AppDispatch) {
        try {
            const item = ingredientsData.find(i => i._id === itemId._id);
            if (item.type === 'bun') {
                orderItems.map((elem) => {
                    if (elem.type === 'bun') {
                        dispatch({ type: 'REMOVE_ITEM_FROM_ORDER', orderItems: elem });
                        dispatch({ type: 'DECREASE_COUNTER', ingredient: elem });
                        dispatch({ type: 'DECREASE_COUNTER', ingredient: elem });
                    }
                    return null;
                })
                dispatch({ type: 'ADD_ITEM_TO_ORDER', orderItems: item });
                dispatch({ type: 'INCREASE_COUNTER', ingredient: item });
                dispatch({ type: 'INCREASE_COUNTER', ingredient: item });
            } else {
                dispatch({ type: 'ADD_ITEM_TO_ORDER', orderItems: item });
                dispatch({ type: 'INCREASE_COUNTER', ingredient: item });
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export const delElem = (elem: TIngredient): AppThunk => {
    return function (dispatch: AppDispatch) {
        try {
            dispatch({ type: 'REMOVE_ITEM_FROM_ORDER', orderItems: elem });
            dispatch({ type: 'DECREASE_COUNTER', ingredient: elem });
        } catch (err) {
            console.log(err);
        }
    }
};