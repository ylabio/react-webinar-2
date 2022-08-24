import React from "react";
import useSelector from "../../hooks/use-selector";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  const location = useLocation();

  const select = useSelector((state) => ({  
    isAuth: state.auth.isAuth,
    firstRender: state.auth.firstRender,
  }));

  if (!select.isAuth && select.firstRender ) return <h1>Loading...</h1>

  if (!select.isAuth && !select.firstRender) return <Navigate to='/login' state={{from: location}} />

  return children
}

export default React.memo(RequireAuth);