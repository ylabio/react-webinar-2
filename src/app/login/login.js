import React from "react";
import useTranslate from "../../hooks/use-translate";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Auth from "../../containers/auth";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import LoginForm from "../../containers/login-form";

function Login(){
    const {t} = useTranslate();
  return (
    <Layout auth={<Auth />}
    head={<LayoutFlex flex="between">
      <h1>{t('title')}</h1>
      <LocaleSelect/>
    </LayoutFlex>
    }>
      <Tools/>
      <LoginForm/>
    </Layout>
  )
}

export default React.memo(Login);