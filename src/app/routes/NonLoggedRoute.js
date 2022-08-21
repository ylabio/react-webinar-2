import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import propTypes from "prop-types";

function NonLoggedRoute({ children }) {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const location = useLocation();
  const url = new URLSearchParams(location.search.slice(1));

  return loggedIn ? <Navigate to={url.get("redirect") || "/"} /> : children;
}

NonLoggedRoute.propTypes = {
  children: propTypes.node,
}

NonLoggedRoute.defaultProps = {

}

export default React.memo(NonLoggedRoute);