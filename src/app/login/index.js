import React, { useCallback, useState } from 'react'
import LoginForm from '../../components/login-form';
import Layout from '../../components/wrappers/layout';
import LayoutFlex from '../../components/wrappers/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthHeader from '../../containers/auth-header';

function Login() {
  const store = useStore();
  const [loginForm, setLoginForm] = useState({ login: '', password: '' });
  const location = useLocation();

  const select = useSelector(state => ({
    session: state.session,
    profile: state.profile
  }));

  const error = select.profile.error ? select.profile.error : select.session.error

  const { t } = useTranslate();

  const callbacks = {
    // Авторизация
    login: useCallback((login, password) => store.get('session').login(login, password), []),
  };

  if (select.session.isLogged) {
    const path = location.state?.from ? location.state.from : '/';
    return <Navigate to={path} />
  }

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
        error={error}
      />
    </Layout >
  )
}

export default React.memo(Login);
