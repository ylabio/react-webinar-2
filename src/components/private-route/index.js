import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function PrivateRoute() {
  const select = useSelector((state) => ({ loggedIn: state.user.loggedIn }));
  return select.loggedIn ? <Navigate to="/" /> : <Outlet />;
}

export default React.memo(PrivateRoute);
