import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../components/login-menu";
import LoginForm from "../../components/login-form";
import './style.css';

function LoginPage() {
  const store = useStore();
  const navigate = useNavigate();
  useInit(async () => {
    await store.get('auth').getInitAuth();
  }, [], {backForward: true});
  
  const callbacks = {
    toLogin: useCallback(() => navigate('/login'), []),
    logOut: useCallback(() => store.get('auth').logOut(), []),
    onSubmit: useCallback(async (password, name) => {
      await store.get('auth').logIn(password, name);
      if (!isAuthErr && history.length === 2) return navigate('/?category=&page=1&limit=10&sort=order&query=', {replace: true });
      if (!isAuthErr && history.length > 2) return navigate(-1, {replace: true });
    })
  }

  const {t} = useTranslate();
  const options = {
    loginform: useMemo(() => ({ enter: t('loginform.enter'), inputname: t('loginform.inputname'), inputpassword: t('loginform.password'), login: t('inputform.login') }), [t]),
    loginMenu: useMemo(() => ({ loginTitle: t('tologin'), login: t('login'), logOutTitle: t('logout') }), [t]),
  }

  const select = useSelector(state => ({
    user: state.auth.user,
    isWaiting: state.auth.waiting,
    err: state.auth.err,
  }));
    
  return (
    <>
      <Layout head={
        <>
          <LoginMenu options={options.loginMenu} user={select.user} toLogin={callbacks.toLogin} logOut={callbacks.logOut}/>
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect/>
        </LayoutFlex>
        </>}>
        <Tools/>
        <LoginForm 
          options={options.loginform} 
          loginState={{ user: select.user, isWaiting: select.isWaiting, err: select.err }} 
          logIn={callbacks.logIn} 
          onSubmit={callbacks.onSubmit}/>
      </Layout>
    </>
  )
}

export default React.memo(LoginPage);

