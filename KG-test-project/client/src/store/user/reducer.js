import * as types from './types';

const initialState = {
    token: '',
    isAuth: false,
    data: {},
    error: null
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TOKEN:
            return {...state, token: action.payload};
        case types.SET_IS_AUTH:
            return {...state, isAuth: action.payload};
        case types.SET_DATA:
            return {...state, data: action.payload};
        case types.SET_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    }
};