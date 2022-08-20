import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/ui/spinner";
import LoginFormContainer from "../../containers/login-form-container";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Layout from '../../components/layouts/layout';
import LayoutFlex from '../../components/layouts/layout-flex';

function Login() {
  const {t} = useTranslate();
  const navigate = useNavigate();
  const store = useStore();
  const { 
    errorMsg, 
    isFetching, 
    user, 
    isAuth 
  } = useSelector(state => state.auth);

  const callbacks = {
    openLoginPage: useCallback(() => navigate('/login'), []),
    login: useCallback((username, password) => {
      store.get('auth').login({username, password});
    }, []),
    clearErrorMsg: useCallback(() => {
      store.get('auth').setErrorMsg('');
    }, []),
  }

  useEffect(() => {
    if (isAuth) {
      history.go(-1);
    }
  }, [isAuth])

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
        <LoginFormContainer 
          login={callbacks.login}
          errorMsg={errorMsg || ''}
          clearErrorMsg={callbacks.clearErrorMsg}
          user={user}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Login);