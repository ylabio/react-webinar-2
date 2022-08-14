import React from "react";
import { Outlet } from "react-router";
import Preloader from "../preloader";

function LoaderRoute(props) {
  return (
    <>
      {props.request && <Preloader />}
      <Outlet />
    </>
  );
}

export default React.memo(LoaderRoute);
