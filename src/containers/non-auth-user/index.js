import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import propTypes from "prop-types";
import useSelector from '../../hooks/use-selector'

function NonAuthUser({path}) {
  const isAuth = useSelector(state => state.auth.isAuth);
  
  if (isAuth === false) {
    return <Navigate to={path} replace/>
  }
  
  return <Outlet />
}

export default NonAuthUser

NonAuthUser.propTypes = {
  children: propTypes.node,
  path: propTypes.string,
}

NonAuthUser.defaultProps = {
  path: '/'
}