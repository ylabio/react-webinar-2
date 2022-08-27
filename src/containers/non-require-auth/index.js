import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import propTypes from "prop-types";
import useSelector from '../../hooks/use-selector'

function NonRequireAuth({redirectPath}) {
  const status = useSelector(state => state.auth.status);

  if (status === 'auth_successful') {
    return <Navigate to={redirectPath} replace/>
  }
  
  return <Outlet />
}

export default NonRequireAuth

NonRequireAuth.propTypes = {
  children: propTypes.node,
  redirectPath: propTypes.string,
}

NonRequireAuth.defaultProps = {
  redirectPath: '/'
}