import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import propTypes from 'prop-types';

function ProtectedRoute({children, isAuth, redirectUrl, asyncFunc}) {
	useEffect(() => {
		if(!isAuth) {
			asyncFunc();
		}
	}, [asyncFunc]);

  if (isAuth) {
    return children;
  }
    
  return <Navigate to={redirectUrl} />
}

ProtectedRoute.propTypes = {
  children: propTypes.node.isRequired,
  isAuth: propTypes.bool.isRequired,
  redirectUrl: propTypes.string.isRequired,
	asyncFunc: propTypes.func.isRequired
}

ProtectedRoute.defaultProps = {
}

export default React.memo(ProtectedRoute);