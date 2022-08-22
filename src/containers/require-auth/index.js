import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function RequireAuth({children}) {
  let location = useLocation();

  const select = useSelector(state => ({
    isAuthorized: state.login.isAuthorized
  }));

  if (!select.isAuthorized) {
    // перенаправить на страницу /login, но сохранить текущее положение куда был запрос перехода
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return children;
}

export default React.memo(RequireAuth);
