import types  from './types';

const setIsAuth = (isAuth) => ({
    type: types.SET_IS_AUTH,
    payload: isAuth
});

const setData = (data) => ({
    type: types.SET_DATA,
    payload: data
});

const setToken = (token) => ({
    type: types.SET_TOKEN,
    payload: token
});

const setEvents = (events) => ({
    type: types.SET_EVENTS,
    payload: events
});

export default {
    setIsAuth,
    setData,
    setToken,
    setEvents,
};