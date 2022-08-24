import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import propTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';

function PrivateRoute(props) {
  const isAuth = useSelector(state => state.user.isAuth);
  isAuth ? props.children : <Navigate to={'/login'} replace />;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: propTypes.node,
  path: propTypes.string,
};
