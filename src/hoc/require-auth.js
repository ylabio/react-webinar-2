import React from 'react';
import { Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';

const RequireAuth = ({ children }) => {
  const select = useSelector((state) => ({
    loggedIn: state.authorization.loggedIn,
  }));

  const auth = select.loggedIn;

  if (!auth) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default React.memo(RequireAuth);
