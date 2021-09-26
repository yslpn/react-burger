import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTRATION_USER_SUCCESS
} from '../actions/login';
import { loginReducer } from './login';

describe('userReduser', () => {
    it('Should return the initial state', () => {
        expect(loginReducer(undefined, {})).toEqual({
            userLogged: false,
            regUserSuccess: false,
            user: {
                name: '',
                email: '',
            }
        })
    });

    it('Must login user when receiving data', () => {
        expect(loginReducer({
            userLogged: false,
            regUserSuccess: false,
            user: {
                name: '',
                email: '',
            }
        }, {
            type: LOGIN_USER,
            email: 'test-user@gmail.com',
            name: 'test-user'
        })).toEqual({
            userLogged: true,
            regUserSuccess: false,
            user: {
                email: 'test-user@gmail.com',
                name: 'test-user'
            }
        })
    });

    it('Should log out the user by clearing the data', () => {
        expect(loginReducer({
            userLogged: true,
            regUserSuccess: false,
            user: {
                email: 'test-user@gmail.com',
                name: 'test-user'
            }
        }, {
            type: LOGOUT_USER,
        })).toEqual({
            userLogged: false,
            regUserSuccess: false,
            user: {
                name: '',
                email: '',
            }
        })
    });

    it('Should register upon successful registration', () => {
        expect(loginReducer({
            userLogged: false,
            regUserSuccess: false,
            user: {
                email: '',
                name: ''
            }
        }, {
            type: REGISTRATION_USER_SUCCESS,
        })).toEqual({
            userLogged: false,
            regUserSuccess: true,
            user: {
                name: '',
                email: '',
            }
        })
    });
})