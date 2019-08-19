import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
return (
    <Route {...rest} render={props => (
        // Check Athentication
        localStorage.getItem('userobj') ? 
            <Component {...props} />
            : 
            <Redirect to={{ pathname: '/logout', state: { from: props.location } }} />
    )} />
)
}