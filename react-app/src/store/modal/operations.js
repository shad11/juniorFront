import {modalShow, modalSetType, modalSetProduct} from "./actions";

export const showModalToCart = (productId) => dispatch => {
    dispatch(modalSetProduct(productId));
    dispatch(modalSetType('toCart'));
    dispatch(modalShow(true));
};

export const showModalFromCart = (productId) => dispatch => {
    dispatch(modalSetProduct(productId));
    dispatch(modalSetType('fromCart'));
    dispatch(modalShow(true));
};