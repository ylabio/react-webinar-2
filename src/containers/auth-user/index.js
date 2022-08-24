import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import propTypes from "prop-types";
import useSelector from '../../hooks/use-selector'

function AuthUser({path}) {
  const isAuth = useSelector(state => state.auth.isAuth);

  if (isAuth === true) {
    return <Navigate to={path} replace/>
  }

  return <Outlet />
}

export default AuthUser

AuthUser.propTypes = {
  children: propTypes.node,
  path: propTypes.string,
}

AuthUser.defaultProps = {
  path: '/'
}