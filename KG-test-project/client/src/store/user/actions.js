import * as types from './types';

export const setToken = token => ({
    type: types.SET_TOKEN,
    payload: token,
});

export const setIsAuth = auth => ({
    type: types.SET_IS_AUTH,
    payload: auth,
});

export const setData = data => ({
    type: types.SET_DATA,
    payload: data,
});