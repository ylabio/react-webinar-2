import React from 'react';
import {Navigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function PrivateRoute ({children, to}) {
    const isAuth = useSelector(state => state.authentication.isAuth);
    const waiting = useSelector(state => state.authentication.waiting);

    if (!isAuth && !waiting) {
        return <Navigate to={to}/>
    }

    return children;
}
 
export default PrivateRoute;