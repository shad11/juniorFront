import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { userSelectors, userOperations } from "../../store/user";
import "./Header.scss";

const Header = ({ isMain = true }) => {
    const userDate = useSelector(userSelectors.getDate);
    const dispatch = useDispatch();

    const logOut = useCallback((e) => {
        e.preventDefault();
        dispatch(userOperations.logOut());
    }, []);

    return (
        <nav>
            <div className="nav-wrapper teal lighten-2">
                <span className="brand-logo">Hi, {userDate.login}!</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {isMain && <li><NavLink to='create'>Add employee</NavLink></li>}
                    {!isMain && <li><NavLink to='/'>Home</NavLink></li>}
                    <li><a onClick={logOut}>Logout</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default memo(Header);