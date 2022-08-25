import React, { useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Login from "../../components/login";
import Spinner from "../../components/spinner";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import LayoutLogin from "../../components/layout-login";
import AuthContainer from "../../containers/auth-container";
import Tools from "../../containers/tools";

function Auth() {
  const store = useStore();

  const select = useSelector(state => ({
    error: state.auth.error,
    login: state.auth.login,
    password: state.auth.password,
    user: state.auth.user,
    isAuth: state.auth.isAuth,
    waiting: state.auth.waiting,
    token: state.auth.token,
    isAuthAttempt: state.auth.isAuthAttempt,
    error: state.auth.error
  }));

  const callbacks = {
    // Авторизация
    autorise: useCallback(() => store.get('auth').login(), []),
    authAttempt: useCallback((login, password) => store.get('auth').authAttempt(login, password), []),
    deleteError: useCallback(() => store.get('auth').deleteError(), []),
  };

  const {t} = useTranslate();

  const navigate = useNavigate();

  const location = useLocation()

useEffect(() => {
  callbacks.deleteError();
}, [])


  useEffect(() => {
    if (select.token&&location.key !== 'default') {
      navigate(-1);
    } else if (select.token&&location.key === 'default') {
      navigate('/');
    }
  }, [select.token])

  useEffect(() => {
    if(select.isAuthAttempt){
      callbacks.autorise();
    } 
  }, [select.isAuthAttempt])

  return (
    <Layout 
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      } 
      login={
        <LayoutLogin>
          <AuthContainer/>
        </LayoutLogin>
      }
    >
      <Tools/>
      <Spinner active={select.waiting}>
        <Login error={select.error}
               user={select.user} 
               authAttempt={callbacks.authAttempt}
               t={t}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Auth);
