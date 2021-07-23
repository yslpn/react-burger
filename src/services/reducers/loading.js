import { LOADING, LOADED, ERROR } from '../actions/loading';

const initialState = [
    {
        isLoading: true,
        hasError: false
    }
]

export const loadingReducer = (store = initialState, action) => {
    switch (action.type) {

        case LOADING:
            return {
                ...store,
                isLoading: true,
            }

        case LOADED:
            return {
                ...store,
                isLoading: false,
            }


        case ERROR:
            return {
                isLoading: false,
                isError: true,
            }

        default:
            return store
    }
}

