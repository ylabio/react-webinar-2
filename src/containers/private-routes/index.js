import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import useSelector from '../../hooks/use-selector';

function PrivateRoutes() {
  const { isAuth } = useSelector(state => state.auth);

  return (
    isAuth ? <Outlet/> : <Navigate to='/login'/>
  );
}

export default PrivateRoutes;