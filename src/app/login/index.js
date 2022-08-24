import React, { useEffect } from 'react';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LoginForm from '../../components/login-form';
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';
import useTranslate from '../../hooks/use-translate';
import { useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Authorization from '../../containers/authorization';
import Spinner from '../../components/spinner';
import { Navigate } from 'react-router-dom';

function Login() {
  const store = useStore();

  const select = useSelector((state) => ({
    error: state.authorization.error,
    token: state.authorization.token,
    waiting: state.authorization.waiting,
    loggedIn: state.authorization.loggedIn,
  }));

  useEffect(() => {
    return () => {
      store.get('authorization').cleanError();
    };
  }, []);

  const { t } = useTranslate();

  const callbacks = {
    login: useCallback((login, password) => {
      store.get('authorization').login(login, password);
    }, []),
  };

  return (
    <Spinner active={select.waiting}>
      {select.loggedIn ? (
        <Navigate to='/profile' replace />
      ) : (
        <Layout
          login={<Authorization />}
          head={
            <LayoutFlex flex='between'>
              <h1>{t('title')}</h1>
              <LocaleSelect />
            </LayoutFlex>
          }>
          <Tools />
          {select.waiting ? null : (
            <LoginForm
              login={callbacks.login}
              log={callbacks.getLoggingState}
              error={select.error}
            />
          )}
        </Layout>
      )}
    </Spinner>
  );
}

export default React.memo(Login);
