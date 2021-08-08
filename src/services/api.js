import { apiURL } from '../utils/constants';

export const loginRequest = async formData => {
    try {
        return await fetch(`${apiURL}/auth/login`, {
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
        }).then(res => res.json())
            .then(json => json)
            .catch(err => err);
    } catch (error) {
        console.log(error.message)
        return Promise.reject(error.message)
    }
};

export const logoutRequest = async () => {
    try {
        return await fetch(`${apiURL}/auth/logout`, {
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
        });
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
        });
    } catch (error) {
        console.log(error.message)
        return Promise.reject(error.message)
    }
};