import React from 'react'
import useSelector from '../../hooks/use-selector'
import { Navigate, useLocation } from 'react-router-dom'

function RequireAuth({ children }) {
  const location = useLocation()

  const select = useSelector((state) => ({
    auth: state.profile.auth,
  }))

  if (!select.auth) return <Navigate to='/login' state={{ from: location }} />

  return children
}
export default React.memo(RequireAuth)
