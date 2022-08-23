import React, {useCallback} from "react";
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

  const select = useSelector(state => ({
    login: state.user.login,
    password: state.user.password,
    authorized: state.user.authorized,
    error: state.user.error,
    waiting: state.user.waiting
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Авторизация
    onSubmit: useCallback(() => store.get('user').authUser(), []),
    // Навигация на предыдущую страницу
    onNavigate: useCallback((route) => navigate(route), []),
    // Ввод логина
    onChangeLogin: useCallback(login => store.get('user').setLogin(login), []),
    // Ввод пароля
    onChangePassword: useCallback(password => store.get('user').setPassword(password), [])
  };

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
          login={select.login}
          password={select.password}
          onChangeLogin={callbacks.onChangeLogin}
          onChangePassword={callbacks.onChangePassword}
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
