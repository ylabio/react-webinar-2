import React, {useCallback} from "react";
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

 
  const callbacks = {
    // Добавление в корзину
    onAuth: useCallback((login,password) => store.get('user').signIn({'login':login,'password': password}), []),
  };

  const select = useSelector(state => ({
    user: state.user,
  }));

  if(select.user.logined&&(window.history.length>1)) {navigate(-1)}
  else if(select.user.logined) {navigate('/',{replace: true})}

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <LoginCard onAuth={callbacks.onAuth} user={select.user}/>
      </Layout>
  )
}

export default React.memo(LoginPage);
