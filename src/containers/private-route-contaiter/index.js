import React from "react";
import useSelector from "../../hooks/use-selector";
import { Navigate } from "react-router-dom";

function PrivateRouteContainer({children}) {

  const select = useSelector(state => ({
    token: state.auth.token
  }));

    return select.token ? children: <Navigate to ='/login'/>
  }
  
export default React.memo(PrivateRouteContainer);
