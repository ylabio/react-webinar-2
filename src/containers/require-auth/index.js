import React from "react";
import propTypes from "prop-types";
import useSelector from "../../hooks/use-selector";
import { useLocation, Navigate } from "react-router-dom";

function RequireAuth({ children }) {

  let location = useLocation();

  const select = useSelector(state => ({
    token: state.authorization.token,
  }));

  if (!select.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

RequireAuth.propTypes = {
  children: propTypes.node,
}

export default React.memo(RequireAuth);
