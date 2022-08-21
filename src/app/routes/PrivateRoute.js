import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import propTypes from "prop-types";

function PrivateRoute({ children }) {
  const location = useLocation();
  const url = new URLSearchParams();

  //нужно чтобы при авторизации пользователя, по возможности, перекинуло его назад, где он был, а не на главную
  url.set("redirect", location.pathname + location.search);

  return localStorage.getItem("token") ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/login",
        search: url.toString(),
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