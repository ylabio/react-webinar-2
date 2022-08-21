import React, {useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import LocaleSelect from "../../containers/locale-select";
import {useLocation, useNavigate} from "react-router-dom";
import LoginForm from "../../components/admin/login-form";
import PanelLogin from "../../containers/panel-login";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location)

  useInit(async () => {
    await store.get('login').checkLogin();
  }, [], {backForward: true});

  const select = useSelector(state => ({
    err: state.login.err,
    isAuth: state.login.isAuth,
    waiting: state.login.waiting,
  }));

  useEffect(() => {
    if (select.isAuth && location.key === 'default') {
      navigate('/profile', {replace: true});
    }
    if (select.isAuth && location.key !== 'default') {
      navigate(-1, {replace: true});
    }
  }, [select.isAuth])


  const {t} = useTranslate();

  const callbacks = {
    // Авторизация
    logIn: useCallback(data => store.get('login').logIn(data), []),
  };

  return (
    <Layout
      panelLogin={
        <PanelLogin />
      }
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
    }>
      <Tools/>
      <Spinner active={select.waiting}>
        <LoginForm logIn={callbacks.logIn} err={select.err} t={t}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Login);
