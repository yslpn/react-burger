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
        console.log(error)
        return Promise.reject(error)
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
                token: localStorage.getItem('refreshToken')
            })
        }).then(res => res.json()).then(json => json).catch(err => err);
        setCookie('token', '');
        return res;
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
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
        console.log(error)
        return Promise.reject(error)
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
        console.log(error)
        return Promise.reject(error)
    }
};

export const updateUserRequest = async formData => {
    try {
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
        return res;
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
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
        console.log(error)
        return Promise.reject(error)
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
        console.log(error)
        return Promise.reject(error)
    }
};

export const refreshTokenRequest = async (after, args=null) => {
    const refreshToken = localStorage.getItem('token');
    try {
      const res = await fetch(`${apiURL}/auth/token`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      }).then(res => res.json()).then(json => json).catch(err => err);
      if (res.success) {
          setCookie('token', res.accessToken);
          localStorage.setItem('token', res.refreshToken);
          localStorage.setItem('refreshToken', res.accessToken);
          console.log('token refreshed!');
          if (after) {
            return await after(args)
          }
      }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
  }