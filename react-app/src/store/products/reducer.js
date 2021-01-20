import * as types from "./types";

const favouritesCnt = (JSON.parse(localStorage.getItem('favourites')) || []).length;
const cartCnt = Object.values(JSON.parse(localStorage.getItem('cart')) || {})
    .reduce((prev, curr) => prev + curr, 0);

const initialState = {
    isLoading: false,
    data: [],
    favourites: [],
    cart: [],
    favouritesCnt,
    cartCnt
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PRODUCTS_LOADING:
            return {...state, isLoading: action.payload};
        case types.PRODUCTS_SAVE:
            return {...state, data: action.payload};
        case types.FAVOURITES_SAVE:
            return {...state, favourites: action.payload};
        case types.CART_SAVE:
            return {...state, cart: action.payload};
        case types.FAVOURITES_CNT_SET:
            return {...state, favouritesCnt: action.payload};
        case types.CART_CNT_SET:
            return {...state, cartCnt: action.payload};
        default:
            return state;
    }
};