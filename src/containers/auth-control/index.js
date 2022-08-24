import React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import AuthPanel from "../../components/auth-panel";
import useTranslate from "../../hooks/use-translate";
import Button from "../../components/button";

function AuthControl() {
  const navigate = useNavigate();
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.authentication.user,
    isAuth: state.authentication.isAuth
  }))

  const callbacks = {
    onNavigateLogin: useCallback(() => navigate("/login", { state: location.pathname }), []),
    onLogout: useCallback(() => store.get('authentication').logOut(), []),
  }
  return (
    <>
      { 
        select.isAuth 
        ?
        <AuthPanel 
          onLogout={callbacks.onLogout}
          user={select.user}
          t={t}
        /> 
        :
        <Button callback={callbacks.onNavigateLogin} title={t('auth.login')}/>
      }
    </>
  )
}

export default React.memo(AuthControl);