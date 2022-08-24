import React, {useCallback} from "react";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth";
import LoginForm from "../../components/login";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {isAuth, message} = useAuth();
  const store = useStore();
  const {t} = useTranslate();

  const callbacks = {
    logIn: useCallback((login, pass) => store.get('auth').logIn(login, pass), []),
  };
  useInit(()=> {
    if(isAuth){
      location.state && !(location.state.from.pathname === '/login') ? navigate(-1) : navigate('/');
    }
  },[isAuth]);

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <LoginForm callback={callbacks.logIn} title={'Вход'} error={message} t={t}/>
    </Layout>
  )
}

export default React.memo(LoginPage);
