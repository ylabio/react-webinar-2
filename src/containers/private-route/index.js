import React from "react";
import useInit from "../../hooks/use-init";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {isAuth} = useAuth();

  useInit(async () => {
    if(!isAuth){
      navigate('/login', { state: { from: location } });
    }
  }, [isAuth]);
  return (
    <>
      {children}
    </>
  );
}

export default React.memo(PrivateRoute);
