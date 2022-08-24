import { Navigate, useLocation, Outlet } from "react-router-dom";
import React from 'react'

const RequireAuth = ({auth}) => {

    const location = useLocation()
    return (
        auth
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth