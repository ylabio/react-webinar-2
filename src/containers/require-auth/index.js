import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function RequireAuth({children}) {
  const select = useSelector(state => ({
    isAuthorized: state.login.isAuthorized
  }));

  if (!select.isAuthorized) {
    // перенаправить на страницу /login
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default React.memo(RequireAuth);
