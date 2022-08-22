import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function RequireAuth({children}) {
  let location = useLocation();

  const select = useSelector(state => ({
    isAuthorized: state.login.isAuthorized
  }));

  if (!select.isAuthorized) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return children;
}

export default React.memo(RequireAuth);
