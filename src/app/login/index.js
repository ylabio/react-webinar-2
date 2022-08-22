import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LoginForm from '../../components/login-form';
import LoginTools from '../../components/login-tools';
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';
import useAuth from '../../hooks/use-auth';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

const Login = () => {
  const navigate = useNavigate();
  const { isAuth, token, error } = useAuth();
  const store = useStore();
  const { t } = useTranslate();
  const from = localStorage.getItem('link') || '/';
  // const { error } = useSelector((state) => state.user.error);

  const callbacks = {
    logIn: useCallback(
      (login, password) => store.get('user').login(login, password),
      []
    ),
  };
  useInit(() => {
    {
      isAuth || token ? navigate(from) : navigate('/login');
    }
  }, [isAuth, from]);

  return (
    <>
      <LoginTools t={t} />
      <Layout
        head={
          <LayoutFlex flex='between'>
            <h1>{t('title')}</h1>
            <LocaleSelect />
          </LayoutFlex>
        }
      >
        <Tools />
        <LoginForm onLogin={callbacks.logIn} error={error} />
      </Layout>
    </>
  );
};
export default Login;
