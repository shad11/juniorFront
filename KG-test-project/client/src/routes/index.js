import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { userSelectors } from "../store/user";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Staff from "../pages/Staff";
import Auth from "../pages/Auth";
import EditEmployee from "../pages/EditEmployee";
import AuthRoute from "../components/AuthRoute";

const AppRoutes = () => {
    const isAuth = useSelector(userSelectors.isAuth);

    return (
        <Switch>
            <Route exact path="/" render = {() => isAuth ? <Staff /> : <Auth />} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <AuthRoute exact path="/staff" component={Staff} />
            <AuthRoute exact path="/create" component={EditEmployee} />
            <AuthRoute exact path="/edit/:id" component={EditEmployee} />
            <Redirect to="/" />
        </Switch>
    )
};

export default AppRoutes;