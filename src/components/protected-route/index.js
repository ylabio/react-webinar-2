import React from 'react';
import {Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({status, redirectPath = '', children}) {
  if (status) return <Navigate to={redirectPath} replace />;
  return children ? children : <Outlet />
}

export default ProtectedRoute ;
