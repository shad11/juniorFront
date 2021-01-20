import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../Button";
import Icon from "../Icon";
import "./Item.scss";
import { decreaseCartCount, increaseCartCount } from "../../store/products/operations";

const Item = (props) => {
    const {
        id, name, producer, price, imgUrl, isFavourite, isCart, count,
        toggleFavourite, showModalToCart, showModalFromCart, increaseCartCount, decreaseCartCount
    } = props;

    return (
        <div className='item'>
            <div className='item__img'>
                <img src={imgUrl}  alt='Product'/>
            </div>
            <div className='item__icon'>
                <Icon
                    type='star'
                    filled={true}
                    color={isFavourite ? '#ff271a' : '#000'}
                    onClick={() => {toggleFavourite(id)}}
                />
                {
                    isCart &&
                    <Icon
                        type='remove'
                        filled={true}
                        color='#ff271a'
                        onClick={() => {showModalFromCart(id)}}
                    />
                }
            </div>
            <div className='item__desc'>
                <div className='item__title'>{name}</div>
                <div className='item__producer'>{producer}</div>
                {
                    !isCart &&
                    <div className='item__price'>
                        <span>$ {price.toFixed(2)}</span>
                        <Button text='Add to cart' className='btnCart' onClick={() => {showModalToCart(id)}} data-testid='modal-to-cart'/>
                    </div>
                }
                {
                    isCart &&
                    <div className='item__total'>
                        <span>
                            <Button text='-' className='btnCartCnt' onClick={() => decreaseCartCount(id)} data-testid='cart-decrease'/>
                            <span className='item__count'>{count}</span>
                            <Button text='+' className='btnCartCnt' onClick={() => increaseCartCount(id)} data-testid='cart-increase'/>
                        </span>
                        <span>${(price * count).toFixed(2)}</span>
                    </div>
                }
            </div>
        </div>
    );
};

Item.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    producer: PropTypes.string,
    price: PropTypes.number.isRequired,
    imgUrl: PropTypes.string,
    color: PropTypes.string,
    isFavourite: PropTypes.bool,
    isCart: PropTypes.bool,
    count: PropTypes.number,
    toggleFavourite: PropTypes.func,
    showModalToCart: PropTypes.func,
    showModalFromCart: PropTypes.func,
};

Item.defaultProps = {
    producer: 'Unknown',
    imgUrl: './images/productDefault.jpeg',
    color: '',
    isFavourite: false,
    isCart: false,
    count: 1,
    toggleFavourite: () => {},
    showModalToCart: () => {},
    showModalFromCart: () => {},
};

const mapDispatchToProps = dispatch => ({
    increaseCartCount: productId => dispatch(increaseCartCount(productId)),
    decreaseCartCount: productId => dispatch(decreaseCartCount(productId)),
});

export default connect(null, mapDispatchToProps)(Item);