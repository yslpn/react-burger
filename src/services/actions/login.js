import { loginRequest, logoutRequest, registerRequest, getUserRequest, updateUserRequest } from '../api';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const login = (formData) => {
    return async function (dispatch) {
        const res = await loginRequest(formData);
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
        localStorage.removeItem('token');
        dispatch({
            type: LOGOUT_USER
        });
        return res;
    }
}

export const getUser = () => {
    return async function (dispatch) {
        const res = await getUserRequest();
        if (res && res.success) {
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
}

export const updateUser = (formData) => {
    return async function (dispatch) {
        const res = await updateUserRequest(formData);
        if (res && res.success) {
            localStorage.setItem('userName', res.user.name);
            localStorage.setItem('userEmail', res.user.email);
            dispatch({
                type: LOGIN_USER,
                name: res.user.name,
                email: res.user.email
            });
        }
        return res;
    }
}
