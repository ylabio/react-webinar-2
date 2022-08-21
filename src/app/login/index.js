import React, {useCallback} from "react";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import AuthControl from "../../containers/auth-control";
import AuthForm from "../../containers/auth-form";

function Login() {
  const {t} = useTranslate();

  return(
    <Layout
      top={
        <LayoutFlex flex="end" padding="min">
          <AuthControl/>
        </LayoutFlex>
      }
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      }>
      <Tools/>
      <AuthForm/>
    </Layout>
  )
}

export default React.memo(Login);