import React from "react";
import { NavLink } from "react-router-dom";
import './MainMenu.scss';

const MainMenu = () => (
    <ul className='main-menu'>
        <li className='main-menu__link'>
            <NavLink exact to='/' activeClassName='selected'>Products</NavLink>
        </li>
    </ul>
);

export default MainMenu;