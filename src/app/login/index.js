import React, {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";

import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

import LocaleSelect from "../../containers/locale-select";
import CabinetLogin from "../../containers/cabinet-login";
import LoginLogout from '../../containers/login-logout';

import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import Spinner from "../../components/spinner";

import isLocalStorageAvailable from '../../utils/test-localstorage';

function Login() {

  const store = useStore();

  const select = useSelector(state => ({
    token: state.authorization.token,
    items: state.basket.items,
    waiting: state.authorization.waiting
  }));

  const {t} = useTranslate();
 
  useEffect(() => {
    //получаем данные из localStorage, если они есть 
    if ( isLocalStorageAvailable() && 
         localStorage.getItem("basket") && 
         select.items.length === 0)
      store.get('basket').setFromStorage(localStorage.getItem("basket"));
    //получаем информацию о пользователе  
    if (select.token)
      store.get('userinfo').setUserInfo(select.token);  
  }, [])  

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    } loginlogout={<LoginLogout/>}>
      <Spinner active={select.waiting}>
        {!select.token && <CabinetLogin/>}
        {select.token && <Navigate replace to={'/'}/>} 
      </Spinner>  
    </Layout>
  )
}

export default React.memo(Login);
