import React, { useCallback } from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useParams } from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../components/login-form";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import TopMenu from "../../containers/top-menu";

function Auth() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    isLogin: state.auth.token,
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
        {select.isLogin && <Navigate replace to="/profile" />}
        <LoginForm t={t} submit={callbacks.onLogIn} errors={select.errors} />
      </Layout>
    </>
  );
}

export default React.memo(Auth);
