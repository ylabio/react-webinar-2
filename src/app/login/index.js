import React, { useCallback, useEffect } from "react";
import Forms from "../../components/forms";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { Navigate } from "react-router-dom";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Tools from "../../containers/tools";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import HeaderInfo from "../../containers/header-info";

function Login() {
  const store = useStore();

  const select = useSelector((state) => ({
    isLogged: state.login.isLogged,
    error: state.login.error,
    isLoading: state.login.isLoading,
  }));

  const callbacks = {
    onSubmit: useCallback(
      (email, password) => store.get("login").login(email, password),
      []
    ),
    clearError: useCallback(() => store.get("login").clearError(), []),
  };

  const { t } = useTranslate();

  useEffect(() => {
    callbacks.clearError();
  }, []);

  if (select.isLogged) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      <HeaderInfo />
      <Layout
        head={
          <LayoutFlex flex="between">
            <h1>{t("title")}</h1>
            <LocaleSelect />
          </LayoutFlex>
        }
      >
        <Tools />
        <Spinner active={select.isLoading}>
          <LayoutFlex flex="start">
            <Forms
              clearError={callbacks.clearError}
              onSubmit={callbacks.onSubmit}
              error={select.error}
            />
          </LayoutFlex>
        </Spinner>
      </Layout>
    </>
  );
}

export default React.memo(Login);
