import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import propTypes from "prop-types";
import useSelector from '../../hooks/use-selector'

function RequireAuth({redirectPath}) {
  const status = useSelector(state => state.auth.status);

  if (status === 'auth_failed') {
    return <Navigate to={redirectPath} replace/>
  }

  return <Outlet />
}

export default RequireAuth

RequireAuth.propTypes = {
  children: propTypes.node,
  redirectPath: propTypes.string,
}

RequireAuth.defaultProps = {
  redirectPath: '/'
}