import React, { useEffect, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layouts/layout";
import LayoutFlex from "../../components/layouts/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import User from "../../containers/user";
import useAuth from "../../hooks/use-auth";

function Login() {
  const { t } = useTranslate();
  const store = useStore();

  const select = useSelector((state) => ({
    token: state.user.token,
    waiting: state.user.waiting,
    error: state.user.error,
  }));
 
  useAuth(select.token, "/login", "/");

  const callbacks = {
    // Функция авторизации
    onLogin: useCallback(
      (login, password) => store.get("user").onLogin(login, password),
      []
    ),
  };

  return (
    <Layout
      before={
        <LayoutFlex flex="end" padding={false}>
          <User />
        </LayoutFlex>
      }
      head={
        <LayoutFlex flex="between">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      <Spinner active={select.waiting}>
        <LoginForm onLogin={callbacks.onLogin} error={select.error} t={t} />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Login);
