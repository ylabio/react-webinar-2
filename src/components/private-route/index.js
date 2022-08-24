import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom'
import useStore from '../../hooks/use-store'
import useSelector from '../../hooks/use-selector'



function PrivateRoute({children}) {
  let location = useLocation();

  const isAuthorized = useSelector(store => store.user.isAuthorized)

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
