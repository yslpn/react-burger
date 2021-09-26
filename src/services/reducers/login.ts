import { 
    LOGIN_USER, 
    LOGOUT_USER 
} from '../actions/login';

interface IinitialState {
    userLogged: boolean,
    user: {
        name: string;
        email: string;
    }
}

const initialState: IinitialState = {
    userLogged: false,
    user: {
        name: '',
        email: '',
    }
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            return {
                ...state,
                userLogged: true,
                user: {
                    name: action.name,
                    email: action.email
                }
            };
        }
        case LOGOUT_USER: {
            return {
                ...state,
                userLogged: false,
                user: {
                    name: '',
                    email: '',
                }
            };
        }
        default: {
            return state
        }
    }
}