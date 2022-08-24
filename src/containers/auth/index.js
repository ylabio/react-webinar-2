import React, {useCallback, useEffect} from 'react';
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import UserPanel from "../../components/user-panel";

function Auth(){
  const nav = useNavigate();
  const store = useStore();
  const select = useSelector(state => ({
    auth: state.auth.auth,
    token: state.auth.token,
    data: state.auth.data
  }));

  const callbacks = {
    logOut: useCallback(() => store.get('auth').logout(), []),
    logIn: useCallback(() => nav('/login')),
  };
  useEffect(() => {
    if (!select.auth && select.token) store.get('auth').load()
  }, [])
  const {t} = useTranslate();
  return (
    <>
      <UserPanel
        link={'/profile'}
        logIn={callbacks.logIn}
        logOut={callbacks.logOut}
        name={select.data.profile?.name}
        token={select.token}
        loginTitle={t('login')}
        logOutTitle={t('logout')}
      />
    </>

  )
}


export default React.memo(Auth);