import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { userSelectors, userOperations } from "../../store/user";
import "./Header.scss";

const Header = ({ isMain }) => {
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

Header.propTypes = {
    isMain: PropTypes.bool.isRequired,
};

Header.defaultProps = {
    isMain: true,
};

export default Header;