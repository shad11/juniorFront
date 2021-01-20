import axios from "axios";
import { productsLoading, savingFavourites, savingProducts, savingCart, favouritesCntSet, cartCntSet } from "./actions";

export const loadProducts = () => dispatch => {
    dispatch(productsLoading(true));

    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    axios.get('/products.json')
        .then(res => {
            const data = res.data.map(product => ({...product, isFavourite: favourites.indexOf(product.id) > -1}));

            dispatch(savingProducts(data));
            dispatch(productsLoading(false));
        })
};

export const loadFavourites = () => dispatch => {
    dispatch(productsLoading(true));

    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    axios.get('/products.json')
        .then(res => {
            const data = res.data.filter(product => favourites.indexOf(product.id) > -1)
                .map(product => ({...product, isFavourite: true}));

            dispatch(savingFavourites(data));
            dispatch(productsLoading(false));
        })
};

export const loadCart = () => dispatch => {
    dispatch(productsLoading(true));

    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    axios.get('/products.json')
        .then(res => {
            const data = res.data.filter(product => cart.hasOwnProperty(product.id))
                .map(product => ({...product, isCart: true, count: cart[product.id], isFavourite: favourites.indexOf(product.id) > -1}));

            dispatch(savingCart(data));
            dispatch(productsLoading(false));
        })
};

export const toggleFavourite = (productId) => (dispatch, getState) => {
    const { products } = getState();
    const { data, cart } = products;
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (favourites.includes(productId)) {
        favourites = favourites.filter(id => id !== productId);
    } else {
        favourites = [...favourites, productId];
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));

    let index = data.findIndex(product => product.id === productId);
    if (index > -1) {
        const productsArr = [...data];

        productsArr[index].isFavourite = !productsArr[index].isFavourite;
        dispatch(savingProducts(productsArr));
    }

    index = cart.findIndex(product => product.id === productId);
    if (index > -1) {
        const cartArr = [...cart];

        cartArr[index].isFavourite = !cartArr[index].isFavourite;
        dispatch(savingCart(cartArr));
    }

    dispatch(favouritesCntSet(favourites.length));
};

export const addToCart = (productId) => (dispatch, getState) => {
    const { products } = getState();
    const { cartCnt } = products;

    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (cart[productId]) {
        cart[productId]++;
    } else {
        cart[productId] = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch(cartCntSet(cartCnt + 1));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
    const { products } = getState();
    const { cartCnt, cart } = products;

    const cartStorage = JSON.parse(localStorage.getItem('cart')) || {};
    const { [productId]: remove, ...newCart} = cartStorage;

    localStorage.setItem('cart', JSON.stringify(newCart));

    const cartArr = [...cart].filter(product => product.id !== productId);

    dispatch(savingCart(cartArr));
    dispatch(cartCntSet(cartCnt - remove));
};

export const increaseCartCount = (productId) => (dispatch, getState) => {
    const { products } = getState();
    const { cartCnt, cart } = products;

    const cartStorage = JSON.parse(localStorage.getItem('cart')) || {};

    cartStorage[productId]++;
    localStorage.setItem('cart', JSON.stringify(cartStorage));

    const cartArr = [...cart];
    const index = cartArr.findIndex(product => product.id === productId);
    cartArr[index].count++;

    dispatch(savingCart(cartArr));
    dispatch(cartCntSet(cartCnt + 1));
};

export const decreaseCartCount = (productId) => (dispatch, getState) => {
    const { products } = getState();
    const { cartCnt, cart } = products;

    const cartStorage = JSON.parse(localStorage.getItem('cart')) || {};

    if (cartStorage[productId] === 1) {
        dispatch(removeFromCart(productId));
    } else {
        cartStorage[productId]--;
        localStorage.setItem('cart', JSON.stringify(cartStorage));

        const cartArr = [...cart];
        const index = cartArr.findIndex(product => product.id === productId);
        cartArr[index].count--;

        dispatch(savingCart(cartArr));
        dispatch(cartCntSet(cartCnt - 1));
    }
};

export const makeOrder = ({data}) => (dispatch, getState) => {
    const { products } = getState();
    const { cart } = products;

    return new Promise(resolve => {
        setTimeout(() => {
            console.log(
                `Form data: ${JSON.stringify(data)}`,
                `\nProducts: ${JSON.stringify(
                    [...cart].map(({name, id, price, count}) => ({name, id, price, count}))
                )}`
            );

            localStorage.removeItem('cart');

            dispatch(savingCart([]));
            dispatch(cartCntSet(0));

            resolve(true);
        }, 4000);
    });
};
