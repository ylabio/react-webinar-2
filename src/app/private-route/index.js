import React from 'react';
import {Navigate} from 'react-router-dom';
import propTypes from 'prop-types';
import PageLoader from '../../components/page-loader';

function PrivateRoute({children, isAuth, redirectUrl, isWaiting}) {
  if (!isAuth) {
		return isWaiting ? 
			<PageLoader isWaiting={isWaiting}/> :
			children;
  }
    
  return <Navigate to={redirectUrl} />
}

PrivateRoute.propTypes = {
  children: propTypes.node.isRequired,
  isAuth: propTypes.bool.isRequired,
  redirectUrl: propTypes.string.isRequired,
	isWaiting: propTypes.bool.isRequired
}

PrivateRoute.defaultProps = {
}

export default React.memo(PrivateRoute);