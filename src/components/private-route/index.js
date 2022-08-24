import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function PrivateRoute() {
  const select = useSelector((state) => ({ loggedIn: state.profile.loggedIn }));
  return select.loggedIn ? <Navigate to="/profile" /> : <Outlet />;
}

export default React.memo(PrivateRoute);
