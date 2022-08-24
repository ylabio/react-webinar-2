import React from 'react';
import {Navigate} from 'react-router-dom';
import propTypes from 'prop-types';

function PrivateRoute({children, isAuth, redirectUrl}) {
  if (isAuth) {
    return children;
  }
    
  return <Navigate to={redirectUrl} />
}

PrivateRoute.propTypes = {
  children: propTypes.node.isRequired,
  isAuth: propTypes.bool.isRequired,
  redirectUrl: propTypes.string.isRequired
}

PrivateRoute.defaultProps = {
}

export default React.memo(PrivateRoute);