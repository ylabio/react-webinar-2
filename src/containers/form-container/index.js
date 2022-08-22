import React, { useCallback, useState, useMemo } from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { Navigate, useLocation } from "react-router-dom";
import Form from "../../components/form";
import useStore from "../../hooks/use-store";

function FormContainer() {
  const { t } = useTranslate();
  const location = useLocation();
  const store = useStore();

  // Опции для полей
  const options = {
    fromPage: useMemo(
      () => location.state?.from?.pathname || '/', [])
  };

  const select = useSelector((state) => ({
    error: state.auth.error,
    isAuth: state.auth.isAuth,
  }));

  const [login, setLogin] = useState('test_1')
  const [password, setPassword] = useState('123456')

  const callbacks = {
    // Отправка данных из формы
    submit: useCallback((e) => { 
      e.preventDefault();
      store.get('auth').login({login, password})
    }, [login, password]),
    // Ввод данных в инпут
    changLogin: useCallback((e) => setLogin(e.currentTarget.value), []),
    changePassword: useCallback((e) => setPassword(e.currentTarget.value), []),
  };

  if (select.isAuth) return <Navigate to={options.fromPage} replace />

  return (
    <Form login={login} 
          password={password} 
          changLogin={callbacks.changLogin}
          changePassword={callbacks.changePassword}
          onSubmit={callbacks.submit}
          error={select.error}
          t={t} />
  );
}

export default React.memo(FormContainer);
