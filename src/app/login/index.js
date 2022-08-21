import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import LoginWrap from "../../containers/login-wrap";

function Login(){
  const store = useStore();
  const {t} = useTranslate();

  const callbacks = {
    // Авторизация
    login: useCallback((data) => store.get('login').login(data), []),
  };

  const select = useSelector((state) => ({
    error: state.login.error,
    user: state.login.user,
  }));

  return (
    <Layout top={<LoginWrap/>} head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>}>
      <Tools/>
      <LoginForm errorMessage={select.error} user={select.user} onLogin={callbacks.login}/>
    </Layout>
  )
}

export default React.memo(Login);
