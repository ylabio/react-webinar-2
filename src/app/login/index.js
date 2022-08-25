import React, { useMemo, useCallback } from "react";
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
  useInit(async () => {
    await store.get('auth').getInitAuth();
  }, [], {backForward: true});
  
  const user = useSelector(state => state.auth.user);

  const callbacks = {
    logOut: useCallback(() => store.get('auth').logOut(), []),
  }
    const {t} = useTranslate();

    const options = {
      loginform: useMemo(() => ({ enter: t('loginform.enter'), inputname: t('loginform.inputname'), inputpassword: t('loginform.password'), login: t('inputform.login') }), [t]),
      loginMenu: useMemo(() => ({ loginTitle: t('tologin'), login: t('login'), logOutTitle: t('logout') }), [t]),
    }

  return (
    <>
      <Layout head={
        <>
          <LoginMenu options={options.loginMenu} user={user} logOut={callbacks.logOut}/>
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect/>
        </LayoutFlex>
        </>}>
        <Tools/>
        <LoginForm options={options.loginform} />
      </Layout>
    </>
  )
}

export default React.memo(LoginPage);

