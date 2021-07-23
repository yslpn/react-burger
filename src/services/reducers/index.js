import { combineReducers } from 'redux';
import { loadingReducer } from './loading';

export const rootReducer = combineReducers({
    loading: loadingReducer
}) 