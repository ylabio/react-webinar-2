import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function ProtectedRoute() {
  const select = useSelector((state) => ({ loggedIn: state.profile.loggedIn }));
  return select.loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default React.memo(ProtectedRoute);
