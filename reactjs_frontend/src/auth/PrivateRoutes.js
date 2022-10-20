import React from 'react';
import { Route, Redirect } from "react-router-dom"

//TODO Implemented Authentication module
const PrivateRoutes = ({ component: Component, ...rest }) => {
    let isAuthenticated = false;
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/home",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoutes;