import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import LoginTop from "../../containers/login-top";
import LoginForm from "../../components/login-form";
import Spinner from "../../components/spinner";

function Login () {
  const store = useStore();
  const {t} = useTranslate();
  
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    error: state.auth.error,
    userExists: state.auth.userExists,
    waiting: state.auth.waiting,
  }));

  useInit(async () => {
    if (select.userExists) {
      navigate(`/profile`, {replace: true});
    }
    store.get('auth').removeError();
  }, [select.userExists]);

  const callbacks = {
    logIn: useCallback((login, password) => store.get('auth').logIn(login, password), []),
  }

  return (
    <Layout 
    head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }
    login={
      <LoginTop/>
    }>
      <Tools/>
      <Spinner active={select.waiting}>
        <LoginForm logIn={callbacks.logIn} error={select.error} t={t}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Login);
