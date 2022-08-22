import React, {useState, useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth";
import LoginForm from "../../components/login-form";
import useSelector from "../../hooks/use-selector";
import useAuth from "../../hooks/use-auth";

function Login() {
  const store = useStore();
  const [params, setParams] = useState({login:"", password:""});
  const select = useSelector(state => ({
    error: state.user.login.error,
    auth: state.user.auth,
  }));


  const {t} = useTranslate();

  // redirect
  useAuth(!select.auth, '')
  const callbacks = {
    //установка логина
    onChangeLog: useCallback((value) => setParams({...params, login: value}), [params]),
    //установка пароля
    onChangePas: useCallback((value) => setParams({...params, password: value}), [params]),
    //отправка данных на сервер
    onSubmit: useCallback(async (e) => {
      e.preventDefault();
      await store.get('user').login(params.login, params.password)

    })
  };
  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    } auth={<Auth/>}
    >
      <Tools/>
      <LoginForm
        putForm={callbacks.onSubmit}
        error={select.error}
        onChangeLog={callbacks.onChangeLog}
        onChangePas={callbacks.onChangePas}
        title={t('login')}
        login={t('Login')}
        password={t('password')}
      />
    </Layout>
  )
}

export default React.memo(Login);