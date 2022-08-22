import React from 'react';
import {Navigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function PrivateRoute ({children, to}) {
    const isAuth = useSelector(state => state.authentication.isAuth);

    if (!localStorage.getItem('token') && !isAuth) {
        return <Navigate to={to}/>
    }

    return children;
}
 
export default PrivateRoute;