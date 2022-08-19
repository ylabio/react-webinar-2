import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';



function PrivateRoute({render, path, exact, isAuthorized}) {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => (
          isAuthorized
          ? render(routeProps)
          : <Redirect to={'/login'} />
      )}
    />
  );
}

PrivateRoute.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;