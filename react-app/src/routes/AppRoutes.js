import React from "react";
import { Switch, Route } from "react-router-dom";
import Index from "../pages/Index/Index";
import Favourites from "../pages/Favourites/Favourites";
import Cart from "../pages/Cart/Cart";

const AppRoutes = () => (
    <Switch>
        <Route exact path='/' component={Index} />
        <Route path='/favourites' component={Favourites} />
        <Route path='/cart' component={Cart} />
    </Switch>
);

export default AppRoutes;