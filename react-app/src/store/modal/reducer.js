import * as types from "./types";

const initialState = {
    isOpen: false,
    productId: null,
    modalType: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type){
        case types.MODAL_SHOW:
            return {...state, isOpen: action.payload};
        case types.MODAL_SET_PRODUCT:
            return {...state, productId: action.payload};
        case types.SET_MODAL_TYPE:
            return {...state, modalType: action.payload};
        default:
            return state;
    }
};