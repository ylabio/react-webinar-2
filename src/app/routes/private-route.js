import React from "react";
import { Navigate } from "react-router-dom";
import propTypes from "prop-types";
import useSelector from "../../hooks/use-selector";

function PrivateRoute({ children }) {
  const { tokenErr } = useSelector(state => ({
    tokenErr: state.auth.tokenErr
  }))

  return localStorage.getItem("token") && !tokenErr ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/login",
      }}
    />
  );
}

PrivateRoute.propTypes = {
  children: propTypes.node,
}

PrivateRoute.defaultProps = {

}

export default React.memo(PrivateRoute);