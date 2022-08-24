import React, {useCallback,useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import LoginCard from "../../components/login-card";

function LoginPage(){
  
  const store = useStore();
  let navigate = useNavigate()
  const {t} = useTranslate();

  let [login, setLogin] = useState("");
  let [password, setPassword] = useState("");
  
  const callbacks = {
  
    onAuth: useCallback((login,password) => store.get('user').signIn({'login':login,'password': password}), []),
    resetError: useCallback(() => store.get('user').resetError(), []),
  };

  const select = useSelector(state => ({
    user: state.user,
  }));

   useEffect (() => {callbacks.resetError()},[])

  if(select.user.logined&&(window.history.length>1)) {navigate(-1, {replace: true})}
  else if(select.user.logined) {navigate('/')}

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <LoginCard 
      onAuth={callbacks.onAuth} 
      user={select.user}
      login={login}
      password={password}
      setLogin={setLogin}
      setPassword={setPassword}
      />
      </Layout>
  )
}

export default React.memo(LoginPage);
