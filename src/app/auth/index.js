import React, {useCallback, useEffect, useState} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Login from "../../components/login";
import Spinner from "../../components/spinner";
import { useNavigate } from "react-router-dom";

function Auth() {
  const store = useStore();

  const select = useSelector(state => ({
    error: state.auth.error,
    login: state.auth.login,
    password: state.auth.password,
    user: state.auth.user,
    isAuth: state.auth.isAuth,
    waiting: state.auth.waiting,
    token: state.auth.token,
    isAuthAttempt: state.auth.isAuthAttempt
  }));

  const callbacks = {
    // Авторизация
    autorise: useCallback(() => store.get('auth').login(), []),
    authAttempt: useCallback((login, password) => store.get('auth').authAttempt(login, password), [])
  };

  const {t} = useTranslate();

  const navigate = useNavigate();

  useEffect(() => {
    if (select.token) {
      navigate(-1)
    }
  }, [select.token])

  useEffect(() => {
    if(select.isAuthAttempt){
      callbacks.autorise();
    } 
  }, [select.isAuthAttempt])

  return (
    <Spinner active={select.waiting}>
      <Login error={select.error}
             user={select.user} 
             authAttempt={callbacks.authAttempt}
             t={t}/>
             </Spinner>
   
  )
}

export default React.memo(Auth);
