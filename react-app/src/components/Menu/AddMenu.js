import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../Icon";
import PropTypes from "prop-types";
import "./AddMenu.scss";

const AddMenu = ({ cartCnt, favCnt }) => {
    return (
        <div className='menu-add'>
            <div className='menu-add__link menu-link'>
                <NavLink to='/favourites' activeClassName='selected'>
                    { !!favCnt && <div className='menu-link__cnt'>{favCnt}</div> }
                    <Icon type='heart' />
                </NavLink>
            </div>
            <div className='menu-add__link menu-link'>
                <NavLink to='/cart' activeClassName='selected'>
                    { !!cartCnt && <div className='menu-link__cnt menu-link__cnt--cart'>{cartCnt}</div> }
                    <Icon type='cart' />
                </NavLink>
            </div>
        </div>
    );
};

AddMenu.propTypes = {
    cartCnt: PropTypes.number,
    favCnt: PropTypes.number
};

AddMenu.defaultProps = {
    cartCnt: 0,
    favCnt: 0
};

export default AddMenu;