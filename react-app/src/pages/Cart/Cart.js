import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import Loader from "../../components/Loader";
import Products from "../../components/Products";
import { OrderForm } from "../../components/Forms";
import PropTypes from "prop-types";
import "./Cart.scss";
import {loadCart} from "../../store/products/operations";

const Cart = ({ isLoading, products, cartCnt, load }) => {
    const initFetch = useCallback(() => {
        load()
    }, [load]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    return (
        isLoading
            ? <Loader />
            : <div className="cart">
                {!!cartCnt && <div className="cart__form"><OrderForm /></div>}
                <Products products={products} />
            </div>
    );
};

const mapStateToProps = ({ products }) => {
    const { cart, cartCnt } = products;

    return {
        isLoading: products.isLoading,
        products: cart,
        cartCnt
    }
};

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(loadCart())
});

Cart.propTypes = {
    isLoading: PropTypes.bool,
    products: PropTypes.array
};

Cart.defaultProps = {
    isLoading: false,
    products: []
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);