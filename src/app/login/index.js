import React, {useState, useEffect, useCallback} from "react";
import {useLocation} from 'react-router-dom';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import usePrevious from "../../hooks/use-previous";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import LoginPage from "../../components/login-page";

function Login(){
  const store = useStore();
  const location = useLocation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [currLocation, setNavBack] = useState('');
  const prevLocation = usePrevious(currLocation);

  console.log('now', currLocation, 'prev', prevLocation);

  const select = useSelector(state => ({
    authorized: state.user.authorized,
    error: state.user.error,
    waiting: state.user.waiting
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Авторизация
    onSubmit: useCallback((login, password) => store.get('user').openUser(login, password), [])
  };

  const onLogin = (e) => {
    setLogin(e);
  }

  const onPassword = (e) => {
    setPassword(e);
  }

  useEffect(() => {
    setNavBack(location);
  }, [])

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <Spinner active={select.waiting}>
        <LoginPage
          t={t}
          login={login}
          password={password}
          onLogin={onLogin}
          onPassword={onPassword}
          onSubmit={callbacks.onSubmit}
          authorized={select.authorized}
          error={select.error}
          pathname={prevLocation?.pathname}
        />
      </Spinner>
    </Layout>
  )
}

export default React.memo(Login);
