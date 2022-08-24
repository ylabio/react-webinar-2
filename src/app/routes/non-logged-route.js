import React from "react";
import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import propTypes from "prop-types";

function NonLoggedRoute({ children }) {
  const loggedIn = useSelector(state => state.auth.loggedIn);

  if (loggedIn) {
    history.back()
    return <Navigate to={"/"}/>
  } else {
    return children
  }

}

NonLoggedRoute.propTypes = {
  children: propTypes.node,
}

NonLoggedRoute.defaultProps = {

}

export default React.memo(NonLoggedRoute);