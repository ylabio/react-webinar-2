import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
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
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    error: state.auth.error,
    waiting: state.auth.waiting,
    isAuth: state.auth.isAuth,
  }));

  useInit(async () => {}, [], { backForward: true });

  console.log(select);

  useEffect(() => {
    if (select.isAuth) {
      return navigate('/');
    }
  }, [select.isAuth]);

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
