import React from "react";

import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import Auth from '../../containers/auth';
import AuthForm from '../../containers/auth-form';

function Login() {
  const {t} = useTranslate();

  return (
    <div>
      <LayoutFlex flex="end">
        <Auth/>
      </LayoutFlex>
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <AuthForm/>
    </Layout>
    </div>
  )
}

export default React.memo(Login);
