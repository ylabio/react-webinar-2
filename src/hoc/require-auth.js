import React from 'react';
import {useLocation, Navigate} from 'react-router-dom';
import useAuth from '../hooks/use-auth';

const RequireAuth = ({children}) => {
  const location = useLocation();
  const auth = useAuth();
  
  if (!auth) {
    return <Navigate to='/login' state={{from: location}} />
  }
  return children;
}

export default RequireAuth;