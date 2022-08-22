import React from "react";
import Layout from "../../components/layout";
import useTranslate from "../../hooks/use-translate";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import LoginForm from "../../components/login-form";

function Login() {
  const { t } = useTranslate();

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      <LoginForm />
    </Layout>
  );
}

export default Login;
