import React from 'react';
import {Switch, Route} from "react-router-dom";
import AuthRoute from '../components/AuthRoute';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useSelector } from "react-redux";
import { userSelectors } from "../store/user";
import Page404 from "../pages/Page404";
import About from "../pages/About";
import Questions from "../pages/Questions";
import Contacts from "../pages/Contacts";


const AppRoutes = () => {
	const isAuth = useSelector(userSelectors.isAuth);

	return (
		<Switch>
			<Route exact path="/" render = {() => isAuth ? <Home/> : <Landing/>} />
			<AuthRoute path="/home" component={Home}/>
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/about" component={About} />
			<Route exact path="/questions" component={Questions} />
			<Route exact path="/contacts" component={Contacts} />
			<Route exact path="/page404" component={Page404} />
			<Route path="*" component={Page404}/>
		</Switch>
	)
};

export default AppRoutes;