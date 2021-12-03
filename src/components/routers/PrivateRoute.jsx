import React from 'react'
import { AuthContainer } from '@containers'
import {
	Route,
	Redirect,
  withRouter,
} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
    rest.isAuthorised ? <Component {...props} /> : <Redirect to='/login' />
	)} />
);

export default withRouter(AuthContainer(PrivateRoute));
