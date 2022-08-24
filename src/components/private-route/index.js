import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function PrivateRoute() {
  const navigate = useNavigate();
  const select = useSelector((state) => ({ loggedIn: state.profile.loggedIn }));
  return select.loggedIn ? navigate(-1) : <Outlet />;
}

export default React.memo(PrivateRoute);
