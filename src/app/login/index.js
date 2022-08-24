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
import Spinner from '../../components/spinner';

function Login() {
  const store = useStore();

  const select = useSelector((state) => ({
    isLogged: state.session.isLogged,
    error: state.session.error,
    waiting: state.profile.waiting,
    currentPage: state.session.currentPage,
  }));

  const { t } = useTranslate();

  const callbacks = {
    onLogin: useCallback(
      (login, password) => store.get('session').onLogin(login, password),
      []
    ),
    resetError: useCallback(() => store.get('session').resetError(), []),
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

      <Spinner active={select.waiting}>
        <LoginForm
          isLogged={select.isLogged}
          currentPage={select.currentPage}
          onLogin={callbacks.onLogin}
          error={select.error}
          resetError={callbacks.resetError}
        />
      </Spinner>

      {select.isLogged && (
        <Navigate to={select.currentPage ? select.currentPage : '/profile'} />
      )}
      {/* {select.isLogged && <Navigate to="/profile" />} */}
    </Layout>
  );
}

export default React.memo(Login);
