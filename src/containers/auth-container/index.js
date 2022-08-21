import React from "react";
import useSelector from "../../hooks/use-selector";
import {useLocation, Navigate} from "react-router-dom"


function AutghContainer({ children }) {

  const select = useSelector(state => ({
    authStatus: state.user.logined,
  }));
  let location = useLocation()

  if(!select.authStatus){
  return <Navigate to="/login" state={{ from: location }} replace />
  };
  return children
}
export default React.memo(AutghContainer);
