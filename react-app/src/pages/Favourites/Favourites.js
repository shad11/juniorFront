import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import Products from "../../components/Products";
import { loadFavourites } from "../../store/products/operations";

const Favourites = ({ isLoading, products, load }) => {
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
    products: products.favourites
});

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(loadFavourites())
});

Favourites.propTypes = {
    isLoading: PropTypes.bool,
    products: PropTypes.array
};

Favourites.defaultProps = {
    isLoading: false,
    products: []
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);