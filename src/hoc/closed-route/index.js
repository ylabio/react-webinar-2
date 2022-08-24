import React from 'react';
import useSelector from '../../hooks/use-selector';
import {Navigate, useLocation} from 'react-router-dom';

function ClosedRoute ({children}) {
    const location = useLocation();
    const isAuth = useSelector(state => state.authentication.isAuth);
    if (isAuth && location.state !== null) {
        return <Navigate to={-1}/>
    } else if (isAuth && location.state == null) {
        return <Navigate to="/"/>
    }

    return children;
}
 
export default ClosedRoute;