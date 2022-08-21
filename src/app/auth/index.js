import React, { useCallback } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../components/login-form";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import TopMenu from "../../containers/top-menu";

function Auth() {
  const { state } = useLocation();
  const replacePathname = state?.from.pathname ? state?.from.pathname : "/";
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    isLogin: state.auth.user,
    errors: state.auth.errors,
  }));

  const callbacks = {
    onLogIn: useCallback(
      (login, password) => store.get("auth").logIn(login, password),
      []
    ),
  };

  return (
    <>
      <TopMenu />
      <Layout
        head={
          <LayoutFlex flex="between">
            <h1>{t("title")}</h1>
            <LocaleSelect />
          </LayoutFlex>
        }
      >
        <Tools />
        {select.isLogin && <Navigate replace to={replacePathname} />}
        <LoginForm
          t={t}
          submit={callbacks.onLogIn}
          errors={select.errors}
          isLogin={select.isLogin}
        />
      </Layout>
    </>
  );
}

export default React.memo(Auth);
