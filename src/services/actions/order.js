import { apiURL } from '../../utils/constants';

export const ADD_ITEM_TO_ORDER = 'ADD_ITEM_TO_ORDER';
export const REMOVE_ITEM_FROM_ORDER = 'REMOVE_ITEM_FROM_ORDER';
export const CLEAR_ORDER_ITEMS = 'CLEAR_ORDER_ITEMS';

const sendResource = (url, data) => {
    return fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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

export const makeOrder = (sendData) => {
    return async function (dispatch) {
        try {
            const res = await sendResource(`${apiURL}/orders`, { "ingredients": sendData });
            console.log(res);
            dispatch({ type: 'OPEN_MODAL', orderDetails: res });
        } catch (err) {
            console.log(err);
        }
    }
};