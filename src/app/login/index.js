import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LoginForm from "../../components/login-form";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

function Login() {
  const {t} = useTranslate();
  const navigate = useNavigate();
  const store = useStore();
  const { errorMsg, isFetching, user, isAuth } = useSelector(state => state.auth);

  const callbacks = {
    openLoginPage: useCallback(() => navigate('/login'), []),
    login: useCallback((username, password) => {
      store.get('auth').login({username, password});
    }, []),
    openProfilePage: useCallback(() => navigate(('/profile')), []),
    clearErrorMsg: useCallback(() => {
      store.get('auth').setErrorMsg('');
    }, []),
  }

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [])

  return (
    <Layout 
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
        </LayoutFlex>}
      handleAuth={callbacks.openLoginPage}
    >
      <Tools />
      <Spinner active={isFetching}>
        <LoginForm 
          login={callbacks.login}
          navigate={callbacks.openProfilePage}
          errorMsg={errorMsg || ''}
          clearErrorMsg={callbacks.clearErrorMsg}
          user={user}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Login);