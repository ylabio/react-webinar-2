import React, { useCallback, useState } from 'react'
import LoginForm from '../../components/login-form';
import Layout from '../../components/wrappers/layout';
import LayoutFlex from '../../components/wrappers/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthHeader from '../../containers/auth-header';

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ login: '', password: '' })

  const select = useSelector(state => ({
    auth: state.auth,
  }));

  const callbacks = {
    // Авторизация
    login: useCallback((login, password) => store.get('auth').login(login, password), []),
  };

  if (localStorage.getItem("token")) {
    navigate(-1)
  }

  const { t } = useTranslate();

  return (
    <Layout
      auth={<AuthHeader />}
      head={
        <LayoutFlex flex="between" >
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex >
      }>
      <Tools />
      <LoginForm
        login={loginForm.login}
        password={loginForm.password}
        setLoginForm={setLoginForm}
        loginFetch={callbacks.login}
        error={select.auth.error}
      />
    </Layout >
  )
}

export default React.memo(Login);
