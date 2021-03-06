import { AppThunk } from 'index';
import { apiURL } from '../../utils/constants';
import { AppDispatch } from 'index';

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const INCREASE_COUNTER: 'INCREASE_COUNTER' = 'INCREASE_COUNTER';
export const DECREASE_COUNTER: 'DECREASE_COUNTER' = 'DECREASE_COUNTER';
export const RESET_COUNTER: 'RESET_COUNTER' = 'RESET_COUNTER';

export function getIngredients(): AppThunk {
    return function (dispatch: AppDispatch) {
        try {
            dispatch({
                type: GET_INGREDIENTS
            })
            fetch(`${apiURL}/ingredients`).then(res => {
                if (res && res.ok) {
                    return res.json();
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    })
                    return res.json();
                }
            }).then((json) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredientsData: json.data
                })
                return json;
            }).catch(err => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
                return err;
            })
        } catch (err) {
            console.log(err);
        }
    }
}