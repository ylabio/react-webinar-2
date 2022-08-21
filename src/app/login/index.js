import React, { useCallback } from "react";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Form from "../../components/login-form";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";
import LocaleSelect from "../../containers/locale-select";
import { Navigate } from "react-router-dom";
import ControlBar from "../../containers/control-bar";

function Login() {
  const store = useStore();
  const callbacks = {
    getToken: useCallback((login, pass) => store.get('auth').login(login, pass), [])
  };
  const error = useSelector(state => state.auth.error);
  const auth = useSelector(state => state.auth.isSigned)
  const { t } = useTranslate();
  if (auth) {
    return (
      <Navigate replace to='/' />
    )
  }

  return (
    <>
      <Layout
        overHead={
          <ControlBar />
        }
        head={
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect />
          </LayoutFlex>
        }>
        <Tools />
        <Form getToken={callbacks.getToken} error={error} />
      </Layout>
    </>
  )
}

export default React.memo(Login);