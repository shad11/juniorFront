import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelectors } from "../../store/user";

const AuthRoute = (props) => {
    const isAuth = useSelector(userSelectors.isAuth);

    return (
        <>
            {isAuth && <Route {...props} />}
            {!isAuth && <Redirect to="/" />}
        </>
    )
};

export default AuthRoute;