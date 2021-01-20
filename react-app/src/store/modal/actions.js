import * as types from "./types";

export const modalShow = (isOpen) => ({
    type: types.MODAL_SHOW,
    payload: isOpen
});

export const modalSetProduct = (productId) => ({
    type: types.MODAL_SET_PRODUCT,
    payload: productId
});

export const modalSetType = (type) => ({
    type: types.SET_MODAL_TYPE,
    payload: type
});