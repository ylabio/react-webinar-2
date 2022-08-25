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
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner';

function Login() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    isLogged: state.session.isLogged,
    error: state.session.error,
    waiting: state.profile.waiting,
  }));

  const location = useLocation();

  const { t } = useTranslate();

  const callbacks = {
    onLogin: useCallback(
      (login, password) => store.get('session').onLogin(login, password),
      []
    ),
    resetError: useCallback(() => store.get('session').resetError(), []),
  };

  React.useEffect(() => {
    if (select.isLogged)
      navigate(location.state ? location.state.pathname : '/profile');
  }, [select.isLogged]);

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
    </Layout>
  );
}

export default React.memo(Login);
