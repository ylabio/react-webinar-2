import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginCard from '../../components/login-card';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import Tools from '../../containers/tools';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();
  const select = useSelector(state => ({
    isLogged: state.user.isLogged,
    error: state.user.error,
    waiting: state.user.waiting
  }));

  useEffect(() => {
    if (select.isLogged) {
      location.state ? navigate(-1) : navigate('/');
    }
  }, [select.isLogged]);

  const callbacks = {
    // Авторизация
    onLogin: useCallback((login, password) => store.get('user').login(login, password), []),
  };

  const { t } = useTranslate();

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect />
      </LayoutFlex>
    }>
      <Tools />
      <Spinner active={select.waiting}>
        <LoginCard onLogin={callbacks.onLogin} error={select.error} />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Login);
