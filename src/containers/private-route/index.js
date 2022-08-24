import React from "react";
import propTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function PrivateRoute(props) {
  const select = useSelector(state => ({
    token: state.auth.token
  }));

  return select.token ? props.children : <Navigate to="/login" replace={true}/>;
};

PrivateRoute.propTypes = {
  children: propTypes.node.isRequired
};

export default React.memo(PrivateRoute);
