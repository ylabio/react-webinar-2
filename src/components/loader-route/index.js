import React from "react";
import { Outlet } from "react-router";
import Preloader from "../preloader";
import propTypes from "prop-types";

function LoaderRoute({ request }) {
  return (
    <>
      {request && <Preloader />}
      <Outlet />
    </>
  );
}

LoaderRoute.propTypes = {
  request: propTypes.bool.isRequired,
};

export default React.memo(LoaderRoute);
