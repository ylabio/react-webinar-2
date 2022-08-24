import React, {useEffect} from "react";
import { Navigate } from "react-router-dom";

import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

import CabinetProfile from "../../containers/cabinet-profile";
import LocaleSelect from "../../containers/locale-select";
import LoginLogout from '../../containers/login-logout';
import AccessRouter from '../../containers/access-router';

import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import Spinner from "../../components/spinner";

import isLocalStorageAvailable from '../../utils/test-localstorage';

function Profile() {

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
  }, []);

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    } loginlogout={<LoginLogout/>}> 
      {!select.waiting && <Spinner active={select.waiting}>
         <AccessRouter trigger={select.token} route={<Navigate replace to={'/login'}/>}>
          <CabinetProfile/>
        </AccessRouter>
      </Spinner>}
    </Layout>
  )
}

export default React.memo(Profile);
