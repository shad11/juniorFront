import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import Products from "../../components/Products";
import { loadProducts } from "../../store/products/operations";

const Index = ({ isLoading, products, load }) => {
    const initFetch = useCallback(() => {
        load()
    }, [load]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    return (
        isLoading
            ? <Loader />
            : <Products products={products} />
    );
};

const mapStateToProps = ({ products }) => ({
    isLoading: products.isLoading,
    products: products.data,
});

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(loadProducts())
});

Index.propTypes = {
    isLoading: PropTypes.bool,
    products: PropTypes.array,
    toggleFavourite: PropTypes.func,
    addToCart: PropTypes.func,
    showModalToCart: PropTypes.func,
};

Index.defaultProps = {
    isLoading: false,
    products: [],
    toggleFavourite: () => {},
    addToCart: () => {},
    showModalToCart: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);