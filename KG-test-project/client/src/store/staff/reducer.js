import * as types from './types';

const initialState = {
    isLoading: false,
    data: [],
    employeeSelected: null
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_IS_LOADING:
            return {...state, isLoading: action.payload};
        case types.SAVE_DATA:
            return {...state, data: action.payload};
        case types.SELECT_EMPLOYEE:
            return {...state, employeeSelected: action.payload};
        default:
            return state;
    }
};