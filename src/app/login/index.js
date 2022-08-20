import LoginForm from "components/login-form";
import Header from "containers/header";
import React, {useCallback} from "react";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import { Navigate } from 'react-router-dom';

function Login(){
  const store = useStore();

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    isLogin: state.auth.isLogin,
    errorMessage: state.auth.errorMessage,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    onLogin: useCallback((login, password) => store.get('auth').sigIn(login, password), []),
  };

  if (select.isLogin) {
    return <Navigate to={'/'}/>
  }

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>Магазин</h1>
        <LocaleSelect/>
      </LayoutFlex>
    } menu={<Header/>}>
      <Tools/>
      <Spinner active={select.waiting}>
        <LoginForm errorMessage={select.errorMessage} onLogin={callbacks.onLogin}  t={t}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Login);
