import { Navigate, useLocation, Outlet } from "react-router-dom";
import React from 'react'
import propTypes from 'prop-types';

const RequireAuth = ({ auth }) => {

    const location = useLocation()
    return (
        auth
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    )
}
RequireAuth.propTypes = {
    auth: propTypes.any,
}
RequireAuth.defaultProps = {
    auth: false
}
export default RequireAuth