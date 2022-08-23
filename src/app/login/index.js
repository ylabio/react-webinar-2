import React, { useCallback, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
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

  const select = useSelector((state) => ({
    error: state.auth.error,
    waiting: state.auth.waiting,
    isAuth: state.auth.isAuth,
  }));

  const callbacks = {
    auth: useCallback((data) => store.get('auth').login(data)),
    clearError: useCallback(() => store.get('auth').clearError()),
  };

  useEffect(() => {
    if (select.error) {
      const timer = setTimeout(callbacks.clearError, 4000);
      return () => {
        callbacks.clearError();
        clearTimeout(timer);
      };
    }
  }, [select.error]);

  if (select.isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Layout head={<HeaderContainer />}>
      <Tools />
      <Spinner active={select.waiting}>
        <LoginForm
          auth={callbacks.auth}
          errorServer={select.error}
          t={t}
          disabledLogin={select.waiting}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Login);
