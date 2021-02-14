 import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from '../pages/Profile';
import Events from '../pages/Events';
import Responses from '../pages/Responses';
import CreateEvent from '../pages/CreateEvent';
import Messages from '../pages/Messages';

const HomeRoutes = () => {
	return (
		<Switch>
			<Route path="/home/profile" component={Profile} />
			<Route path="/home/events" component={Events} />
			<Route path="/home/responses" component={Responses} />
			<Route path="/home/messages" component={Messages} />
			<Route path="/home/create-event" component={CreateEvent} />
			<Redirect from="/home/*" to="/page404"/>
		</Switch>
	)
};

export default HomeRoutes;