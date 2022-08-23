import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function PrivateRoute() {
  const select = useSelector(state => ({
    token: state.auth.token
  }));

  return select.token ? <Outlet/> : <Navigate to="/login" replace={true}/>;
};

export default React.memo(PrivateRoute);
