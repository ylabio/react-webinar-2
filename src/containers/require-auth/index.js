import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/coockie";

export const RequireAuth = ({ children }) => {
  const token = getCookie('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/authorization" state={{ from: location }} replace />;
  }

  return children;
};