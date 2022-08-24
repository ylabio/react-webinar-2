import React from "react";
import useSelector from "../../hooks/use-selector";
import {useLocation, Navigate} from "react-router-dom"
import Spinner from "../../components/spinner";


function AutghContainer({ children }) {

  const token = localStorage.getItem('token')
  const select = useSelector(state => ({
    authStatus: state.user.logined,
    waiting: state.user.waiting,
    user: state.user,
  }));
  let location = useLocation()
  if(!select.authStatus&&!token){ return <Navigate to="/login" state={{ from: location }} />
  };
  return select.waiting ? <Spinner active={select.waiting}/> : children;
}
export default React.memo(AutghContainer);
