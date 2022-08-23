import { Navigate, useLocation, Outlet } from "react-router-dom";
import React from 'react'

const RequireAuth = () => {

    const location = useLocation()
    return (
        localStorage.getItem('token')
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth