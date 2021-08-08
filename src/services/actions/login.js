import { loginRequest, logoutRequest, registerRequest } from '../api';
import { setCookie } from 'utils/cookie';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const login = (formData) => {
    return async function (dispatch) {
        const res = await loginRequest(formData);
        console.log(res);
        setCookie('token', res.accessToken);
        localStorage.setItem('token', res.refreshToken);
        localStorage.setItem('userName', res.user.name);
        localStorage.setItem('userEmail', res.user.email);
        dispatch({
            type: LOGIN_USER,
            name: res.user.name,
            email: res.user.email
        });
        return res;
    }
}

export const register = (formData) => {
    return async function () {
        const res = await registerRequest(formData);
        return res;
    }
}

export const logout = () => {
    return async function (dispatch) {
        const res = await logoutRequest();
        console.log(res);
        setCookie('token', '');
        localStorage.removeItem('token')
        dispatch({
            type: LOGOUT_USER
        });
        return res;
    }
}