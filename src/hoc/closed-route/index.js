import React from 'react';

import {Navigate} from 'react-router-dom';

function ClosedRoute ({children}) {
    if (localStorage.getItem('token')) {
        return <Navigate to='/'/>
    }

    return children;
}
 
export default ClosedRoute;