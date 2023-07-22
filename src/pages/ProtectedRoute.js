import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getToken} from "../utils/Utils";

function ProtectedRoute({component: Component, ...rest}) {
    return (
            <Route
                {...rest}
                render={(props) => getToken()
                    ? <Component {...props} />
                    : <Redirect to={{pathname: '/dashboard/login', state: {from: props.location}}}/>
                }
            />
    )
}

export default ProtectedRoute;
