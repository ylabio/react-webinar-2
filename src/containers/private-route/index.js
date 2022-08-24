import React from "react";
import {Navigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function PrivateRoute({children}) {
  const select = useSelector(state => ({
    status: state.login.status,
  }));

  return (
    select.status === 'auth' || select.status === 'unknown'
      ? children
      : <Navigate to={'/login'} />
  );
}

export default PrivateRoute;