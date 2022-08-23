import React, { useMemo } from "react";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../components/login-menu";
import LoginForm from "../../components/login-form";
import './style.css';

function LoginPage() {

    const {t} = useTranslate();
      
    const options = {
      loginform: useMemo(() => ({ enter: t('loginform.enter'), inputname: t('loginform.inputname'), inputpassword: t('loginform.password'), login: t('inputform.login') }), [t]),
      loginMenu: useMemo(() => ({ loginTitle: t('tologin'), login: t('login'), logOutTitle: t('logout') }), [t]),
    }

  return (
    <>
      <Layout head={
        <>
          <LoginMenu options={options.loginMenu}/>
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

