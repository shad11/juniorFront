import types from "./types";

const initialState = {
    isAuth: false,
    data: {},
    token: '',
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_IS_AUTH:
            return {...state, isAuth: action.payload};
        case types.SET_DATA:
            return {...state, data: action.payload};
        case types.SET_TOKEN:
            return {...state, token: action.payload};
        case types.SET_EVENTS:
            return {...state, dataUser: { ...state.dataUser, events: action.payload}}
        default:
            return state;
    }
};