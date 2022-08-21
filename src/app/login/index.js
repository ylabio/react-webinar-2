import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import FormLogin from "../../components/form-login";
import LayoutAuth from "../../components/layout-auth";
import { Navigate } from "react-router-dom";

function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    token: state.authorization.token,
    error: state.authorization.error,
  }));

  const callbacks = {
    // Логин
    login: useCallback(data => store.get('authorization').loginRequest(data), []),
  };

  const {t} = useTranslate();

  return (
    
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>} 
      topHead={ 
        <TopHead/>
      }>
      {select.token && (
        <Navigate to="/profile" replace={true} />
      )}
      <Tools/>
      <LayoutAuth title={<h2>Вход</h2>}>
        <FormLogin onLogin={callbacks.login} token={select.token} error={select.error}/>
      </LayoutAuth>
    </Layout>
  )
}


export default React.memo(Login);