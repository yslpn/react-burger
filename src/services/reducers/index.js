import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { orderReducer } from './order';
import { loginReducer } from './login';
import { wsReducer } from './ws';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modal: modalReducer,
    order: orderReducer,
    login: loginReducer,
    ws: wsReducer
})