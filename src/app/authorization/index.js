import React, {useEffect, useCallback} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import AuthForm from '../../components/auth-form';
import LoginControl from '../../containers/login-control';
import {useLocation, useNavigate} from 'react-router-dom';

function Authorization() {
  console.log('Страница авторизации');
  // console.log(useLocation());
  const navigate =  useNavigate();
  

  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    auth: state.auth,
  }));

  const callbacks = {
    onLogin:useCallback((data) => store.get('auth').login(data)),
  }

  // Очистка ошибки
  useEffect(() => {
    // if (select.auth.authorized) {
    //   console.log('Успешная авторизация');
    //   navigate(-1);
    // }
    return () => store.get('auth').clearError();
  }, []);

  if (select.auth.authorized) {
    // console.log('Успешная авторизация');
    // navigate(-1);
  }

  return (
    <Layout
      loginControl={<LoginControl/>}
      head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
      }     
    > 
      <Tools/>
      <AuthForm login={callbacks.onLogin} error={select.auth.error} t={t}/>     
    </Layout>
  )
}

export default React.memo(Authorization);
