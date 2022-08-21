import React, { useEffect } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import AuthPanel from "../../components/auth-panel";
import useTranslate from "../../hooks/use-translate";

function AuthControl() {
  const navigate = useNavigate();
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.authentication.user,
    token: state.authentication.token
  }))

  useEffect(() => {
    if(localStorage.getItem('token') && select.token === "") {
      store.get('authentication').logInByToken(localStorage.getItem('token'));
    }
  }, [])

  const callbacks = {
    onNavigateLogin: useCallback(() => navigate("/login"), []),
    onLogout: useCallback(() => store.get('authentication').logOut(), []),
  }

  return (
    <>
      { 
        select.token 
        ?
        <AuthPanel 
          onLogout={callbacks.onLogout}
          user={select.user.profile.name}
          t={t}
        /> 
        :
        <button onClick={callbacks.onNavigateLogin}>{t('auth.login')}</button>
      }
    </>
  )
}

export default React.memo(AuthControl);