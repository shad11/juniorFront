import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Products.scss";
import Item from "./Item";
import { toggleFavourite, addToCart, removeFromCart } from "../../store/products/operations";
import { showModalToCart, showModalFromCart } from "../../store/modal/operations";
import { modalShow } from "../../store/modal/actions";
import Button from "../Button";
import Modal from '../Modal';

const Products = ({ products, modalIsOpen, modalProductId, modalType, toggleFavourite, addToCart, removeFromCart, showModalToCart, showModalFromCart, hideModal }) => {
    const toCart = () => {
        addToCart(modalProductId);
        hideModal();
    };

    const fromCart = () => {
        removeFromCart(modalProductId);
        hideModal();
    };

    return (<div className='products'>
        {
            !products.length &&
            <div className='products__title'>No products!</div>
        }
        {
            products.map(product => {
                return <div key={product.id} className='products__item'>
                    <Item
                        toggleFavourite={toggleFavourite}
                        showModalToCart={showModalToCart}
                        showModalFromCart={showModalFromCart}
                        {...product}
                    />
                </div>
            })
        }
        {
            modalIsOpen &&
            <Modal
                header={modalType === 'toCart' ? 'Adding to the cart' : 'Deleting from the cart'}
                closeButton={true}
                text={modalType === 'toCart'
                    ? 'Are you sure for adding this product to the cart?'
                    : 'Are you sure for deleting this product from the cart?'}
                actions={<>
                    <Button
                        className='btnModal btn-red'
                        text='Ok'
                        onClick={modalType === 'toCart' ? toCart : fromCart}
                    />
                    <Button className='btnModal btn-red' text='Cancel' onClick={() => hideModal()} />
                </>}
                closeFunc={() => hideModal()}
            />
        }
    </div>);
};

Products.propTypes = {
    products: PropTypes.array,
    modalIsOpen: PropTypes.bool,
    modalProductId: PropTypes.number,
    modalType: PropTypes.string,
    toggleFavourite: PropTypes.func.isRequired,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
    showModalToCart: PropTypes.func,
    showModalFromCart: PropTypes.func,
    hideModal: PropTypes.func
};

Products.defaultProps = {
    products: [],
    modalIsOpen: false,
    modalProductId: null,
    modalType: null,
    addToCart: () => {},
    removeFromCart: () => {},
    showModalToCart: () => {},
    showModalFromCart: () => {},
    hideModal: () => {}

};

const mapStateToProps = ({ modal }) => {
    const { isOpen, productId, modalType } = modal;

    return {
        modalIsOpen : isOpen,
        modalProductId: productId,
        modalType
    }
};

const mapDispatchToProps = dispatch => ({
    toggleFavourite: productId => dispatch(toggleFavourite(productId)),
    addToCart: productId => dispatch(addToCart(productId)),
    removeFromCart: productId => dispatch(removeFromCart(productId)),
    showModalToCart: productId => dispatch(showModalToCart(productId)),
    showModalFromCart: productId => dispatch(showModalFromCart(productId)),
    hideModal: () => dispatch(modalShow(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);