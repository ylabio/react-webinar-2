import LoginForm from "components/login-form";
import Header from "containers/header";
import React, {useCallback, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

function Login() {
  const store = useStore();

  const navigate = useNavigate();

  const select = useSelector(state => ({
    waiting: state.auth.waiting,
    isLogin: state.auth.isLogin,
    errorMessage: state.auth.errorMessage,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    onLogin: useCallback((login, password) => {
      store.get('auth').sigIn(login, password);
    }, []),
  };

  useEffect(() => {
    if (select.isLogin && window.history.length < 3) {
      navigate('/')
    }
    if (select.isLogin && window.history.length > 3) {
      navigate(-1)
    }
  }, [select.isLogin])


  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>Магазин</h1>
        <LocaleSelect/>
      </LayoutFlex>
    } menu={<Header/>}>
      <Tools/>
      <Spinner active={select.waiting}>
        <LoginForm errorMessage={select.errorMessage} onLogin={callbacks.onLogin} t={t}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Login);
