import React, { useCallback, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import Tools from '../../containers/tools';
import Layout from '../../components/layout';
import LoginForm from '../../components/login-form';
import Spinner from '../../components/spinner';
import HeaderContainer from '../../containers/header-container';

function Login() {
  const store = useStore();
  const { t } = useTranslate();
  const location = useLocation();

  const select = useSelector((state) => ({
    authError: state.auth.error,
    waiting: state.auth.waiting,
    isAuth: state.auth.isAuth,
    login: state.loginForm.login.value,
    password: state.loginForm.password.value,
    emptyErrorLogin: state.loginForm.login.isEmptyError,
    emptyErrorPassword: state.loginForm.password.isEmptyError,
  }));

  const callbacks = {
    auth: useCallback((data) => store.get('auth').login(data), []),
    clearAuthError: useCallback(() => store.get('auth').clearError(), []),
    changeIsEmptyError: useCallback(
      (inputType, newValue) => store.get('loginForm').changeIsEmptyError(inputType, newValue),
      []
    ),
    clearInputs: useCallback(() => store.get('loginForm').clearInputs(), []),
    changeInput: useCallback(
      (inputType, newValue) => store.get('loginForm').changeInput(inputType, newValue),
      []
    ),
  };

  useEffect(() => {
    if (select.authError) {
      const timer = setTimeout(callbacks.clearAuthError, 4000);
      return () => {
        callbacks.clearAuthError();
        clearTimeout(timer);
      };
    }
  }, [select.authError]);

  useEffect(() => {
    if (select.emptyErrorLogin) {
      const timer = setTimeout(() => callbacks.changeIsEmptyError('login', false), 3000);
      return () => {
        callbacks.changeIsEmptyError('login', false);
        clearTimeout(timer);
      };
    }
  }, [select.emptyErrorLogin]);

  useEffect(() => {
    if (select.emptyErrorPassword) {
      const timer = setTimeout(() => callbacks.changeIsEmptyError('password', false), 3000);
      return () => {
        callbacks.changeIsEmptyError('password', false);
        clearTimeout(timer);
      };
    }
  }, [select.emptyErrorPassword]);

  const prevPath = location.state?.from?.pathname || '/';
  if (select.isAuth) {
    return <Navigate to={prevPath} />;
  }
  return (
    <Layout head={<HeaderContainer />}>
      <Tools />
      <Spinner active={select.waiting}>
        <LoginForm
          auth={callbacks.auth}
          authError={select.authError}
          login={select.login}
          password={select.password}
          emptyErrorLogin={select.emptyErrorLogin}
          emptyErrorPassword={select.emptyErrorPassword}
          clearInputs={callbacks.clearInputs}
          changeInput={callbacks.changeInput}
          changeIsEmptyError={callbacks.changeIsEmptyError}
          t={t}
          disabledLogin={select.waiting}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Login);
