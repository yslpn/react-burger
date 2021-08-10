import { apiURL } from '../utils/constants';
import { setCookie, getCookie } from '../utils/cookie';

export const loginRequest = async formData => {
    try {
        const res = await fetch(`${apiURL}/auth/login`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(formData)
        }).then(res => res.json()).then(json => {
            setCookie('token', json.accessToken);
            return json;
        }).catch(err => err);

        return res;
    } catch (error) {
        console.log(error.message)
        return Promise.reject(error.message)
    }
};

export const logoutRequest = async () => {
    try {
        const res = await fetch(`${apiURL}/auth/logout`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                token: localStorage.getItem('token'),
            })
        }).then(res => res.json()).then(json => json).catch(err => err);
        setCookie('token', '');
        return res;
    } catch (error) {
        console.log(error.message)
        return Promise.reject(error.message)
    }
};

export const registerRequest = async formData => {
    try {
        return await fetch(`${apiURL}/auth/register`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(formData)
        }).then(res => res.json()).then(json => json).catch(err => err);;
    } catch (error) {
        console.log(error.message)
        return Promise.reject(error.message)
    }
};

export const getUserRequest = async () => {
    try {
        return await fetch(`${apiURL}/auth/user`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                authorization: getCookie('token'),
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }).then(res => res.json()).then(json => json).catch(err => err);
    } catch (error) {
        console.log(error.message)
        return Promise.reject(error.message)
    }
};

export const updateUserRequest = async formData => {
    try {
        console.log(formData);
        const res = await fetch(`${apiURL}/auth/user`, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                authorization: getCookie('token'),
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(formData),
        }).then(res => res.json()).then(json => json).catch(err => err);

        console.log(res);
        return res;
    } catch (error) {
        console.log(error.message)
        return Promise.reject(error.message)
    }
};

export const forgotPassRequest = async email => {
    try {
        const res = await fetch(`${apiURL}/password-reset`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({email}),
        }).then(res => res.json()).then(json => json).catch(err => err);
        return res;
    } catch (error) {
        console.log(error.message)
        return Promise.reject(error.message)
    }
};

export const newPassRequest = async formData => {
    try {
        const res = await fetch(`${apiURL}/password-reset/reset`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(formData),
        }).then(res => res.json()).then(json => json).catch(err => err);
        return res;
    } catch (error) {
        console.log(error.message)
        return Promise.reject(error.message)
    }
};