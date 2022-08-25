import React from 'react';
import { Navigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
export const  RequireAuth = ({ children }) => {
  const select = useSelector(state => ({
    auth: state.auth.isAuth,
    waiting: state.auth.waiting

  }));
    if (!select.auth) {
      return !!select.waiting && <Navigate to="/login" replace />
    }
  
    return children;
  }