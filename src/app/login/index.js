import React, {useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
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

  useInit(async () => {
    await store.get('profile').loadUser();
  }, []);

  // очищаем от ошибки при размонтировании (переходе на другую страницу)
  useEffect(() => {
    return () => store.get('authorization').cleanError();
  }, [])
  
  const select = useSelector(state => ({
    token: state.authorization.token,
    error: state.authorization.error,
  }));

  const callbacks = {
    // Логин
    login: useCallback(data => store.get('authorization').loginRequest(data), []),
  };

  const {t} = useTranslate();

  if (select.token) {
    return <Navigate to="/" replace={true} />
  }

  return (
    
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>} 
      topHead={ 
        <TopHead/>
      }>

      <Tools/>
      <LayoutAuth title={<h2>{t('login')}</h2>}>
        <FormLogin onLogin={callbacks.login} token={select.token} error={select.error} t={t}/>
      </LayoutAuth>
    </Layout>
  )
}


export default React.memo(Login);