import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";

import Register from "./containers/Register/Register";
import MainPage from "./containers/MainPage/MainPage";
import Login from "./containers/Login/Login";
import UserProfile from "./containers/UserProfile/UserProfile";
import EditProfile from "./containers/EditProfile/EditProfile";
import NewPost from "./containers/NewPost/NewPost";

const ProtectedRoute = ({isAllowed, ...props}) => (
	isAllowed ? <Route {...props}/> : <Redirect to="/register"/>
);

const Routes = () => {
	const user = useSelector(state => state.users.user);

	return (
		<Switch>
			<ProtectedRoute isAllowed={user} path='/' exact component={MainPage} />
			<Route path="/register" exact component={Register} />
			<Route path="/login" exact component={Login} />
			<Route path="/profile" exact component={UserProfile} />
			<Route path="/profile/edit" exact component={EditProfile} />
			<Route path="/add" exact component={NewPost} />
		</Switch>
	);
};

export default Routes;