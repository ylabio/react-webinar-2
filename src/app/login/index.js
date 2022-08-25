import React, {useCallback} from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    error: state.login.error,
    user: state.login.user,
  }));

  const callbacks = {
    // Авторизация
    login: useCallback((data) => store.get("login").login(data), []),
    loginRedirect: useCallback(() => {
      if (!select.user) {
        navigate(-1);
      }
    }, []),
  };
  if (!select.user) {
  return (
    <Layout top={<LoginWrap/>} head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>}>
      <Tools/>
      <LoginForm 
      errorMessage={select.error}
      onLogin={callbacks.login}
       loginRedirect={callbacks.loginRedirect}
      />
    </Layout>
  )
  } else {
    navigate(-1);
  }
}

export default React.memo(Login);
