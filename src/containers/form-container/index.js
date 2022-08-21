import React, { useCallback, useState } from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { Navigate, useLocation } from "react-router-dom";
import Form from "../../components/form";
import useStore from "../../hooks/use-store";

function FormContainer() {
  //   const {lang, setLang, t} = useTranslate();
  const location = useLocation();
  const store = useStore();

  const fromPage = location.state?.from?.pathname || '/';


  const select = useSelector((state) => ({
    error: state.auth.error,
    isAuth: state.auth.isAuth,
  }));

  const [login, setLogin] = useState('test_1')
  const [password, setPassword] = useState('123456')

  const callbacks = {
    // 
    submit: useCallback((e) => { 
      e.preventDefault();
      store.get('auth').login({login, password})
    }, [login, password]),
    // 
    changLogin: useCallback((e) => setLogin(e.currentTarget.value), []),
    changePassword: useCallback((e) => setPassword(e.currentTarget.value), []),
  };

  if (select.isAuth) return <Navigate to={fromPage} replace />

  return (
    <Form login={login} 
          password={password} 
          changLogin={callbacks.changLogin}
          changePassword={callbacks.changePassword}
          onSubmit={callbacks.submit}
          error={select.error} />
  );
}

export default React.memo(FormContainer);
