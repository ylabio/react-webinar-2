import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import propTypes from 'prop-types';
import PageLoader from '../../components/page-loader';

function ProtectedRoute({children, isAuth, redirectUrl, asyncFunc, isWaiting}) {
	useEffect(() => {
		if(!isAuth) {
			asyncFunc();
		}
	}, [asyncFunc]);

  if (isAuth) {
		return isWaiting ? 
			<PageLoader isWaiting={isWaiting}/> :
			children;
  }
    
  return <Navigate to={redirectUrl} />
}

ProtectedRoute.propTypes = {
  children: propTypes.node.isRequired,
  isAuth: propTypes.bool.isRequired,
  redirectUrl: propTypes.string.isRequired,
	asyncFunc: propTypes.func.isRequired,
	isWaiting: propTypes.bool.isRequired
}

ProtectedRoute.defaultProps = {
}

export default React.memo(ProtectedRoute);