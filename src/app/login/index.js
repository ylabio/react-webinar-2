import React, {useCallback, useEffect, useState} from 'react';
import Forms from "../../components/forms";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {Navigate} from "react-router-dom";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Tools from "../../containers/tools";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import HeaderInfo from "../../containers/header-info";

function Login() {

  const store = useStore();

  const select = useSelector(state => ({
    isLoggedIn: state.login.isLoggedIn,
    error: state.login.error,
    waiting: state.login.waiting,
  }));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const callbacks = {
    onSubmit: useCallback(() => store.get('login').login(email, password), [email, password]),
    resetError: useCallback(() => store.get('login').resetError(), []),
  };

  const {t} = useTranslate();

  useEffect(() => {
    callbacks.resetError()
  }, [])

  if (select.isLoggedIn) {
    return <Navigate to="/profile"/>
  }

  return <>
    <HeaderInfo/>
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>}>
      <Tools/>
      <Spinner active={select.waiting}>
        <LayoutFlex flex="start">
          <Forms
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={callbacks.onSubmit}
            resetError={callbacks.resetError}
            error={select.error}/>
        </LayoutFlex>
      </Spinner>
    </Layout>
  </>
}

export default React.memo(Login);
