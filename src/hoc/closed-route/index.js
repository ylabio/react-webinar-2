import React from 'react';
import useSelector from '../../hooks/use-selector';
import {Navigate} from 'react-router-dom';

function ClosedRoute ({children}) {
    const isAuth = useSelector(state => state.authentication.isAuth);
    if (isAuth) {
        return <Navigate to={-1}/>
    }

    return children;
}
 
export default ClosedRoute;