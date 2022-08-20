import React, { useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Tools from '../../containers/tools';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from '../../components/login-form';
import UserMenu from '../user-menu';
import { Navigate } from 'react-router-dom';

function Login() {
  const store = useStore();

  const select = useSelector((state) => ({
    isLogged: state.profile.isLogged,
    error: state.profile.error,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // авторизация пользователя
    onLogin: useCallback(
      (login, password) => store.get('profile').onLogin(login, password),
      []
    ),
  };

  return (
    <Layout
      head={
        <>
          <UserMenu />
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect />
          </LayoutFlex>
        </>
      }
    >
      <Tools />

      <LoginForm onLogin={callbacks.onLogin} error={select.error} />

      {select.isLogged && <Navigate to="/profile" />}
    </Layout>
  );
}

export default React.memo(Login);
