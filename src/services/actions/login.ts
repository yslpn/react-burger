import { AppThunk } from 'index';
import {
    loginRequest,
    logoutRequest,
    registerRequest,
    getUserRequest,
    updateUserRequest,
    refreshTokenRequest
} from '../api';

export const LOGIN_USER: 'LOGIN_USER' = 'LOGIN_USER';
export const LOGOUT_USER: 'LOGOUT_USER' = 'LOGOUT_USER';
export const REGISTRATION_USER_SUCCESS: 'REGISTRATION_USER_SUCCESS' = 'REGISTRATION_USER_SUCCESS';

export const login = (formData: { email: string; password: string; }): AppThunk => {
    return async function (dispatch) {
        const res = await loginRequest(formData);
        if (res.success) {
            localStorage.setItem('token', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            localStorage.setItem('userName', res.user.name);
            localStorage.setItem('userEmail', res.user.email);
            dispatch({
                type: LOGIN_USER,
                name: res.user.name,
                email: res.user.email
            });
        } else {
            alert(res.message)
        }
        return res;
    }
}

export const register = (formData: { name: string; email: string; password: string; }): AppThunk => {
    return async function (dispatch) {
        const res = await registerRequest(formData);
        if (res.success) {
            dispatch({
                type: REGISTRATION_USER_SUCCESS
            });
        } else {
            console.log(res.message);
            alert(res.message);
        }
        return res;
    }
}

export const logout = (): AppThunk => {
    return async function (dispatch) {
        const res = await logoutRequest();
        if (res.success) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            dispatch({
                type: LOGOUT_USER
            });
        }
        return res;
    }
}

export const getUser = (): AppThunk => {
    return async function (dispatch) {
        const res = await getUserRequest();
        if (res.success) {
            localStorage.setItem('userName', res.user.name);
            localStorage.setItem('userEmail', res.user.email);
            dispatch({
                type: LOGIN_USER,
                name: res.user.name,
                email: res.user.email
            });
            return res;
        }
        if (res.message === 'jwt expired') {
            console.log(res.message)
            await refreshTokenRequest(getUserRequest, null)
        }
    }
}

export const updateUser = (formData: { name: string, email: string, password: string }): AppThunk => {
    return async function (dispatch) {
        const res = await updateUserRequest(formData);
        if (res.success) {
            localStorage.setItem('userName', res.user.name);
            localStorage.setItem('userEmail', res.user.email);
            dispatch({
                type: LOGIN_USER,
                name: res.user.name,
                email: res.user.email
            });
            return res;
        }
        if (res.message === 'jwt expired') {
            console.log(res.message)
            await refreshTokenRequest(updateUser, formData)
        }
    }
}
