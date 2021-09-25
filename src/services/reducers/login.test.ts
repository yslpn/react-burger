import {
    LOGIN_USER,
    LOGOUT_USER
} from '../actions/login';
import { loginReducer } from './login';

describe('userReduser', () => {
    it('Should return the initial state', () => {
        expect(loginReducer(undefined, {})).toEqual({
            userLogged: false,
            user: {
                name: '',
                email: '',
            }
        })
    });

    it('Must login user when receiving data', () => {
        expect(loginReducer({
            userLogged: false,
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
            user: {
                email: 'test-user@gmail.com',
                name: 'test-user'
            }
        })
    });

    it('Should log out the user by clearing the data', () => {
        expect(loginReducer({
            userLogged: true,
            user: {
                email: 'test-user@gmail.com',
                name: 'test-user'
            }
        }, {
            type: LOGOUT_USER,
        })).toEqual({
            userLogged: false,
            user: {
                name: '',
                email: '',
            }
        })
    });
})