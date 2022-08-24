import React, {useState, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import LoginPage from "../../components/login-page";

function Login(){
  const store = useStore();
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const select = useSelector(state => ({
    authorized: state.user.authorized,
    error: state.user.error,
    waiting: state.user.waiting
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Авторизация
    onSubmit: useCallback((login, password) => store.get('user').authUser(login, password), []),
    // Навигация на предыдущую страницу
    onNavigate: useCallback((route) => navigate(route), []),
  };

  const onLogin = (e) => {
    setLogin(e);
  }

  const onPassword = (e) => {
    setPassword(e);
  }

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <Spinner active={select.waiting}>
        <LoginPage
          t={t}
          login={login}
          password={password}
          onLogin={onLogin}
          onPassword={onPassword}
          onNavigate={callbacks.onNavigate}
          onSubmit={callbacks.onSubmit}
          authorized={select.authorized}
          error={select.error}
        />
      </Spinner>
    </Layout>
  )
}

export default React.memo(Login);
