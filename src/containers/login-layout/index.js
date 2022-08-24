import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import {useAuth} from "../../hooks/use-auth";
import LoginBar from "../../components/login-bar";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

function LoginLayout() {
  const {username, isAuth} = useAuth();
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslate();

  const callbacks = {
    logOut: useCallback(() => store.get('auth').logOut(), []),
    redirectWithHistory:  useCallback(() => navigate('/login', { state: { from: location }}), []),
  };

  return (
    <>
      <LoginBar userName={isAuth ? username : ''} t={t} callback={ isAuth ? callbacks.logOut : callbacks.redirectWithHistory }/>
      <Outlet/>
    </>

  );
}

export default React.memo(LoginLayout);
