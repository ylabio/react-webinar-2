import React from 'react';
import {Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute({status, redirectPath = '', children}) {
  console.log(useLocation());
  const location = useLocation();
  console.log('В ProtectedRoute', location);

  if (status) return <Navigate to={redirectPath} replace state={{from: location}}/>;
  return children ? children : <Outlet />
}

export default ProtectedRoute ;
