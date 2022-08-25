import React from "react";
import {Navigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function Private({children}) {
  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
  }));
  if (!select.isAuth) {
    return <Navigate to={'/login'}/>
  }

  return children;
}

export default Private;